var express = require("express");
var app = express();

app.get("/",function(req, res){
    res.send("Hi There");
});

app.get("/bye",function(req, res){
    console.log("Someone made this request");
    res.send("Goodbye~~");
});


//Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});