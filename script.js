const questions = [
    {
        question: "Firewall in computer is used for",
        answers:[
            {text: "Data Transmission", correct: false},
            {text: "Security", correct: true},
            {text: "Authentication", correct: false},
            {text: "Monitoring", correct: false},
        ]
    }, 
    {
        question: "Which among the following is not an operating system",
        answers:[
            {text: "C", correct: true},
            {text: "DOS", correct: false},
            {text: "Mac", correct: false},
            {text: "Linux", correct: false},
        ]
    },
    {
        question: "Which of the following is not a database management software",
        answers:[
            {text: "MySQL", correct: false},
            {text: "Oracle", correct: false},
            {text: "Sybase", correct: false},
            {text: "COBOL", correct: true},
        ]
    },
    {
        question: "Number of layers in the OSI Model",
        answers:[
            {text: "9", correct: false},
            {text: "7", correct: true},
            {text: "8", correct: false},
            {text: "11", correct: false},
        ]
    },

]


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    // to restrict click only once
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    }else{
        showScore();
    }

}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

