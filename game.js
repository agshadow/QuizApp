const question = document.getElementById("question");
const choices = document.getElementsByClassName("choice-text");
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
let questionsFromAPI = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questionsFromAPI = loadedQuestions.results;
    populateQuestions();
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

populateQuestions = () => {
  //console.log(questionsFromAPI)
  for (let i = 0; i < questionsFromAPI.length; i++) {
    let newQuestion = [];
    newQuestion.question = questionsFromAPI[i].question;
    newQuestion.choice1 = questionsFromAPI[i].correct_answer;
    newQuestion.answer = 1;
    for (let j = 0; j < questionsFromAPI[i].incorrect_answers.length; j++) {
      newQuestion["choice" + (j + 2)] =
        questionsFromAPI[i].incorrect_answers[j];
    }

    //randomize the answers
    // count total answers
    let totalAnswers = 0;
    for (let k = 0; newQuestion["choice" + (k + 1)] != null; k++) {
      totalAnswers++;
      //console.log(`totalAnswers: ${totalAnswers}`);
    }
    // get new answer choice from random number
    let newAnswerNumber = Math.floor(Math.random() * totalAnswers) + 1;
    let newAnswerChoice = "choice" + newAnswerNumber;
    console.log(newAnswerChoice);
    // swap choice1 with newAnswerChoice
    console.log("before");
    console.log(newQuestion);
    console.log( newQuestion["choice1"]);
    console.log( newQuestion[newAnswerChoice]);
    let choiceTemp = newQuestion["choice1"];
    let choiceTemp2 = newQuestion[newAnswerChoice];
    newQuestion["choice1"] = choiceTemp2;
    newQuestion[newAnswerChoice] = choiceTemp;
    newQuestion["answer"] = newAnswerNumber;
    console.log("after");
    console.log(newQuestion);
    

    questions.push(newQuestion);
  }
  //console.log(questions);
};

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // go too end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  console.log(`questions counter : ${questionCounter}`);
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  // update progress bar

  console.log(`percent ${(questionCounter / MAX_QUESTIONS) * 100}`);
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  for (const choice of choices) {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  }

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

for (const choice of choices) {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    console.log(e.target);
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
}

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
