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



function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
          timer = duration;
      }
  }, 1000);
}

$("#timmerButton").on("click", function timmerClick() {
  var fiveMinutes = 60 * 5,
      display = document.querySelector('#time');
  startTimer(fiveMinutes, display);
});



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
  $("#motivationButton").click(function(){
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

var imgUrl = "https://pixabay.com/api/?key=" + pixelKey + "&category=feelings&image_type=photo";

// Accepted category values: backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music

// ----------------------- Images API Functions ----------------------- //

function getImages() {
  
  $.ajax({
    url: imgUrl,
    method: "GET",
  }).then(function (imageData) {
    console.log("working!");
    imageToDisplay.attr("src", imageData.hits[randomImageNumber].webformatURL);
  });
}

getImages();