const user = require("../models/user.js");



module.exports.renderSignUpFrom = (req,res)=>{
    res.render("../views/users/signUp.ejs")
};


module.exports.signUp = async(req,res,next)=>{
    try{
        const {username,email,password}=req.body;
        console.log(username)
        const  newUser = new user({email,username});
        const registerUser= await user.register(newUser,password);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err)
            }
            req.flash("success","Wlecome to Wanderlust");
            res.redirect("/listings")
        })
        // console.log(registerUser)

    }
    catch(err){
        req.flash("error", err.message);
        res.redirect("/signup")
    }
};


module.exports.renderLoginFrom = (req,res)=>{
    res.render("../views/users/login.ejs")
};


module.exports.Login =  (async(req,res)=>{
    let {username}= req.body
    req.flash("success",`Welcome back ${username}`);
    
    res.redirect(res.locals.redirectUrl || "/listings" )

});

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        };
        req.flash("success","you logOut!");
        res.redirect("/listings")
    })
}