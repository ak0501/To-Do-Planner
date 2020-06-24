// var queryURL = "https://quote-garden.herokuapp.com/api/v2/quotes?";  quotegarden API


// var queryURL = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand"; Quotes on Design API

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});

console.log("working");
