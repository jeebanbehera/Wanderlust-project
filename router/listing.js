const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { listingSchema, reviewSchema } = require("../Schema.js");
const { isLoggedin,isOwner,validateListing } = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})


const listingController = require("../controller/listing.js")


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedin,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing))
    // .post(upload.single('listing[image]'),(req,res)=>{
    //     res.send(req.file)
    // )




//new route
router.get("/new",isLoggedin,(listingController.renderNewForm))

// search
router.get("/result",(listingController.renderSearchFrom))

//show route, //update, //delete route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedin,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedin,isOwner,wrapAsync(listingController.destroyListing))
router;


//edit route
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.renderEditForm));




module.exports = router;