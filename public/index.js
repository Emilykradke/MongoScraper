// When the 'Scrape Articles button is clicked, grab the articles as a json
$(document).on("click", "#scrapeArticlesButton", function() {
  $(".articles").empty();

  $.getJSON("/scrape", function(req, res) {
  })

  $.getJSON("/articles", function(data) {
    console.log(data);
    // ("#articleCard").empty();

    
    for (var i = 0; i < 20; i ++) {
      // Display the information on the page
      // $("#articleCard").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].image + "</p>")
      let articleDiv = $("<div>").append(
        $("<img>").attr("src", data[i].image),
        $("<p>").text(data[i].title).addClass("article-title").attr("href", data[i].link),
        $("<p>").text(data[i].summary).addClass("article-summary")
      ).addClass("card").attr("data-id", data[i]._id)
      $(".articles").append(articleDiv)
    }
  });
});