const startButton = document.getElementById("startBtn");
const rock = document.getElementById("rockImg");
const paper = document.getElementById("paperImg");
const scissors = document.getElementById("scissorsImg");
const gameWindow = document.getElementById("gameWindow");
const selection = document.createElement("h4");
const continueBtn = document.createElement("button");
const playerScoreTd = document.getElementById('playerScore');
const computerScoreTd = document.getElementById('computerScore');
const roundTd = document.getElementById('round');

startButton.addEventListener("click", startGame);
continueBtn.textContent = "Continue";
let userChoice;
let playerScore = 0, computerScore =0, roundNumber = 0;

function startGame() {
    if(gameWindow.style.visibility === 'hidden'){
        gameWindow.style.visibility = 'visible';
        startButton.style.display = 'none';
    }
    let results;

    rock.addEventListener("click", clicked);
    paper.addEventListener("click", clicked);
    scissors.addEventListener("click", clicked);

    continueBtn.addEventListener('click', function () {
        results = playRound(userChoice, computerPlay());
        processResults(results);
    })
}

function processResults(results) {
    switch (results) {
        case 0:
            roundTd.textContent = (++roundNumber).toString();
            playerScoreTd.textContent = (++playerScore).toString();
            break;
        case 1:
            roundTd.textContent = (++roundNumber).toString();
            computerScoreTd.textContent = (++computerScore).toString();
            break;
    }

    rock.classList.remove('clicked');
    paper.classList.remove('clicked');
    scissors.classList.remove('clicked');
    gameWindow.removeChild(selection);
    gameWindow.removeChild(continueBtn);

    if(roundNumber >= 3) {
        if(playerScore > computerScore){
            alert("You Won!");
        }else if(playerScore < computerScore){
            alert("You Lost! HAHA!");
        }else{
            alert("Its a tie... how could this happen?");
        }
        roundTd.textContent = "0";
        playerScoreTd.textContent = "0";
        computerScoreTd.textContent = "0";
        roundNumber = 0;
        playerScore = 0;
        computerScore = 0;
    }
}

function clicked(){
    if(!this.classList.contains('clicked')){
        this.classList.add('clicked');

        if(this !== rock && rock.classList.contains('clicked')) {
            rock.classList.remove('clicked');
        }else if(this !== paper && paper.classList.contains('clicked')){
            paper.classList.remove('clicked');
        }else if(this !== scissors && scissors.classList.contains('clicked')) {
            scissors.classList.remove('clicked');
        }
        userChoice = this.id;
        selection.textContent = "You have selected " + this.alt;
        gameWindow.appendChild(selection);
        gameWindow.appendChild(continueBtn);
    }else {
        this.classList.remove('clicked');
        gameWindow.removeChild(selection);
        gameWindow.removeChild(continueBtn);
    }
}


function playRound(playerSelection, computerSelection) {
    console.log(playerSelection);
    if (playerSelection === "rockImg" && computerSelection === "Scissors") {
        alert("You win! Rock Beats Scissors");
        return 0;
    }
    if (playerSelection === "rockImg" && computerSelection === "Paper") {
        alert("You loose! Paper Beats Scissors");
        return 1;
    }
    if (playerSelection === "rockImg" && computerSelection === "Rock") {
        alert("Tie, Rock vs Rock");
        return 2;
    }
    if (playerSelection === "scissorsImg" && computerSelection === "Scissors") {
        alert("Tie Scissors vs Scissors");
        return 2;
    }
    if (playerSelection === "scissorsImg" && computerSelection === "Paper") {
        alert("You Win! Scissors Beats Paper");
        return 0;
    }
    if (playerSelection === "scissorsImg" && computerSelection === "Rock") {
        alert("You loose, Rock beats Scissors");
        return 1;
    }
    if (playerSelection === "paperImg" && computerSelection === "Scissors") {
        alert("You loose! Scissors Beats Paper");
        return 1;
    }
    if (playerSelection === "paperImg" && computerSelection === "Paper") {
        alert("Tie, Paper vs Paper");
        return 2;
    }
    if (playerSelection === "paperImg" && computerSelection === "Rock") {
        alert("You win! Paper beats Rock");
        return 0;
    }
    return "error";
}

function computerPlay(){
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    switch(randomNumber) {
        case 1:
            return "Rock";
        case 2:
            return "Paper";
        case 3:
            return "Scissors";
        default:
            return "Machine Gun"; //this should never happen :)
    }
}


