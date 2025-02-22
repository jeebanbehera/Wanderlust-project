const Listing = require("../models/listing.js")


// index
module.exports.index = async(req,res)=>{
    let allListings = await Listing.find({});
    res.render("listing/index.ejs",{allListings})
}

// newForm
module.exports.renderNewForm = (req,res)=>{
    res.render("listing/new.ejs")
};


// show listing
module.exports.showListing = async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"review",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing not found");
        res.redirect("/listings")
        // console.log(listing)
    }
    // console.log(listing)
    res.render("listing/show.ejs",{listing})
};


// create Listing
module.exports.createListing = async(req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename}
    await newListing.save();
    req.flash("success","new Listing added")
    res.redirect("/listings");
};


// edit form
module.exports.renderEditForm = async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id)
    if(!listing){
        req.flash("error","listing not found");
        res.redirect("/listings")
    }
    let originalImageUrl = listing.image.url;
    console.log(originalImageUrl)
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250")
    console.log(originalImageUrl)
    res.render("listing/edit.ejs",{listing,originalImageUrl})
};


// update listing
module.exports.updateListing = async(req,res)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(400,"send valid data")
    // }
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing})

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename ;
        listing.image = {url,filename}
        await listing.save()
    }
    
    req.flash("success","Listing updated")
    // res.send("working")
    res.redirect(`/listings/${id}`)

};


// delete listing
module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    // let Listing = req.body.listing;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing)
    req.flash("success","Listing deleted successfully")
    res.redirect("/listings")
}