if(process.env.NODE_ENV != "productions"){
    require('dotenv').config()
}

// console.log(process.env.CLOUD_API_SECRET)

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const methodOverride = require('method-override');
const engine = require('ejs-mate')
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const User = require("./models/user.js");
const LocalStrategy = require("passport-local");
const {isLoggedin} = require("./middleware.js");


const listings = require("./router/listing.js");
const reviews = require("./router/review.js");
const userRouter = require("./router/user.js");
const Listing = require('./models/listing.js');

const mongoUrl = 'mongodb://127.0.0.1:27017/wanderlust2';


// const dbUrl = process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connected to DB")
}).catch((err)=>{
    console.log(err)
});

async function main() {
  await mongoose.connect(mongoUrl);

 
}

app.set("view engine", "ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname,"/public")))

// const store = MongoStore.create({
//     mongoUrl:dbUrl,
//     crypto:{
//         secret:process.env.SECRET,
//     },
//     touchAfter:24*3600,
// })

const sessionOptions = {
    // store,
    secret: process.env.SECRET,
    resave:false,
    saveunintialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
    }
}

// store.on("error",()=>{
//     console.log("error in MONGO session store",error)
// })


app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/register2",async(req,res)=>{
    let fakeUser2 = new User({
        email:"student@getMaxListeners.com",
        username:"student2123"
    });
    let registerUser = await User.register(fakeUser2,"helloworld");
    res.send(registerUser)
})

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next()
})

app.use("/Listings", listings);
app.use("/Listings/:id/reviews", reviews);
app.use("/", userRouter)


// category route
app.get("/:category",async(req,res)=>{
    try{
        let {category} = req.params;
        let filteredListings = await Listing.find({category})
        res.render("listing/category.ejs",{category,allListings:filteredListings})
    }
    catch(err){
        console.log(err);
        res.redirect("/listings")
    }
    
});


//index route


//review route
//post method



// app.get("/sampleListing",(req,res)=>{
//     let sampleListing = new Listing({
//         title:"my new villa",
//         description:"by the beach",
//         price:1000,
//         location:"Delhi",
//         country:"India"
//     });
//     res.send("successful testing")
//     console.log("sampleListing saved")
//     sampleListing.save()
// })

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"))
})
app.use((err,req,res,next)=>{
    let {statusCode=500 , message="somwthing went wrong"} = err;
    res.status(statusCode).render("error.ejs",{message})
    next()
});


app.listen(8080,()=>{
    console.log("app is listening on port 8080")
})
