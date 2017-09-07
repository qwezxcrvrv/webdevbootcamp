var express = require("express");
var app = express();

app.get('/', function(req,res){
    res.send("Hi there, welcome to my assignment!");
});


app.get('/speak/:animal', function(req,res){
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof"
    };
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The "+animal+" says '"+sound+"'");
});


app.get('/repeat/:commentText/:loopNumber', function(req,res){
    var comment = req.params.commentText;
    var number = Number(req.params.loopNumber);
    var result = "";
    for (var i = 0; i < number; i++) {
        result += comment+' ';
    }
    res.send(result);
});


app.get('*', function(req,res){
    res.send("Sorry, page not found");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});