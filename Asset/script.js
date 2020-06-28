// ----------------------- Script Overview ----------------------- //

// Use Cases



// ----------------------- Todo list Variables ----------------------- //

var todoInput = document.querySelector("#todo-text");

var todoForm = document.querySelector("#todo-form");

var todoList = document.querySelector("#todo-list");

var todoCountSpan = document.querySelector("#todo-count");
// create a todos array to hold todos text
var todos = [];

// ----------------------- Todo list Functions ----------------------- //
init();

function renderTodos() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";

  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete";

    li.appendChild(button);
    todoList.appendChild(li);

    // extra button


  }
}

function init() {
  // Get stored todos from localStorage
  // Parsing the JSON string to an object
  var storedTodos = JSON.parse(localStorage.getItem("todos"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedTodos !== null) {
    todos = storedTodos;
  }

  // Render todos to the DOM
  renderTodos();
}

function storeTodos() {
  // Stringify and set "todos" key in localStorage to todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}

// When form is submitted...
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // clear the whitespace from text entered by the user
  var todoText = todoInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  todos.push(todoText);
  // clear the text from todos textbox
  todoInput.value = "";

  // Store updated todos in localStorage, re-render the list
  storeTodos();
  // display the todo to the user
  renderTodos();
});

// When a element inside of the todoList is clicked...
todoList.addEventListener("click", function (event) {
  var element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    // display the todo to the user
    renderTodos();
  }
});

// button trial begining

// button trial end




// ----------------------- Countdown Timer Start ----------------------- //



var startTimer = function(){
  var duration = moment.duration({
    "minutes": 5,
    "seconds": 00

  });
//    moments.js 
  var timestamp = new Date(0, 0, 0, 2, 10, 30);
  var interval = 1;
  var timer = setInterval(function() {
    timestamp = new Date(timestamp.getTime() + interval * 1000);

    duration = moment.duration(duration.asSeconds() - interval, "seconds");
    var min = duration.minutes();
    var sec = duration.seconds();


    sec -= 1;
    if (min < 0) return clearInterval(timer);
    if (min < 10 && min.length != 2) min = "0" + min;
    if (sec < 0 && min != 0) {
      min -= 1;
      sec = 59;
    } else if (sec < 10 && sec.length != 2) sec = "0" + sec;


   
    $("#newTimmer").text(min + ":" + sec);
    if (min == 0 && sec == 0)
      clearInterval(timer);


  }, 1000);
  }



// ----------------------- Countdown Timer Finsh ----------------------- //



// ----------------------- Quote API Variables ----------------------- //

// quotegarden API
var queryURL = "https://quote-garden.herokuapp.com/api/v2/quotes/random?";
// Quotes on Design API
// var queryURL = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand"; 

// ----------------------- Quote API Functions ----------------------- //

// Quote Garden API call
var quoteText = $("#quote")
//  $(document).ready(function(){
$("#motivationButton").click(function () {
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response.quote.quoteText);
    quoteText.empty();
    quoteText.append(response.quote.quoteText);
  });
});

// ----------------------- Images API Variables ----------------------- //
var randomImageNumber = Math.floor(Math.random() * 20);
var imageToDisplay = $("#motivationImage")
var pixelKey = "17203059-4d033efc49ecc457a7083a895";

var imgUrl = "https://pixabay.com/api/?key=" + pixelKey + "&category=computer&image_type=photo&orientation=horizontal";

// Accepted category values: backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music

// ----------------------- Images API Functions ----------------------- //

function getImages() {

  $.ajax({
    url: imgUrl,
    method: "GET",
  }).then(function (imageData) {
    imageToDisplay.attr("src", imageData.hits[randomImageNumber].webformatURL);
  });
}

getImages();

// ----------------------- Second Images API Functions ----------------------- //

var secondImageUrl = "https://api.unsplash.com/photos/random?client_id=yeduKBA2kZ723vugi0TIdMCjX0EG523F5QhrhuwlLdg"
function getNewImages() {

$.ajax({
  url: secondImageUrl,
  method: "GET",
  scope: "public"
}).then(function (upData) {
  console.log("working!")
  console.log(upData[2]);
});
}

getNewImages();
