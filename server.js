var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Routes:

// A GET route for scraping the cinemablend website and then add it to the db
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.cinemablend.com/news.php").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every div with a 'story_item'class
    $("div.story_item").each(function(i, element) {
      var result = {};

      // Add all of the elements and save them as properties
      result.image = $(element).find("img").attr("src");
      result.author = 
      result.title = $(element).find("a").attr("title");
      result.link = $(element).find("a").attr("href");
      result.summary = $(element).find(".story_summary.p").text();
      // result.date = 
 
      console.log(result)
    })

  })
    
     
})

// A GET route for GETting all of the articles from the db


// A GET route for grabbing a specific article by id, then populating it with its comment


// A POST route for saving/updating an article's associated comment


// Start the server
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}!`)
})