$(document).on("click", "#scrapeArticlesButton", function() { 

  // $(".articles").empty();
  $.getJSON("/favorites", function (data) {
    console.log(data)
    for (var i = 0; i < 20; i ++) {
      // Display the information on the page
      let articleDiv = $("<div>").append(
        $("<img>").attr("src", data[i].image).attr("href", "https://www.empireonline.com" + data[i].link).addClass("card-image"),
        $("<div>").addClass("infoContainer").append(
          $("<a>").text(data[i].title).addClass("article-title").attr("href", "https://www.empireonline.com" + data[i].link),
          $("<p>").text(data[i].summary).addClass("article-summary")
        ),
        $("<button>").text('Save Article').addClass('btn-save').attr('type', 'submit').attr('data-id', data[i]._id)
      ).addClass("card").attr("data-id", data[i]._id)
      $(".articles").append(articleDiv)
    }
  })
})