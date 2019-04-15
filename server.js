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

// Routes
require("./routes/html-routes.js")(app);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/CinemaScrapedb", { useNewUrlParser: true });

// Routes:

// A GET route for scraping the cinemablend website and then add it to the db
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.empireonline.com/movies/news/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every div with a 'story_item'class
    $("article").each(function(i, element) {
      var result = {};

      // Add all of the elements and save them as properties
      result.image = $(element).find("img").attr("src");
      result.title = $(element).find("p.hdr").text();
      result.link = $(element).find("a").attr("href");
      result.summary = $(element).children("p.delta").text();
 

      // Create a new Article using the 'result' object built from scraping 
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle)
        })
        .catch(function(err) {
          // if an error occured, log it
          console.log(err);
        });

    });

    
    // Send a message to the client
    res.send("Scrape Complete")

  });
});

// A GET route for GETting all of the articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.get("/favorites", function (req, res) {
  db.Article.find({ saved: true }).then(function (dbArticle) {
    res.json(dbArticle);
    console.log(dbArticle)
  }).catch(function (err) {
    res.json(err);
  });
})

app.post('/articles/:id', function (req, res) {
  let id = req.params.id
  db.Article.updateOne({ _id: id }, { $set: { saved: true } }, function (error, edited) {
      if (error) {
          console.log(error);
          res.send(error);
      }
      else {
          console.log(edited);
          res.send(edited);
      }
  })
})



// Start the server
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}!`)
})