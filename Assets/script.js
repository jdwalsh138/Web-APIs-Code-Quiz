const home = document.getElementsByClassName("home");
const overview = document.getElementsByClassName("overview");
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCountEl = document.getElementById("question-count");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("start-quiz");
const scoresBtn = document.getElementById("show-scores");
const scoreTitle = document.getElementById("score-title");
const questionTitle = document.getElementById("question-title");
const intro = document.getElementById("intro");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

startBtn.addEventListener("click", e =>{
    startGame();
})

scoresBtn.addEventListener("click", e =>{
    showHighscores();
})

const questions = [
    {
        q: 'Inside which HTML element do we put the JavaScript?',
            c1: '<js>',
            c2: '<script>',
            c3: '<scripting>',
            c4: '<javascript>',
            a: 2
    },
    {
        q: 'What is the correct JavaScript syntax to change the content of the HTML element below?',
            c1: 'document.getElementById("demo").innerHTML = "Hello World!";',
            c2: '#demo.innerHTML = "Hello World!";',
            c3: 'document.getElementByName("p").innerHTML = "Hello World!";',
            c4: 'document.getElement("p").innerHTML = "Hello World!";',
            a: 1
    },
    {
        q: 'What is the correct syntax for referring to an external script called "xxx.js"?',
            c1: 'The <head> section',
            c2: 'The <body> section',
            c3: 'Both the <head> section and the <body> section are correct',
            c4: 'None are correct',
            a: 3
    },
    {
        q: 'What is the correct syntax for referring to an external script called "xxx.js"?',
            c1: '<script name="xxx.js">',
            c2: '<script src="xxx.js">',
            c3: '<script href="xxx.js">',
            c4: '<script title="xxx.js">',
            a: 2
    },
    {
        q: 'The external Javascript file must contain the <script> tag.',
            c1: 'True',
            c2: 'False',
            a: 2
    },

];

const correctBonus = 20;
const maxQuestions = 5;



startGame = () => {
  questionCounter = 0;
  score = 0;
  scoreEl.innerText = score
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (
    availableQuestions.length === 0 ||
    questionCounter >= maxQuestions.length
  ) {
    showHighscores();
  }
  questionCounter++;
  questionCountEl.innerText = `${questionCounter}/${maxQuestions}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.q;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["c" + number];
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    console.log(e.target);
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const answerStatus =
      selectedAnswer == currentQuestion.a ? "correct" : "incorrect";
    selectedChoice.parentElement.classList.add(answerStatus);

    if (answerStatus === "correct") {
      updateScore(correctBonus);
    }

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(answerStatus);
      getNewQuestion();
    }, 1000);
  });
});

startGame();

updateScore = num => {
  score += num;
  scoreEl.innerText = score;
};


showHighscores = ()=>{

}
