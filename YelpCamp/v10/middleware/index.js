// all the middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {
};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
                //does user own the campground?
                if(foundCampground.author.id.equals(req.user.id)){
                   next();// Allow to do next process
                } else{
                    res.redirect("back");
                }
            }
        });
    } else{
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                //does user own the campground?
                if(foundComment.author.id.equals(req.user._id)){
                   next();// Allow to do next process
                } else{
                    res.redirect("back");
                }
            }
        });
    } else{
        res.redirect("back");
    }
}


//Check user is logged in. If not redirect to 'login' view
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = middlewareObj;