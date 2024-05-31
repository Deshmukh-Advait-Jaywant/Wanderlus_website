const User=require("../models/user.js");

module.exports.renderSignUpForm=(req,res)=>{
    res.render("users/signup.ejs");
};
module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser= new User({email,username});
        const registeredUser=await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","user was registered successfully");
            res.redirect("/listings");
        })
    }catch(err){
        req.flash("error","err.message");
        res.redirect("/signup");
    }
};

module.exports.renderLogInForm=(req,res)=>{
    res.render("users/login.ejs")
};

// module.exports.login=async(req,res)=>{
//     let {username}=req.body;
//     console.log(username);
//     req.flash("success","welcome to Wandurlus");
//     // console.log(user.username);
//     let redirectUrl= res.locals.redirectUrl || "/listings";
//     console.log(redirectUrl);
//     res.redirect(redirectUrl);
// };

module.exports.login = async (req, res) => {
    let { username } = req.body;
    console.log(username);
    req.flash("success", "Welcome to Wandurlus");
    
    let redirectUrl = res.locals.redirectUrl || "/listings";

    // Append username as a query parameter to the redirect URL
    redirectUrl += `?username=${encodeURIComponent(username)}`;

    console.log(redirectUrl);
    res.redirect(redirectUrl);
}


module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{   //req.logout(this is a call back)
        if(err){
            next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    });
};