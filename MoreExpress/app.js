//Another way to initiate Express
//var app = require("express")();
var express = require("express");
var app = express();

//Add public folder to be read
app.use(express.static("public"));
// read .ejs files
app.set("view engine", "ejs");

app.get("/",function(req,res){
    //It is ok to just write index without .ejs
    res.render("index.ejs");
});


//send variables to a view
app.get("/fall/:thing",function(req,res){
    var thing = req.params.thing;
    //It is ok to just write 'love'' without .ejs
    res.render("love", {thingVar: thing});
});

app.get("/posts",function(req, res) {
    var posts = [
            {title: "Post1", author: "Susy"},
            {title: "Post2", author: "Lol"},
            {title: "Post3", author: "Sam"}
        ];
        res.render("posts.ejs", {posts: posts })
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!!")
});