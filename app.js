var express = require("express");
var app = express();
var request = require("request");
const port = 3000;
const apiKey = "thewdb";

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home"); 
});

app.get("/search", function(req, res) {
    res.render("search"); 
});

app.get("/results", function(req, res) {
    var filmName = req.query.filmName;
    var url = "http://www.omdbapi.com/?s=" + filmName + "&apikey=" + apiKey;
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200) {
            var results = JSON.parse(body);
            console.log(results);
            res.render("results", {results:results});
        }
    });
});


app.get("*", function(req, res) {
    res.send("Page not found :("); 
});

app.listen(port, function(){
    console.log('localhost:3000');
});