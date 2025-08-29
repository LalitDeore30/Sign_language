// Array of sign language images and corresponding answers
const questions = [
    { src: 'images/a.png', answer: 'A' },
    { src: 'images/b.png', answer: 'B' },
    { src: 'images/c.png', answer: 'C' },
    { src: 'images/d.png', answer: 'D' },
    { src: 'images/e.png', answer: 'E' },
    { src: 'images/f.png', answer: 'F' },
    { src: 'images/g.png', answer: 'G' },
    { src: 'images/h.png', answer: 'H' },
    { src: 'images/i.png', answer: 'I' },
    { src: 'images/j.png', answer: 'J' },
    { src: 'images/k.png', answer: 'K' },
    { src: 'images/l.png', answer: 'L' },
    { src: 'images/m.png', answer: 'M' },
    { src: 'images/n.png', answer: 'N' },
    { src: 'images/o.png', answer: 'O' },
    { src: 'images/p.png', answer: 'P' },
    { src: 'images/q.png', answer: 'Q' },
    { src: 'images/r.png', answer: 'R' },
    { src: 'images/s.png', answer: 'S' },
    { src: 'images/t.png', answer: 'T' },
    { src: 'images/u.png', answer: 'U' },
    { src: 'images/v.png', answer: 'V' },
    { src: 'images/w.png', answer: 'W' },
    { src: 'images/x.png', answer: 'X' },
    { src: 'images/y.png', answer: 'Y' },
    { src: 'images/z.png', answer: 'Z' },
    //words sentence
    { src: 'images/hello.png', answer: 'HELLO' },
    { src: 'images/thank_you.png', answer: 'THANK YOU' },
    { src: 'images/i_love_you.png', answer: 'I LOVE YOU' },
    { src: 'images/sorry.png', answer: 'SORRY' },
    { src: 'images/y_r_w.png', answer: 'YOU ARE WELCOME' },
    { src: 'images/yes.png', answer: 'YES' },
    { src: 'images/no.png', answer: 'NO' },
    { src: 'images/house.png', answer: 'HOUSE' },
    { src: 'images/good_bye.png', answer: 'GOOD BYE' },
    { src: 'images/family.png', answer: 'FAMILY' },
];

let score = 0;
let currentQuestionIndex = 0;
let shuffledQuestions = [];

// Shuffle the questions to create a random order
function shuffleQuestions() {
    shuffledQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
}

// Display the current question
function displayQuestion() {
    const signImage = document.getElementById('signImage');
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    signImage.src = currentQuestion.src;
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('userInput').value = '';
}

// Check if the user's answer is correct and update score
function submitAnswer() {
    let userAnswer = document.getElementById('userInput').value.trim().toUpperCase();
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    // Remove spaces from both the user input and the correct answer to ignore spaces
    userAnswer = userAnswer.replace(/\s+/g, '');
    const correctAnswer = currentQuestion.answer.replace(/\s+/g, '');

    if (userAnswer === correctAnswer) {
        document.getElementById('message').textContent = 'Correct! 🎉';
        score++;
        speakText('Correct! Great job!');
    } else {
        const message = `Wrong! The correct answer was ${currentQuestion.answer}`;
        document.getElementById('message').textContent = message;
        speakText(message);
    }

    document.getElementById('score').textContent = score;
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

// End quiz and display final score
function endQuiz() {
    document.querySelector('.quiz-box').style.display = 'none';
    document.querySelector('.keypad').style.display = 'none';
    const finalMessage = `Your final score is ${score}/10!`;
    document.getElementById('end-message').textContent = finalMessage;
    speakText(finalMessage);
}

// Add letter to input field when clicked on the virtual keypad
function enterLetter(letter) {
    document.getElementById('userInput').value += letter;
}

function deleteLetter() {
    const userInput = document.getElementById('userInput');
    userInput.value = userInput.value.slice(0, -1); // Remove the last character
}

// Function to speak a text
function speakText(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; // You can adjust the rate of speech
    synth.speak(utterance);
}

// Start the game
shuffleQuestions();
displayQuestion();
