var express = require("express");
var app = express();
var request = require("request");
const port = 3000;
const moviAPIurl = "http://www.omdbapi.com/";
const apiKey = "&apikey=thewdb";

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home"); 
});

app.get("/imdb_search", function(req, res) {
    res.render("imdb_search"); 
});


app.get("/movieSearch/:query/:year/:category",function(req, res){
    var name = req.params.query;
    var year = req.params.year;
    var category = req.params.category;
    
    var url = moviAPIurl + "?s=" + name;
    if (year !== "-1" && year !== undefined) {
        url = url +"&y=" + year;
    } 
    if (category !== "any") {
        url = url + "&type=" + category;
    }
    url = url + apiKey;
    console.log("url is " + url);
    request(url, function(error, repsonse, body) {
        var movieResults = JSON.parse(body);
        console.log(movieResults);
        res.send(movieResults);
    })
})

app.get("/imdb_page/:id", function(req, res){
    console.log("I got here!");
    var imdb_id = req.params.id;
    var url = moviAPIurl + "?i=" + imdb_id + "&plot=full" + apiKey;
    
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200) {
            var results = JSON.parse(body);
            res.render("imdb_page", {results:results});
        }
    });
});

app.get("*", function(req, res) {
    res.send("Page not found :("); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('localhost:3000/');
});