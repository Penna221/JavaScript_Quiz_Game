const game = document.getElementById('game');
var questionsData = [];
var correctAnswer = "";
var points = 0;
var stack = [];
window.onload = function(){
    
    init();
}
const init = async function(){
    console.log("Initializing");
    await loadJson().then(()=>{
        
        gotoStart();

    });
    
}
const gotoStart = function (){
    console.log('Going back to start.');
    questionsData.forEach((qu,i)=>{
        stack.push(i);
    })
    stack.sort(() => (Math.random() > .5) ? 1 : -1);
    console.log(stack);
    game.innerHTML = null;
    points = 0;
    const div = document.createElement("div");
    const header = document.createElement("h1");
    const content = document.createTextNode("Quiz Game");
    header.appendChild(content);
    div.appendChild(header);
    
    const startGame = document.createElement("div");
    const text = document.createTextNode("Start game");
    startGame.appendChild(text);
    startGame.classList.add("option");
    startGame.addEventListener("click", function() {
    const el = document.getElementById("game");
    el.style.opacity = 0;
    setTimeout(() => {
        getQuestion();
        el.style.opacity = 1;
        }, 400);
    });
    div.appendChild(startGame);
    game.appendChild(div);
    

    //getQuestion();
    
}
const getQuestion = function(){
    game.innerHTML = null;
    if(stack.length===0){
        win();
    }else{
        var i = stack.pop();
        
        formQuestion(questionsData[i]);

    }
}
const getRandomNumber = function (min, max){
    return Math.floor(Math.random() * (max - min) + min);
}
const formQuestion = function (question){
    const div = document.createElement("div");
    div.classList.add("card");
    div.id = "currentQuestion";
    const header = document.createElement("h1");
    const content = document.createTextNode(question.question);
    header.appendChild(content);
    div.appendChild(header);
    const list = document.createElement("ul");
    list.id = "list";
    question.options.forEach((op)=>{
        const button = document.createElement("li");
        const text  = document.createTextNode(op);
        button.appendChild(text);
        button.classList.add("option");

        button.addEventListener("click", function() {
            // Your code to be executed when the button is clicked
            var clickedButtonText = this.textContent;
            if (clickedButtonText === correctAnswer) {
                getPoint();
            } else {
                wrongAnswer();
            }
          });

        list.appendChild(button);
    })
    correctAnswer = question.correctAnswer;
    div.appendChild(list);
    game.appendChild(div); 

}
const getPoint = function(){
    points += 1;
    const el = document.getElementById("game");
    el.style.opacity = 0;
    setTimeout(() => {
        getQuestion();
        el.style.opacity = 1;
    }, 400);
}

const win = function(){
    game.innerHTML = null;

    const div = document.createElement("div");
    const header = document.createElement("h1");
    const content = document.createTextNode("You Win!");
    header.appendChild(content);
    div.appendChild(header);
    
    const pointsDiv = document.createElement("h3");
    const pointsText = document.createTextNode("All questions answered correctly! WOW!");
    pointsDiv.appendChild(pointsText);
    div.appendChild(pointsDiv);

    const startGame = document.createElement("div");
    const text = document.createTextNode("Back to Menu");
    startGame.appendChild(text);
    startGame.classList.add("option");
    startGame.addEventListener("click", function() {
    const el = document.getElementById("game");
    el.style.opacity = 0;
    setTimeout(() => {
        gotoStart();
        el.style.opacity = 1;
    }, 400);
      });
    div.appendChild(startGame);
    game.appendChild(div);
}
const wrongAnswer = function(){

    const list = document.getElementById("list");
    var liElements = list.querySelectorAll('li');

    for (var i = 0; i < liElements.length; i++) {
        if(liElements[i].textContent===correctAnswer){
            liElements[i].style.backgroundColor = "green";
        }else{
            liElements[i].style.backgroundColor = "red";
        }
        console.log(liElements[i].textContent);

    }
    setTimeout(function() {
        const el = document.getElementById("game");
        el.style.opacity = 0;
        setTimeout(() => {
            gameOver();
            el.style.opacity = 1;
        }, 400);
    }, 3000);

}
const gameOver = function(){
    game.innerHTML = null;

    const div = document.createElement("div");
    const header = document.createElement("h1");
    const content = document.createTextNode("Game Over!");
    header.appendChild(content);
    div.appendChild(header);
    
    const pointsDiv = document.createElement("h3");
    const pointsText = document.createTextNode("Points: "+ points);
    pointsDiv.appendChild(pointsText);
    div.appendChild(pointsDiv);

    const startGame = document.createElement("div");
    const text = document.createTextNode("Back to Menu");
    startGame.appendChild(text);
    startGame.classList.add("option");
    startGame.addEventListener("click", function() {
    const el = document.getElementById("game");
    el.style.opacity = 0;
    setTimeout(() => {
        gotoStart();
        el.style.opacity = 1;
    }, 400);
      });
    div.appendChild(startGame);
    game.appendChild(div);
}


const loadJson = async function (){
    await fetch('./questions.json')
    .then(response => response.json())
    .then(jsonData => {
        questionsData = jsonData; 
    })
    .catch(error => console.error('Error fetching questions:', error));
}