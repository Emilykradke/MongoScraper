// This file sets up routes for sending users to various html pages

// Dependencies
var path = require("path");

// Routes
module.exports = function(app) {
  
  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  })

  // saved route loads saved.html
  app.get("/saved", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/saved.html"))
  })
}