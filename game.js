const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "რატომ მოაქვთ მრგვალი პიცა ოთკუთხედი ყუთით??",
    choice1: "<ოთხკუთხედს მრგვალ ყუთში ვერ ჩადებენ და იმიტომ>",
    choice2: "<არ ვიცი არც მე>",
    choice3: "<იდეალური არაფერია >",
    choice4: "<რაებს ბოდიალობ?>",
    answer: 1
  },
  {
    question:
      "წყალში ტირილი შესაძლებელია ?",
    choice1: "<არა>",
    choice2: "<ვიზინის დახმარებით'>",
    choice3: "<მხოლოდ სპეციალური ჩაფხუტის მეშვეობით'>",
    choice4: "<თავი დამანებე , ჩემი გაჭირვება მეყოფა>",
    answer: 3
  },
  {
    question: " რატომ ამბობენ (ბავშვივით მეძინაო ) ??  როცა ბავშვი ყოველ 3 საათში იღვიძებს ხოლმე :დ",
    choice1: "იმიტომ, რომ ყოველ სამ საათში ეღვიძებოდათ.;",
    choice2: "იმიტომ რომ ბავშვს ძილის დროს არაფერი ადარდებს და ტკბილად ძინავს;",
    choice3: "ბავშვების უმეტესობამ ღრმა ძილი იციან",
    choice4: "ძილი არ მიხსენო საერთოდ;",
    answer: 1
  }
  {question:
    "ვის ეხურა 2023 წელს ყველაზე დიდი ქუდი ?",
  choice1: "<ადამ სენდლერს>",
  choice2: "<Marshmello'>",
  choice3: "<ვისაც ყველაზე დიდი თავი ჰქონდა >",
  choice4: "<ჩიტოვიჩს>",
  answer: 3}
];

//CONSTANTS
const INCORRECT_TAX = 10;
const MAX_QUESTIONS = 3;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  score = 100;
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
    score--;
    scoreText.innerText = score;

    if (score === 0) {
      localStorage.setItem("mostRecentScore", score);

      //go to the end page
      return window.location.assign("../../assets/html/end.html");
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Penalty for wrong choice
decrementScore = num => {
  score -= num;
  scoreText.innerText = score;
};


startGame();
