if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require("express");
const app=express();
const port=8080;

const path=require("path");
const methodOverride=require("method-override");
const mongoose=require("mongoose");
const ejsMate=require("ejs-mate");
const flash=require("connect-flash");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");

const Listing=require("./models/listing.js");


const passport=require("passport");
const Localstrategy=require("passport-local");
const User=require("./models/user.js");

const sessionOptions={
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly: true,  //only accessible through https
        expires:Date.now + 7*24*60*60*1000,   //7days* 24hrs *60min *60sec *10000 millisecond
        maxAge:7*24*60*60*1000,
    },
}
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize()); //pasport.initialize is amiddleware that should be written before we use passport
// A web express.application needs the ability to identify users as they browse from page to page. this series of requests and responses, each associated with the same user, is known as a session.
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const user = require("./models/user.js");


app.engine('ejs',ejsMate);
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true})); 
app.use(express.static(path.join(__dirname,"public")));
const mongo_url="mongodb://127.0.0.1:27017/wanderlus";

main().then(()=>{
    console.log("connected sucessfully");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
}

app.get("/listings/search/iconiccities", async (req, res, next) => {
    try {
        // Find listings with the category "iconic cities"
        const allListings = await Listing.find({ category: 'iconic cities' });

        // Render the iconicCities.ejs view and pass the fetched listings to it
        res.render("./listings/index.ejs", { allListings });
    } catch (err) {
        // Handle errors
        next(err);
    }
});

app.get("/listings/search/trending", async (req, res, next) => {
    try {
        // Find listings with the category "trending"
        const allListings = await Listing.find({ category: 'trending' });
        
        // Check if any listings were found
        if(allListings.length > 0){
            res.render("./listings/index.ejs", { allListings });
        }
        else{
            req.flash("error","There are no listings available for trending.");
            res.redirect('/listings');
        }
    } catch (err) {
        // Handle errors
        next(err);
    }
});

app.get("/listings/search/rooms", async (req, res, next) => {
    try {
        // Find listings with the category "trending"
        const allListings = await Listing.find({ category: 'rooms' });
        
        // Check if any listings were found
        if(allListings.length > 0){
            res.render("./listings/index.ejs", { allListings });
        }
        else{
            req.flash("error","There are no listings available for rooms.");
            res.redirect('/listings');
        }
    } catch (err) {
        // Handle errors
        next(err);
    }
});

app.get("/listings/search/Mountains", async (req, res, next) => {
    try {
        // Find listings with the category "trending"
        const allListings = await Listing.find({ category: 'Mountains' });
        
        // Check if any listings were found
        if(allListings.length > 0){
            res.render("./listings/index.ejs", { allListings });
        }
        else{
            req.flash("error","There are no listings available for Mountains.");
            res.redirect('/listings');
        }
    } catch (err) {
        // Handle errors
        next(err);
    }
});

app.get("/listings/search/castels", async (req, res, next) => {
    try {
        // Find listings with the category "trending"
        const allListings = await Listing.find({ category: 'castels' });
        
        // Check if any listings were found
        if(allListings.length > 0){
            res.render("./listings/index.ejs", { allListings });
        }
        else{
            req.flash("error","There are no listings available for castels.");
            res.redirect('/listings');
        }
    } catch (err) {
        // Handle errors
        next(err);
    }
});

app.get("/listings/search/pool", async (req, res, next) => {
    try {
        // Find listings with the category "trending"
        const allListings = await Listing.find({ category: 'pool' });
        
        // Check if any listings were found
        if(allListings.length > 0){
            res.render("./listings/index.ejs", { allListings });
        }
        else{
            req.flash("error","There are no listings available for pool.");
            res.redirect('/listings');
        }
    } catch (err) {
        // Handle errors
        next(err);
    }
});
app.get("/listings/search/camping", async (req, res, next) => {
    try {
        // Find listings with the category "trending"
        const allListings = await Listing.find({ category: 'camping' });
        
        // Check if any listings were found
        if(allListings.length > 0){
            res.render("./listings/index.ejs", { allListings });
        }
        else{
            req.flash("error","There are no listings available for camping.");
            res.redirect('/listings');
        }
    } catch (err) {
        // Handle errors
        next(err);
    }
});
app.get("/listings/search/farm", async (req, res, next) => {
    try {
        // Find listings with the category "trending"
        const allListings = await Listing.find({ category: 'farm' });
        
        // Check if any listings were found
        if(allListings.length > 0){
            res.render("./listings/index.ejs", { allListings });
        }
        else{
            req.flash("error","There are no listings available for farm.");
            res.redirect('/listings');
        }
    } catch (err) {
        // Handle errors
        next(err);
    }
});
app.get("/listings/search/arctic", async (req, res, next) => {
    try {
        // Find listings with the category "trending"
        const allListings = await Listing.find({ category: 'arctic' });
        
        // Check if any listings were found
        if(allListings.length > 0){
            res.render("./listings/index.ejs", { allListings });
        }
        else{
            req.flash("error","There are no listings available for arctic.");
            res.redirect('/listings');
        }
    } catch (err) {
        // Handle errors
        next(err);
    }
});
app.get("/listings/search/riverView", async (req, res, next) => {
    try {
        // Find listings with the category "trending"
        const allListings = await Listing.find({ category: 'riverView' });
        
        // Check if any listings were found
        if(allListings.length > 0){
            res.render("./listings/index.ejs", { allListings });
        }
        else{
            req.flash("error","There are no listings available for riverView.");
            res.redirect('/listings');
        }
    } catch (err) {
        // Handle errors
        next(err);
    }
});
app.get("/listings/search/hillStation", async (req, res, next) => {
    try {
        // Find listings with the category "trending"
        const allListings = await Listing.find({ category: 'hillStation' });
        
        // Check if any listings were found
        if(allListings.length > 0){
            res.render("./listings/index.ejs", { allListings });
        }
        else{
            req.flash("error","There are no listings available for hillStation.");
            res.redirect('/listings');
        }
    } catch (err) {
        // Handle errors
        next(err);
    }
});





app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
});
app.use((err,req,res,next)=>{
    // res.send(err.stack);
    let {statusCode=500,message="some Error"}=err;
    res.render("error.ejs",{message});
    // res.status(statusCode).send(message);
    
});



app.listen(port,()=>{
    console.log("app listining on port 8080");
});