const express=require("express");
const router=express.Router({mergeParams:true});

 const wrapAsync=require("../utils/WrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");
const Review =require("../models/reviews.js");
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

//review
//add review

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.craterReview));
//delete review
//delete route
router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrapAsync(reviewController.destroyReview));
module.exports=router;