//The game is going to have 5 rounds.

//Each time a player wins. The round ends and new round begins.

//When the rounds count equals 5 the game ends and the player with more rounds won wins the game.

//Each round is going to have the following sequence:

//Get input from 2 players( User / Machine )

//There's 3 inputs allowed "Rock", "Paper", and "Scissors"

//There's 3 possible initial scenarios:

//1. If the user inputs Rock and the Machine inputs Scissors.
//   The user wins and the Machine loses.

//2. If the user inputs Scissors and the Machine inputs Paper.
//   The user wins and the machine loses.

//3. If the user inputs Paper and the Machine inputs Rock.
//   The user wins and the machine loses.

//- If the opposite happens on each scenario. The user loses and the Machine wins.
//- If both players choose the same input return draw

//Note: Implement recursive function with return function(); 
//https://stackoverflow.com/questions/59105774/why-is-javascript-recursive-function-returning-undefined-even-when-i-am-return

const btns = document.querySelectorAll("button");

btns.forEach((btn) => btn.addEventListener("click", playGame));

function playGame() {
    let playerScore = 0;
    let machineScore = 0;
    let drawsPerRound = 0;

    console.log(this);

    // for (i = 0; i < 5; i++) {  --- Temporarly disable 5 turns logic
    roundResult = playRound.call
        (this, getPlayerChoice.call(this), getMachineChoice());
        
        alert(roundResult);

        if( roundResult.includes("won") ) {
            playerScore = ++playerScore;

            alert(`Your Score: ${playerScore}/5\n`+ 
            `Rival Score: ${machineScore}/5\n`+ 
            `Draws: ${drawsPerRound}`);

        } else if( roundResult.includes("lost") ) {
            machineScore = ++machineScore;

            alert(`Your Score: ${playerScore}/5\n`+
            `Rival Score: ${machineScore}/5\n`+
            `Draws: ${drawsPerRound}`);

        } else {
            // --i; -- Temporary disable 5 turns logic
            drawsPerRound = ++drawsPerRound;

            alert(`Your Score: ${playerScore}/5\n`+
            `Rival Score: ${machineScore}/5\n`+
            `Draws: ${drawsPerRound}`); 
        }

    // } -- Temporary disable 5 turns logic

    if (playerScore > machineScore) {
        alert("You've won the match!");
    } else {
        alert("You've lost the match!");
    }
}

function playRound(playerSelection, machineSelection) {

    if(playerSelection === "rock" && machineSelection === "scissors") {
        return "Your rock has flawlessly crushed your opponent's scissors. You've won!";
    } else if(playerSelection === "scissors" && machineSelection === "rock") {
        return "Your scissors have dwindled to the solid power of the rock. You've lost.";
    } else if(playerSelection === "rock" && machineSelection === "rock") {
        return "Draw";
    } else if(playerSelection === "scissors" && machineSelection === "paper") {
        return "Your scissors have cut his paper with ease and style. You've won!";
    } else if(playerSelection === "paper" && machineSelection === "scissors") {
        return "Your paper has been sliced in half by his scissors. You've lost.";
    } else if(playerSelection === "scissors" && machineSelection === "scissors") {
        return "Draw";
    } else if(playerSelection === "paper" && machineSelection === "rock") {
        return "Your paper has fully covered his rock rendering it moveless. You've won!";
    } else if(playerSelection === "rock" && machineSelection === "paper") {
        return "Your rock has been blindfolded by your opponent's paper. You've lost.";
    } else if(playerSelection === "paper" && machineSelection === "paper") {
        return "Draw";
    }
}

function getPlayerChoice(selection) {
    selection = this.dataset.select;

    if (selection === "rock" || selection === "paper" || selection === "scissors") {
    return selection;
    } else {
    alert("You have to choose Rock, Paper or Scissors. Try again!");
    return getPlayerChoice();
    }
}

function getMachineChoice(randomNumber) {
    randomNumber = Math.floor(Math.random() *90) + 1;

    if(randomNumber <= 30) {
    return "rock";
    } else if(randomNumber <= 60) {
    return "paper";
    } else {
    return "scissors";
    }
}

