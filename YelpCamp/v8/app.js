var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    request             = require("request"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    User                = require("./models/user"),
    seedDB              = require("./seeds")
 
//Requiring Routes   
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index")
    
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
//seedDB();  //Seed DB

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Vin DDoong E is too much cute!!!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

//Get Routes
app.use(indexRoutes);
//All campground routes start from /campgrounds/...... 
app.use("/campgrounds",campgroundRoutes); 
//All comment routes start from /campgrounds/:id/comments/...... with params, have to use --> var route = express.Router({mregeParams: true});
app.use("/campgrounds/:id/comments",commentRoutes); 

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});