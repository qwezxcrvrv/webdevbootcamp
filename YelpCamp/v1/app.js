var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request =  require("request");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
var campgrounds = [
            {
                name: "Aotearoa",
                image: "http://www.linz.govt.nz/sites/default/files/styles/standard_header_image/public/media/img/oio_header_20170314.jpg?itok=AZ0NpKvh"
            },
            {
                name: "NZ",
                image: "http://www.skiandride.nz/wp-content/uploads/2015/05/Ski-Ride-Snowboard-New-Zealand-Queenstown-Airport-7homepage-gallery.jpg"
            },
            {
                name: "Auckland",
                image: "http://www.fulbright.org.nz/wp-content/uploads/2011/04/U087-Devonport-Auckland-Tourism-New-Zealand.jpg"
            },
        ];

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    res.render("campgrounds",{campgrounds: campgrounds});
})

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
   res.render("new"); 
});



//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started");
});