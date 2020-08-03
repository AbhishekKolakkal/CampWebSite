var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});

   

router.get("/register", function(req, res){
   res.render("register"); 
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds"); 
        });
    });
    
    
});

router.get("/login", function(req, res){
   res.render("login"); 
    req.flash("error", "Login First");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: "Invalid username or password"
    }), function(req, res){
        req.flash("error", "Please Login in");
});

router.get("/logout", function(req, res){
   req.logout();
   req.flash("error", "Logged You Out");
   res.redirect("/campgrounds");
});


module.exports = router;