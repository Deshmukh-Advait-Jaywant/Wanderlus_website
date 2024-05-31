const mongoose=require("mongoose");
const {Schema}=mongoose;
const Review=require("./reviews")
const Booking=require("./booking");
const listingSchema=new Schema({
    title:{
        type:String,
        requried:true,
    },
    description:{
        type:String,
    },
    image:{
        url: String,
        filename:String,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    review:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:
        {
            type:Schema.Types.ObjectId,
            ref:"User",
        },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    category:{
        type:String,
        requried:true,
        enum:['rooms','iconic cities','mountain','castels','pool','camping','farm','arcitc','Hill station','River View'],
    },

});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id :{$in :listing.review}});
    } 
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;