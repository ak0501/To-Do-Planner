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
$("#points").text(localStorage.clickcount);
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


    var deleteButton = document.createElement("button");
    deleteButton.classList.add("fa", "fa-close", "btn", "btn-danger", "btn-lg");


    var countdownButton = document.createElement("button");
    countdownButton.classList.add("fa", "fa-hourglass-1", "btn", "btn-primary", "btn-lg");


    var completeButton = document.createElement("button");
    completeButton.classList.add("fa", "fa-check-square-o", "btn", "btn-success", "btn-lg");

    li.appendChild(deleteButton);
    li.appendChild(countdownButton);
    li.appendChild(completeButton);

    todoList.appendChild(li);
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
  if (element.classList.contains("fa-close") == true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    // display the todo to the user
    renderTodos();
  } else if (element.classList.contains("fa-hourglass-1") == true) {
    console.log("Timer!");
  } else {
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);
    // Update points counter
    clickCounter();
    // Store updated todos in localStorage, re-render the list
    storeTodos();
    // display the todo to the user
    renderTodos();
  }
});


function clickCounter() {
  if (typeof (Storage) !== "undefined") {
    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount) + 1;
      $("#points").text(localStorage.clickcount);
    } else {
      localStorage.clickcount = 1;
    }
  }
}
// ----------------------- Countdown Timer Start ----------------------- //

var startTimer = function () {
  var duration = moment.duration({
    "minutes": 0,
    "seconds": 10
  });
  //    moments.js 
  var timestamp = new Date(0, 0, 0, 2, 10, 30);
  var interval = 1;
  var timer = setInterval(function () {
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
    $("#time").text(min + ":" + sec);
    if (min == 0 && sec == 0)
      clearInterval(timer);
  }, 1000);
}

$("#timerButton").on("click", function timmerClick() {
  var fiveMinutes = 60 * 5,
    display = document.querySelector('#time');
  startTimer(fiveMinutes, display);
});




// ----------------------- Quote API Variables ----------------------- //


// quotegarden API
var queryURL = "https://quote-garden.herokuapp.com/api/v2/quotes/random?";

// Quotes on Design API

// ----------------------- Filtered Quotes API Variables (currently in test phase)----------------------- //
// var genreName = ["be-great", "effort", "goals", "procrastination", "action"];
// var randomQuoteNumber = Math.floor(Math.random() * genreName.length);

// random genre API call
// var randomQuoteURL = "https://quote-garden.herokuapp.com/api/v2/genre/:" + genreName[randomQuoteNumber] + "?page=1&limit=10"
// ----------------------- Quote API Functions ----------------------- //

// Quote Garden API call
var quoteText = $("#quote")
$("#motivationButton").click(function () {
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    quoteText.empty();
    quoteText.append(response.quote.quoteText + "\n" + "- " + response.quote.quoteAuthor);
  });
});

// ----------------------- Images API Variables ----------------------- //
var randomImageNumber = Math.floor(Math.random() * 20);
var imageToDisplay = $("#motivationImage")
var pixelKey = "17203059-4d033efc49ecc457a7083a895";

var imgUrl = "https://pixabay.com/api/?key=" + pixelKey + "&category=places&image_type=photo&orientation=horizontal";

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

// ----------------------- Second Images API Functions (currently in test phase) ----------------------- //

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

