const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../Schema.js")
const Review = require("../models/review.js");
const { isLoggedin,validateReview,isReviewAuthor } = require("../middleware.js");


const ReviewController = require("../controller/review.js")


// const validateReview = (req,res,next)=>{
//     let {error} = reviewSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el)=>el.message).join(",")
//         throw new ExpressError(400,errMsg)
        
//     }
//     else{
//         next()
//     }
// }

router.post("/",isLoggedin,validateReview,wrapAsync(ReviewController.createReview))

//delete route
router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(ReviewController.destroyReview));


module.exports = router;