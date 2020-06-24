var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = [];

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

  var todoText = todoInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  todos.push(todoText);
  todoInput.value = "";

  // Store updated todos in localStorage, re-render the list
  storeTodos();
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
    renderTodos();
  }
});

function getQuote() {
  // quotegarden API
  var queryURL = "https://quote-garden.herokuapp.com/api/v2/quotes?";

  // quotes by design API
  // var queryURL = "https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand";

  // ajax call to Quote Garden
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });

  console.log("working");
}

function gmailAPI() {
  // Client ID and API key from the Developer Console
  var CLIENT_ID =
    "573547482730-8q3jkvtaaahi07k8lpefoe7lqs38v03p.apps.googleusercontent.com";
  console.log("Client ID: " + CLIENT_ID);
  var API_KEY = "AIzaSyBiXWLVyyEEcRTVkh7Hq-kf4eS8TAII3nA";
  console.log("API Key: " + API_KEY);
  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
  ];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  //   make sure the scope is able to write

  var SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

  // Initialize the JavaScript client library.
  gapi.client
    .init({
      apiKey: API_KEY,
      // clientId and scope are optional if auth is not required.
      clientId: CLIENT_ID,
      scope: "profile",
    })
    .then(function () {
      //  Initialize and make the API request.
      // Update with gmail information
      return gapi.client.request({
        path:
          "https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names",
      });
    })
    .then(
      function (response) {
        console.log(response.result);
      },
      function (reason) {
        console.log("Error: " + reason.result.error.message);
      }
    );
}
// 1. Load the JavaScript client library.
gapi.load("client", gmailAPI);
