const game = document.getElementById("game");
var questionsData = [];
var correctAnswer = "";
var points = 0;
var stack = [];
var currentMax = 0;
var correct = new Audio("correct.mp3");
var fail = new Audio("fail.mp3");
var victory = new Audio("victory.mp3");
window.onload = function () {
  init();
};
const init = async function () {
  console.log("Initializing");
  gotoStart();
};

const gotoStart = function () {
  console.log("Going back to start.");

  console.log(stack);
  game.innerHTML = null;
  points = 0;
  const div = document.createElement("div");
  const header = document.createElement("h1");
  const content = document.createTextNode("Valitse kertotaulu");
  header.appendChild(content);
  div.appendChild(header);

  const table2 = titleQuestion("2", "./kerto2.json");
  const table3 = titleQuestion("3", "./kerto3.json");
  const table4 = titleQuestion("4", "./kerto4.json");
  const table5 = titleQuestion("5", "./kerto5.json");
  const table6 = titleQuestion("6", "./kerto6.json");
  const table7 = titleQuestion("7", "./kerto7.json");
  const table8 = titleQuestion("8", "./kerto8.json");
  const table9 = titleQuestion("9", "./kerto9.json");
  const table10 = titleQuestion("10", "./kerto10.json");
  const tableAll = titleQuestion("Kaikki yhdessä", "./questions.json");
  div.appendChild(table2);
  div.appendChild(table3);
  div.appendChild(table4);
  div.appendChild(table5);
  div.appendChild(table6);
  div.appendChild(table7);
  div.appendChild(table8);
  div.appendChild(table9);
  div.appendChild(table10);
  div.appendChild(tableAll);
  game.appendChild(div);

  //getQuestion();
};

const titleQuestion = function (tete, fifi) {
  const div = document.createElement("div");
  const text = document.createTextNode(tete);
  div.appendChild(text);
  div.classList.add("option");
  div.addEventListener("click", function () {
    const el = document.getElementById("game");
    el.style.opacity = 0;
    setTimeout(() => {
      loadJson(fifi).then(() => {
        getQuestion();
      });
      el.style.opacity = 1;
    }, 400);
  });
  return div;
};
const getQuestion = function () {
  game.innerHTML = null;
  if (stack.length === 0) {
    win();
  } else {
    var i = stack.pop();

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    const progr = document.createElement("div");
    progr.classList.add("progress");
    progressBar.appendChild(progr);
    var progress = (points / currentMax) * 100;
    progr.style.width = progress + "%";
    game.appendChild(progressBar);
    formQuestion(questionsData[i]);
  }
};
const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
const formQuestion = function (question) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.id = "currentQuestion";
  const header = document.createElement("h1");
  const content = document.createTextNode(question.question);
  header.appendChild(content);
  div.appendChild(header);
  const list = document.createElement("ul");
  list.id = "list";
  question.options.sort(() => (Math.random() > 0.5 ? 1 : -1));
  question.options.sort(() => (Math.random() > 0.5 ? 1 : -1));
  question.options.forEach((op) => {
    const button = document.createElement("li");
    const text = document.createTextNode(op);
    button.appendChild(text);
    button.classList.add("option");

    button.addEventListener("click", function () {
      // Your code to be executed when the button is clicked
      var clickedButtonText = this.textContent;
      if (clickedButtonText === correctAnswer) {
        getPoint();
      } else {
        wrongAnswer();
      }
    });

    list.appendChild(button);
  });
  correctAnswer = question.correctAnswer;
  div.appendChild(list);
  game.appendChild(div);
};
const getPoint = function () {
  points += 1;
  correct.play();
  const el = document.getElementById("game");
  el.style.opacity = 0;
  setTimeout(() => {
    getQuestion();
    el.style.opacity = 1;
  }, 400);
};

const win = function () {
  game.innerHTML = null;
  victory.play();
  const div = document.createElement("div");
  const header = document.createElement("h1");
  const content = document.createTextNode("Voitit Pelin!");
  header.appendChild(content);
  div.appendChild(header);

  const pointsDiv = document.createElement("h3");
  const pointsText = document.createTextNode("Kaikki Oikein!");
  pointsDiv.appendChild(pointsText);
  div.appendChild(pointsDiv);

  const startGame = document.createElement("div");
  const text = document.createTextNode("Takaisin valikkoon");
  startGame.appendChild(text);
  startGame.classList.add("option");
  startGame.addEventListener("click", function () {
    const el = document.getElementById("game");
    el.style.opacity = 0;
    setTimeout(() => {
      gotoStart();
      el.style.opacity = 1;
    }, 400);
  });
  div.appendChild(startGame);
  game.appendChild(div);
};
const wrongAnswer = function () {
  const list = document.getElementById("list");
  var liElements = list.querySelectorAll("li");
  fail.play();
  for (var i = 0; i < liElements.length; i++) {
    if (liElements[i].textContent === correctAnswer) {
      liElements[i].style.backgroundColor = "green";
    } else {
      liElements[i].style.backgroundColor = "red";
    }
    liElements[i].style.pointerEvents = "none";
    console.log(liElements[i].textContent);
  }
  setTimeout(function () {
    const el = document.getElementById("game");
    el.style.opacity = 0;
    setTimeout(() => {
      gameOver();
      el.style.opacity = 1;
    }, 400);
  }, 3000);
};
const gameOver = function () {
  game.innerHTML = null;

  const div = document.createElement("div");
  const header = document.createElement("h1");
  const content = document.createTextNode("Vastasit väärin :(");
  header.appendChild(content);
  div.appendChild(header);

  const pointsDiv = document.createElement("h3");
  const pointsText = document.createTextNode("Pisteet: " + points);
  pointsDiv.appendChild(pointsText);
  div.appendChild(pointsDiv);

  const startGame = document.createElement("div");
  const text = document.createTextNode("Takaisin alkuun");
  startGame.appendChild(text);
  startGame.classList.add("option");
  startGame.addEventListener("click", function () {
    const el = document.getElementById("game");
    el.style.opacity = 0;
    setTimeout(() => {
      gotoStart();
      el.style.opacity = 1;
    }, 400);
  });
  div.appendChild(startGame);
  game.appendChild(div);
};

const loadJson = async function (file) {
  await fetch(file)
    .then((response) => response.json())
    .then((jsonData) => {
      questionsData = jsonData;
    })
    .catch((error) => console.error("Error fetching questions:", error));
  // Load questions to stack
  stack = [];
  questionsData.forEach((qu, i) => {
    stack.push(i);
  });
  stack.sort(() => (Math.random() > 0.5 ? 1 : -1));
  console.log(stack);
  currentMax = stack.length;
  // END
};
