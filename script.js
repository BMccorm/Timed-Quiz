// DOM Elements
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreMarker = document.getElementById("scoreMarker");
const questionMarker = document.getElementById("questionMarker");
const timer = document.getElementById("timer");
const startQuiz = document.getElementById("startQuiz");

let currentQuestion = {};
// "false" "prevents the user from being allowed to answer before everything is loaded and ready
let acceptiongAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

window.onload = function () {
  document.querySelector("#loseTime").onclick = stopwatch.loseTime;

  document.querySelector("#stop").onclick = stopwatch.stop;
  document.querySelector("#reset").onclick = stopwatch.reset;

  document.querySelector("#start").onclick = stopwatch.start;
};

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

//prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Our stopwatch object
var stopwatch = {
  time: 30,

  reset: function () {
    stopwatch.time = 60;

    // DONE: Change the "display" div to "00:00."
    document.querySelector("#timer").innerHTML = "00:03";
  },

  start: function () {
    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
    }
  },
  stop: function () {
    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  },
  loseTime: function () {
    stopwatch.time -= 10;
    if (stopwatch.time <= 0) {
      localStorage.setItem("mostRecentScore", score);
      return window.location.assign("/scores.HTML");
    } else {
      // DONE: increment time by 1, remember we cant use "this" here.

      //console.log("time: "+stopwatch.time)

      // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.
      var converted = stopwatch.timeConverter(stopwatch.time);
      console.log(converted);

      // DONE: Use the variable we just created to show the converted time in the "display" div.
      document.querySelector("#timer").innerHTML = converted;
    }
  },
  count: function () {
    stopwatch.time--;
    if (stopwatch.time <= 0) {
      localStorage.setItem("mostRecentScore", score);
      return window.location.assign("/scores.HTML");
    } else {
      // DONE: increment time by 1, remember we cant use "this" here.
      //console.log("time: "+stopwatch.time)

      // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.
      var converted = stopwatch.timeConverter(stopwatch.time);
      console.log(converted);

      // DONE: Use the variable we just created to show the converted time in the "display" div.
      document.querySelector("#timer").innerHTML = converted;
    }
  },
  timeConverter: function (t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  },
};

// stored questions/answers
let questions = [
  // Q1
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: "<javascript>",
    choice2: "<scripting>",
    choice3: "<js>",
    choice4: "<script>",
    answer: 4,
  },
  // Q2
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script name='xxx.js'>",
    choice2: "<script href='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script img='xxx.js'>",
    answer: 3,
  },
  // Q3
  {
    question: "How can you add a comment in JavaScript?",
    choice1: "//This is a comment",
    choice2: "<!--This is a comment-->",
    choice3: "'This is a comment",
    choice4: "*-This is a comment",
    answer: 1,
  },
  // Q4
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
  //     // Q5
  {
    question: "How does a FOR loop start?",
    choice1: "for (i = 0; i <= 5; i++)",
    choice2: "for (i = 0; i <= 5)",
    choice3: "for i = 1 to 5",
    choice4: "for (i <= 5; i++)",
    answer: 1,
  },
  // Q6
  {
    question: "What is the correct way to write a JavaScript array?",
    choice1: 'var colors = "red", "green", "blue"',
    choice2: 'var colors = ["red", "green", "blue"]',
    choice3: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
    choice4: 'var colors = (1:"red", 2:"green", 3:"blue")',
    answer: 2,
  },
  // Q7
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    choice1: "rnd(7.25)",
    choice2: "Math.rnd(7.25)",
    choice3: "round(7.25)",
    choice4: "Math.round(7.25)",
    answer: 4,
  },
  // Q8
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choice1: "onmouseover",
    choice2: "onmouseclick",
    choice3: "onclick",
    choice4: "onchange",
    answer: 3,
  },
  // Q9
  {
    question: "Which operator is used to assign a value to a variable?",
    choice1: "*",
    choice2: "=",
    choice3: "-",
    choice4: "x",
    answer: 2,
  },
  // Q10
  {
    question: "How do you find the number with the highest value of x and y?",
    choice1: "Math.ceil(x, y)",
    choice2: "ceil(x, y)",
    choice3: "top(x, y)",
    choice4: "Math.max(x, y)",
    answer: 4,
  },
];

const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;

StartGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  //   the ... creates a live copy of our questions so they can be updated without disrupting the code
  getNewQuestion();
};

getNewQuestion = () => {
  //start time
  stopwatch.start();
  // sends user to scores page once the set amount of questions are answered
  if (
    availableQuestions.length === 0 ||
    questionCounter >= MAX_QUESTIONS ||
    stopwatch.time <= 0
  ) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/scores.HTML");
  }

  // creates a random number, attaches it to a question in the array and displays it in the h2
  if (window.location.pathname != "/index.html") {
    questionCounter++;
    questionMarker.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // grabs the choices and gives a reference to each one. It then gets the number from the dataset and gets the appropriate choice out of each question.
    choices.forEach((choice) => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
    });

    // removes the question that was just used so it's not included again.
    availableQuestions.splice(questionIndex, 1);

    //   allows the user to answer the question
    acceptingAnswers = true;
  }
};

// This grabs each choice, adds an event listener "click", turns the event into an argument and gives a data attribute reference to what choice the user clicked

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    //  if not accepting answers (not ready for them), the clicked target is ignored (returned). Accepting answers is set to false to avoid an immediate click during the loading delay. The dataset reference is linked and

    // this assigns a css class for correct and incorrect answers
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply == "correct") {
      incrementScore(CORRECT_BONUS);
    } else {
      //derement the time
      stopwatch.loseTime();
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
    //sets a delay before removing the correct/incorrect class. class the function again
  });
});

incrementScore = (num) => {
  score += num;
  scoreMarker.innerText = score;
};
StartGame();
// the startGame function has to be called to initiate the other functions
