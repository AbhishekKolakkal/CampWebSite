var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
     if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)) {
                    next(); 
                } else {
                    req.flash("error", "You Don't Have The Permission");
                    res.redirect("back");
                }
       }
    });
    } else {
        req.flash("error", "You Need To Be Logged In");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
     if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "comment not found");
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next(); 
                } else {
                    req.flash("error", "You Dont Have Permission To Do That");
                    res.redirect("back");
                }
       }
    });
    } else {
        req.flash("error", "You Need To Be ogged in")
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
       return next(); 
    }
    req.flash("error", "You Need to be logged in");
    res.redirect("/login");
}

module.exports = middlewareObj;