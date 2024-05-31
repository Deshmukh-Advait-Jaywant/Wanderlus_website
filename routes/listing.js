const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/WrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
// const {isLoggedIn, isOwner, validateListing}=require("../middleware.js");
const {isLoggedIn, isOwner}=require("../middleware.js");
const listingController=require("../controllers/listing.js");

const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


//index route,post route/creat route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),wrapAsync(listingController.newListing));


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//show,delete,edit
router.route("/:id")
.put(isOwner,upload.single('listing[image]'),wrapAsync(listingController.editListing))
.delete(isLoggedIn,wrapAsync(listingController.deleteListing))
.get(wrapAsync(listingController.showListing));
//edit route
router.get("/:id/edit",isLoggedIn,listingController.editListingForm);



module.exports=router;
