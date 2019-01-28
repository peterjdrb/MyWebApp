var express = require("express");
var app = express();
var request = require("request");
const port = 3000;
const apiKey = "thewdb";

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home"); 
});

app.get("/imdb_search", function(req, res) {
    res.render("imdb_search"); 
});

app.get("/imdb_results", function(req, res) {
    var name = req.query.name;
    var year = req.query.filmYear;
    var category = req.query.category;
    
    var url = "http://www.omdbapi.com/?s=" + name;
    if (year !== "") {
        url = url +"&y=" + year;
    } 
    if (category !== "any") {
        url = url + "&type=" + category;
    }
    url = url +"&apikey=" + apiKey;
    
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200) {
            var results = JSON.parse(body);
            if (results.Response === "False"){
                res.render("imdb_search", {error:results});
            } else {
                res.render("imdb_results", {results:results});
            }
        }
    });
});

app.get("*", function(req, res) {
    res.send("Page not found :("); 
});

app.listen(port, function(){
    console.log('localhost:3000/');
});