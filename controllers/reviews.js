const Listing=require("../models/listing");
const Review =require("../models/reviews.js");
module.exports.craterReview=async (req, res) => {
    console.log("i am inside");
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.review.push(newReview);
    console.log("about to be saved");
    await newReview.save();
    await listing.save();
    req.flash('success','Successfully added a review');
    res.redirect(`/listings/${listing._id}`);
};

//delete review
module.exports.destroyReview=async(req,res)=>{
    console.log("hi");
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Deleted the review")
    res.redirect(`/listings/${id}`);
};