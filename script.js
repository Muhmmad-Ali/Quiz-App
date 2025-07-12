let enterBtn = document.querySelector(".enter");
let questions = document.querySelector(".question");
let form = document.querySelector("#quiz-form");
let resetBtn = document.querySelector(".reset");


async function fetchAndFormat() {
    const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    const data = await response.json();
    const allQuestions = data.results.map(item => {
        return {
        question: item.question,
        options: [item.correct_answer, ...item.incorrect_answers].sort(() => Math.random() - 0.5),
        correct: item.correct_answer
        };
    });

    let currentQuestion = 0;
    let currScore = 0;

    function showQuestion(index) {
        form.innerHTML = ""; // Clear old options
        questions.innerHTML = allQuestions[index].question; // Handle encoding

        allQuestions[index].options.forEach((optionText, i) => {
            const label = document.createElement("label");

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz";
            radio.value = optionText;
            radio.classList.add("option-radio");
            radio.id = `option${i}`;

            label.setAttribute("for", `option${i}`);
            label.innerHTML = optionText;
            label.prepend(radio);

            form.appendChild(label);
            form.appendChild(document.createElement("br"));
        });
    }
    // Show first question
    showQuestion(currentQuestion);

    //Enter Button
    enterBtn.addEventListener("click", () => {
        const radios = document.getElementsByClassName("option-radio");
        let userChoice = "";
        let selectedRadio = null;

        // Get selected value
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                userChoice = radios[i].value;
                selectedRadio = radios[i];
                break;
            }
        }

        if(userChoice) {
            const correctAnswer = allQuestions[currentQuestion].correct;
            let correctRadio = null;
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].value === correctAnswer) {
                    correctRadio = radios[i];
                }
                // Disable all radios
                radios[i].disabled = true;
            }

            // ✅ Show correct in green
            correctRadio.parentElement.style.backgroundColor = "#4CAF50";

            if (selectedRadio === correctRadio) {
                currScore++; // ✅ Increase score if answer is correct
            } 
            else {
                    selectedRadio.parentElement.style.backgroundColor = "#F44336"; // ❌ Wrong answer
            }

        // Go to next question after 1s
            currentQuestion++;
            setTimeout(() => {
                document.body.style.backgroundColor = "";
                if (currentQuestion < allQuestions.length) {
                    showQuestion(currentQuestion);
                } 
                else {
                    const finalScore = currScore;
                    console.log(finalScore);
                    questions.innerHTML = `🎉 Quiz Complete!<br><br>Your Score: <strong>${finalScore} / ${allQuestions.length}</strong>`;
                    form.innerHTML = "";
                    enterBtn.disabled = true;
                    resetBtn.style.display = "inline-block";
                }}, 1000);
        } 
        else {    
            alert("Please Choose Option")
        }
    });
        resetBtn.addEventListener("click", () => {
        // Reset values
            currentQuestion = 0;
            score = 0;
            enterBtn.disabled = false;
            resetBtn.style.display = "none";

            // Fetch new questions and restart quiz
            fetchAndFormat();
        });
}

fetchAndFormat();
