var timerEl = document.querySelector("#timer")
var buttonEl = document.querySelector("#startButton")
var startEl = document.querySelector("#start")
var quizEl = document.querySelector("#quiz")
var questionEl = document.querySelector("#question")
var answerEl = document.querySelector("#answers")
var doneEl = document.querySelector('#done')
var submitButton = document.querySelector("#submit")
var scoreEl = document.querySelector("#score")
var backButton  = document.querySelector("#back")
var wrongEl = document.querySelector("#wrong")
var correctEl = document.querySelector("#correct")
var userScoreEl = document.querySelector("#userScore")
var nameInput=document.querySelector("#name")
var userScores = document.querySelector("#userScores")
var clearButton = document.querySelector("#clear")
var highScoresWl = document.querySelector("#highScores")

var questionNumber = 0

var timer = 75
var finalScore = 0

var questions = [{
    question: "Commonly used data types DO NOT include:",
    answer: ["Strings","booleans", "alerts", "numbers" ],
    correct:2,
},
{
    question: "The condition in an if/else statement is enclose within ____.",
    answer: ["quotes","curly brackets", "parentheses", "square brackets" ],
    correct:2,
}
,
{
    question: "Arrays in JavaScript can be used to store _____.",
    answer: ["numbers and strings","other arrays", "booleans", "all of the above" ],
    correct:4,
},
{
    question: "String values must be enclosed within _______ when being assigned to variables.",
    answer: ["commas","curly brackets", "parentheses", "square brackets" ],
    correct:3,
}
]

function toggleDone() {
    if(doneEl.style.display == "none"){
        doneEl.style.display = "block"
        userScoreEl.textContent = "Your final score " + finalScore
    }
    else{
        doneEl.style.display = "none"
    }
}

function toggleScore() {
    while (userScores.lastElementChild) {
        userScores.removeChild(userScores.lastElementChild);
      }
    if(scoreEl.style.display == "none"){
        scoreEl.style.display = "block"

        Object.keys(localStorage).forEach(element => {
            var user = document.createElement("li")
            user.textContent = element + " - " +localStorage.getItem(element)
            user.setAttribute('class', "bg-secondary text-white p-1 mb-2")
            userScores.appendChild(user)
        });

    }
    else{
        scoreEl.style.display = "none"
    }
}

function toggleStart() {
    if(startEl.style.display == "none"){
        startEl.style.display = "block"
    }
    else{
        startEl.style.display = "none"
    }
}

function toggleQuiz() {
    if(quizEl.style.display == "none"){
        quizEl.style.display = "block"
    }
    else{
        quizEl.style.display = "none"
    }
}

function toggleWrong() {
    if(wrongEl.style.display == "none"){
        wrongEl.style.display = "block"
        var correctTime = 1
        var timerInterval = setInterval(function() {
            correctTime--
            if(correctTime == 0){
                clearInterval(timerInterval)
                toggleWrong()
            }
        }, 1000)
    }
    else{
        wrongEl.style.display = "none"
    }
}

function toggleCorrect() {
    if(correctEl.style.display == "none"){
        correctEl.style.display = "block"
        var correctTime = 1
        var timerInterval = setInterval(function() {
            correctTime--
            if(correctTime == 0){
                clearInterval(timerInterval)
                toggleCorrect()
            }
        
        }, 1000)
    }
    else{
        correctEl.style.display = "none"
    }
}

function loadQuestion() {
    while (answerEl.lastElementChild) {
        answerEl.removeChild(answerEl.lastElementChild);
      }
    if(questions[questionNumber]){
        questionEl.textContent = questions[questionNumber].question
        questions[questionNumber].answer.forEach(function(element, i) {
            var answers = document.createElement("button")
            answers.textContent =element
            console.log(i)
            answers.setAttribute("class","btn btn-primary  p-3 m-2 ")
            answers.setAttribute("data-index", i)
            answerEl.appendChild(answers)
        });
    }
    else{
        finalScore = timer
        timer = 1
    }

}

submitButton.addEventListener("click", function () {
    toggleDone()
    var name = nameInput.value.trim()
    localStorage.setItem(name, timer)
    toggleScore()
})

backButton.addEventListener("click", function(){
    toggleScore()
    toggleStart()
    timerEl.textContent = "Time: 75"
})

function time(){
    console.log(timer)
    var timerInterval = setInterval(function() {
        timer--
        timerEl.textContent = "Time: " + timer
        if(timer == 0){
            clearInterval(timerInterval)
            toggleQuiz()
            toggleDone()
        }
    }, 1000)
}

buttonEl.addEventListener("click", function(){
    timer = 75
    questionNumber = 0
    console.log(timer, questionNumber)
    time()
    toggleStart() 
    toggleQuiz()
    loadQuestion()
    
  answerEl.addEventListener("click", function (event) {
        var element = event.target
        if(element.matches("button")){
            var index = element.getAttribute("data-index")
            console.log(index, questions[questionNumber].correct)
            if(index == questions[questionNumber].correct){
                questionNumber++
                toggleCorrect()
                loadQuestion()
            }
            else{
                questionNumber++
                timer -= 15
                loadQuestion()
                toggleWrong()
            }
        }
    })
})

clearButton.addEventListener("click", function(){
    localStorage.clear()
    while(userScores.lastElementChild){
        userScores.removeChild(userScores.lastElementChild)
    }
    toggleScore()
    toggleScore()
})

highScoresWl.addEventListener("click", function(){
    toggleStart()
    toggleScore()

})
