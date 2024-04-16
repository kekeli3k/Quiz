const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "What is the capital of China?",
    answers: [
      {
        text: "Tokyo",
        correct: false,
      },
      {
        text: "Beijing",
        correct: true,
      },
      {
        text: "Shanghai",
        correct: false,
      },
      {
        text: "Seoul",
        correct: false,
      },
    ],
  },
  {
    question: "Which property is used to change the background color in CSS?",
    answers: [
      {
        text: "background-color",
        correct: true,
      },
      {
        text: "background",
        correct: false,
      },
      {
        text: "color",
        correct: false,
      },
      {
        text: "bgColor",
        correct: false,
      },
    ],
  },
  {
    question: "What does HTML stand for?",
    answers: [
      {
        text: "Hightext Machine Language",
        correct: false,
      },
      {
        text: "Hypertext Machine Language",
        correct: false,
      },
      {
        text: "Hightext Mark Language",
        correct: false,
      },
      {
        text: "Hypertext Markup Language",
        correct: true,
      },
    ],
  },
  {
    question: "What does URL stand for?",
    answers: [
      {
        text: "Uniform Rapid Location",
        correct: false,
      },
      {
        text: "Uniform Resource Locator",
        correct: true,
      },
      {
        text: "Uniform Rapid Link",
        correct: false,
      },
      {
        text: "Universal Rapid Line",
        correct: false,
      },
    ],
  },
  {
    question: "What does USB stand for?",
    answers: [
      {
        text: "Uniform Serial Board",
        correct: false,
      },
      {
        text: "Unit Serial Bench",
        correct: false,
      },
      {
        text: "Universal Serial Bus",
        correct: true,
      },
      {
        text: "Universal Seeding Board",
        correct: false,
      },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}
