const User = require("../models/user.js");


module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}


module.exports.signup=async(req,res)=>{
    try{
        let{username, email, password}=req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);

        //jese hi user ne sign up kar diya vese hi automatic vo login bhi ho jaye 
        //so for that we use the  req.login
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
        req.flash("success","Welcome to Wanderlustt");
        res.redirect("/listings");
        })


    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }

    

}

module.exports.renderLoginForm = (req,res)=>{

    res.render("users/login.ejs");   
}


module.exports.loginSuccefull=async(req,res)=>{
        req.flash("success","Welcome back to Wanderlustt! You are logged in!");
        // res.redirect(res.locals.redirectUrl);//when we directly try to logedIn then isLoggedIn middlewere is not triggerd  so it gives page not found error 
        //so to avoid this we do following
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
}


module.exports.logoutSuccefull=(req,res,next)=>{
    req.logout((err)=>{//by default it consist a call back 
        if(err){
             return next(err);

        }
        req.flash("success","You are logout now!");
        res.redirect("/listings")
    })
}