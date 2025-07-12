let enterBtn = document.querySelector(".enter");
let questions = document.querySelector(".question");
let form = document.querySelector("#quiz-form");


let allQuestions = [
  {
    question: "What is 2 + 2?",
    options: ["2", "4", "6", "8"],
    correct: "4"
  },
  {
    question: "What is 5 x 3?",
    options: ["8", "15", "10", "20"],
    correct: "15"
  }
];

let currentQuestion = 0;

function showQuestion(index) {
  // Clear previous options
  form.innerHTML = "";

  // Set the new question text
  questions.innerText = allQuestions[index].question;

  // Create and insert options
  allQuestions[index].options.forEach((optionText, i) => {
    const label = document.createElement("label");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz"; 
    radio.value = optionText;
    radio.classList.add("option-radio");
    radio.id = `option${i}`;

    label.setAttribute("for", `option${i}`);
    label.innerText = optionText;

    label.prepend(radio);
    const br = document.createElement("br");

    // Append to form
    form.appendChild(label);
    form.appendChild(br);
  });
}

// ✅ Show the first question initially
showQuestion(currentQuestion);

// ✅ Handle submit and check answer
enterBtn.addEventListener("click", () => {
  const radios = document.getElementsByClassName("option-radio");
  let userChoice = "";

  // Check which radio is selected
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      userChoice = radios[i].value;
      break;
    }
  }

  // If user selected something
  if (userChoice) {
    const correctAnswer = allQuestions[currentQuestion].correct;

    if (userChoice === correctAnswer) {
      console.log("✅ Correct!");
      document.body.style.backgroundColor = "green";
    } else {
      console.log("❌ Wrong!");
      document.body.style.backgroundColor = "red";
    }

    // Move to next question
    currentQuestion++;

    setTimeout(() => {
      // Reset background
      document.body.style.backgroundColor = "";

      // Show next question or end
      if (currentQuestion < allQuestions.length) {
        showQuestion(currentQuestion);
      } 
      else {
        questions.innerText = "🎉 Quiz Complete!";
        form.innerHTML = "";
        enterBtn.disabled = true;
      }
    }, 1000); // 1-second feedback delay
  } else {
    alert("Please select an answer.");
  }
});
