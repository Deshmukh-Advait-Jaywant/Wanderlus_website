const Listing=require("../models/listing");
const mapToken = process.env.MAP_TOKEN;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: mapToken });



module.exports.index=async (req,res)=>{
    const allListings=await Listing.find({})
    let username=req.query.username;
    console.log(username);
    res.render("./listings/index.ejs",{allListings,username});
};
module.exports.renderNewForm=(req,res)=>{
    res.render("./listings/new.ejs");
};
module.exports.newListing=async (req,res,next)=>{

    if(!req.body.listing){
        next(new ExpressError(400,"send valid data"));
    }

    let response = await geocodingClient.forwardGeocode({
        query:req.body.listing.location,
        limit: 1
    }).send();

    console.log(response.body.features[0].geometry);
        let url=req.file.path;
        let filename=req.file.filename;
        const newListing=await new Listing(req.body.listing);
        newListing.owner=req.user._id;
        newListing.image={url,filename};

        newListing.geometry=response.body.features[0].geometry;
        console.log(newListing);
        let save= await newListing.save();
        console.log(save);
        req.flash("success","New listing Created");
        res.redirect("/listings");
};
module.exports.editListingForm=async (req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","listing not found");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl.replace("/upload","/upload/h_9000,w_2500");
    res.render("./listings/edit.ejs",{listing,originalImageUrl});
};
module.exports.editListing=async (req,res,next)=>{
    let {id}=req.params;
    if(!req.body.listing){
        next(new ExpressError(400,"send valid data"));
    }
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if (typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    
    req.flash("success","Listing Updated")
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing=async (req,res,next)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","listing Deleted")
    res.redirect("/listings");
};

module.exports.showListing=async(req,res,next)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"review",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","listing not found");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{listing});
};


