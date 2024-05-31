const express=require("express");
const app=express();
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
};
app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let {name="Anonymous"}=req.query;
    req.session.name=name;
    if(req.session.name=="Anonymous"){
        req.flash("error","user not registered successfully");
    }else{
        req.flash("success","user registered successfully");
    }

    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.render("show.ejs",{name:req.session.name});
});




// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1
//     }
    
//     res.send(`you sent a request ${req.session.count} times`);
// });


// app.get("/test",(req,res)=>{
//     res.send('woriking');
// });

app.listen(3000,()=>{
    console.log("app listining to port 3000");
});
// const cookieParser=require("cookie-parser");

// app.use(cookieParser("secretcode"));
// app.get("/",(req,res)=>{
//     res.send("Hi, I am root!");
// });
// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("name","India",{signed:true});
//     res.send("done");
// });
// app.get("/verify",(req,res)=>{
//     res.send(req.signedCookies);
// });
// //send cookies
// app.get("/getCookies",(req,res)=>{
//     res.cookie("greet","namaste");
//     res.cookie("name","advait");
//     res.send("cookie sent");
// });

// app.get("/users",(req,res)=>{
//     let {name="Aditi"}=req.cookies;
//     res.send(name);
// });


// app.get("/posts",(req,res)=>{
//     res.send("posts route");
// });