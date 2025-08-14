const quizzes = {
  countries: [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Lyon", "Nice", "Marseille"],
      answer: [0]
    },
    {
      question: "Which is the most populous country?",
      options: ["USA", "India", "China", "Brazil"],
      answer: [1]
    }
  ],
  sports: [
    {
      question: "Which IPL teams got banned in 2016-17?",
      options: ["CSK", "RR", "MI", "RR"],
      answer: [0, 1]
    },
    {
      question: "Which sport uses a racket?",
      options: ["Football", "Tennis", "Cricket", "Boxing"],
      answer: [1]
    },
    {
      question: "How many players are in a soccer team?",
      options: ["9", "10", "11", "12"],
      answer: [2]
    }
  ],
  movies: [
    {
      question: "Who directed 'Inception'?",
      options: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Quentin Tarantino"],
      answer: [2]
    },
    {
      question: "Which movie features 'Wakanda'?",
      options: ["Iron Man", "Thor", "Black Panther", "Doctor Strange"],
      answer: [2]
    }
  ],
  general: [
    {
      question: "Which are known as terrestrial planets?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: [0, 1, 3]
    },
    {
      question: "What planet is known as the blue Planet?",
      options: ["Earth", "Venus", "Mars", "Jupiter"],
      answer: [0]
    },
    {
      question: "What is the boiling point of water?",
      options: ["90°C", "100°C", "110°C", "120°C"],
      answer: [1]
    }
  ]
};

let currentQuiz = [];
let currentQuestion = 0;
let score = 0;
let answered = false;

function startQuiz(category) {
  currentQuiz = quizzes[category];
  currentQuestion = 0;
  score = 0;
  document.getElementById("category-selector").classList.add("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  document.querySelector("button[onclick='nextQuestion()']").textContent = "Submit";
  loadQuestion();
}

function loadQuestion() {
  const q = currentQuiz[currentQuestion];
  document.getElementById("question").textContent = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  answered = false;

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option-btn");
    btn.setAttribute("data-index", index);
    btn.onclick = () => {
      if (answered) return;
      btn.classList.toggle("selected");
    };
    optionsDiv.appendChild(btn);
  });
}

function nextQuestion() {
  const nextBtn = document.querySelector("button[onclick='nextQuestion()']");

  if (!answered) {
    const selectedBtns = document.querySelectorAll(".option-btn.selected");
    if (selectedBtns.length === 0) {
      alert("Please select at least one answer.");
      return;
    }

    const correctAnswers = currentQuiz[currentQuestion].answer.sort();
    const selectedIndices = Array.from(selectedBtns).map(btn =>
      parseInt(btn.getAttribute("data-index"))
    ).sort();

    // Compare arrays
    const isCorrect = selectedIndices.length === correctAnswers.length &&
      selectedIndices.every((val, idx) => val === correctAnswers[idx]);

    const allButtons = document.querySelectorAll(".option-btn");

    allButtons.forEach(btn => {
      const index = parseInt(btn.getAttribute("data-index"));
      if (correctAnswers.includes(index)) {
        btn.classList.add("correct");
        btn.innerHTML += " ✅";
      } else if (btn.classList.contains("selected")) {
        btn.classList.add("wrong");
        btn.innerHTML += " ❌";
      }
      btn.disabled = true;
    });

    if (isCorrect) score++;
    answered = true;
    nextBtn.textContent = currentQuestion < currentQuiz.length - 1 ? "Continue" : "See Result";

  } else {
    currentQuestion++;
    if (currentQuestion < currentQuiz.length) {
      nextBtn.textContent = "Submit";
      loadQuestion();
    } else {
      document.getElementById("quiz-container").classList.add("hidden");
      document.getElementById("result").classList.remove("hidden");
      document.getElementById("score").textContent = `${score} / ${currentQuiz.length}`;
    }
  }
}

function restart() {
  document.getElementById("category-selector").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");
}
