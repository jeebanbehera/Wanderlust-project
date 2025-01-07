const Listing =  require("../models/listing")
const Review = require("../models/review")


module.exports.createReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id
    listing.review.push(newReview)
    console.log(newReview)
    await newReview.save();
    await listing.save();
    req.flash("success","New review added")
    res.redirect(`/Listings/${listing._id}`)
    console.log("review saved")
    // res.send("review saved")
};


module.exports. destroyReview = async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted")
    res.redirect(`/Listings/${id}`)
}