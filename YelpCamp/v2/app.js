var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request =  require("request");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

/*Campground.create(
        {
            name: "NZ",
            image: "http://www.skiandride.nz/wp-content/uploads/2015/05/Ski-Ride-Snowboard-New-Zealand-Queenstown-Airport-7homepage-gallery.jpg"
        }, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("Newly created");
                console.log(campground);
            }
            
        }
    )*/


app.get("/",function(req,res){
    res.render("landing");
});


//INDEX
app.get("/campgrounds",function(req,res){
    //Get all campgrounds from DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index",{campgrounds: allCampgrounds});
        }
    });
});


//CREATE
app.post("/campgrounds",function(req,res){
    //get data from from and add to campground DB
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campground page
            res.redirect("/campground");
        }
    });
});


//NEW 
app.get("/campgrounds/new",function(req,res){
   res.render("new"); 
});


//SHOW
app.get("/campgrounds/:id",function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    })
    //render show template with that campground
    res.render("show")
})



//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started");
});