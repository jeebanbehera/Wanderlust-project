const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");

const listingSchema = new Schema({
    title:{
        type:String,
        require,
    },
    description:String,
    image:{
        // default:"https://images.unsplash.com/photo-1623718649591-311775a30c43?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // type:String,
        // set: (v) => v === ""? "https://images.unsplash.com/photo-1623718649591-311775a30c43?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        // :v

        url:String,
        filename:String
    },
    price:Number,
    location:String,
    country:String,
    review:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type:String,
        require,
    }

});


listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.review}})
    }
})
const Listing = mongoose.model("Listing",listingSchema)
module.exports=Listing;