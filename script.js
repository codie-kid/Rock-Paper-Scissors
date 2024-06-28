const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const resultMessage_p = document.getElementById('result-message');
const rock_div = document.getElementById('rock');
const paper_div = document.getElementById('paper');
const scissors_div = document.getElementById('scissors');
const rulesButton = document.getElementById('rules-button');
const rulesModal = document.getElementById('rules-modal');
const closeButton = document.getElementsByClassName('close-button')[0];

let userScore = localStorage.getItem('userScore') ? parseInt(localStorage.getItem('userScore')) : 0;
let computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;

updateScores();

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomChoice = Math.floor(Math.random() * 3);
    return choices[randomChoice];
}

function win(userChoice, computerChoice) {
    userScore++;
    localStorage.setItem('userScore', userScore);
    updateScores();
    resultMessage_p.innerHTML = `You chose ${userChoice}. Computer chose ${computerChoice}. You win! 🎉`;
    document.getElementById(userChoice).classList.add('celebration');
    setTimeout(() => document.getElementById(userChoice).classList.remove('celebration'), 500);
}

function lose(userChoice, computerChoice) {
    computerScore++;
    localStorage.setItem('computerScore', computerScore);
    updateScores();
    resultMessage_p.innerHTML = `You chose ${userChoice}. Computer chose ${computerChoice}. You lose. 😞`;
}

function draw(userChoice, computerChoice) {
    resultMessage_p.innerHTML = `You both chose ${userChoice}. It's a tie.`;
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            win(userChoice, computerChoice);
            break;
        case 'rockpaper':
        case 'paperscissors':
        case 'scissorsrock':
            lose(userChoice, computerChoice);
            break;
        default:
            draw(userChoice, computerChoice);
            break;
    }
}

function updateScores() {
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
}

rock_div.addEventListener('click', () => game('rock'));
paper_div.addEventListener('click', () => game('paper'));
scissors_div.addEventListener('click', () => game('scissors'));

rulesButton.onclick = function() {
    rulesModal.style.display = 'block';
}

closeButton.onclick = function() {
    rulesModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == rulesModal) {
        rulesModal.style.display = 'none';
    }
}