const express = require("express");
const app = express();
const request = require("request");
const port = 3000;
const moviAPIurl = "http://www.omdbapi.com/";
const movieApiKey = process.env.movieAPI;
const weatherApiKey = process.env.weatherAPI;
const weatherUrl = "https://api.apixu.com/v1/";

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home"); 
});

app.get("/imdb_search", function(req, res) {
    res.render("imdb_search"); 
});

app.get("/movieSearch/:query/:year/:category/:page",function(req, res){
    var name = req.params.query;
    var year = req.params.year;
    var category = req.params.category;
    var currentPage = req.params.page;
    
    var url = moviAPIurl + "?s=" + name;
    if (year !== "-1" && year !== undefined) {
        url = url +"&y=" + year;
    } 
    if (category !== "any") {
        url = url + "&type=" + category;
    }
    
    url = url + "&page=" + currentPage;
    url = url + movieApiKey;
    request(url, function(error, repsonse, body) {
        var movieResults = JSON.parse(body);
        res.send(movieResults);
    });
});

app.get("/imdb_page/:id", function(req, res){
    var imdbId = req.params.id;
    var url = moviAPIurl + "?i=" + imdbId + "&plot=full" + movieApiKey;
    
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200) {
            var results = JSON.parse(body);
            res.render("imdb_page", {results:results});
        }
    });
});

app.get("/weather", function(req, res){
    res.render("weather");
});

app.get("/weather/search/:userLocation", function(req, res){
    var location = req.params.userLocation;
    var url = weatherUrl + "search.json?" + weatherApiKey + "&q=" + location;
    request(url, function(error, repsonse, body) {
        var results = JSON.parse(body);
        res.send(results);
    });
});

app.get("/weather/data/:location", function(req, res){
    var location = req.params.location;
    var url = weatherUrl + "current.json?" + weatherApiKey + "&q=" + location;
    request(url, function(error, repsonse, body) {
        var results = JSON.parse(body);
        res.send(results);
    });
});

app.get("*", function(req, res) {
    res.send("Page not found"); 
});

app.listen(port, function(){
    console.log('localhost:3000/');
});