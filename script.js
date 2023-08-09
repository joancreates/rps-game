//The game is going to have 5 rounds.

//Each time a player wins. The round ends and new round begins.

//When the rounds count equals 5 the game ends and the player with more rounds won wins the game.

//Each round is going to have the following sequence:

//Get input from 2 players( User/Machine )

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


game();

function game(roundResult) {

    const btns = document.querySelectorAll("button[data-select]");
    btns.forEach((btn) => {btn.addEventListener("click", playGame)});

    let playerScore = 0;
    let machineScore = 0;
    let drawsPerRound = 0;
    let totalScore = 0;
    let totalWins = 0;
    let totalGames = 0;

    const roundMsg = document.querySelector("#match-result"); 
    const yourScore = document.querySelector("#your-score");
    const rivalScore = document.querySelector("#rival-score");
    const draws = document.querySelector("#draws");
    const roundsTracker = document.querySelectorAll("span[data-rounds='tracker'");
    const buttons = document.querySelector("#buttons");
    const gamesWon = document.querySelector("#games-won");
    const gamesPlayed = document.querySelector("#games-played");

    function disableBtns() {
        btns.forEach((btn) => btn.disabled = true);
    };
    function enableBtns() { 
        btns.forEach((btn) => btn.disabled = false);
    };

    function playGame() {
        roundResult = playRound.call(this, getPlayerChoice.call(this), getMachineChoice());

        function getResultBoard() {
            roundsTracker.textContent = totalScore;
            roundMsg.textContent = roundResult;

            yourScore.textContent = 
            `Your Score: ${playerScore}/${roundsTracker.textContent}`; 
            rivalScore.textContent = 
            `Rival Score: ${machineScore}/${roundsTracker.textContent}`;
            draws.textContent =
            `Draws: ${drawsPerRound}`;
        }

        function getResetBtn() {
            if(totalScore === 1) {
            const resetBtn = document.createElement("button");
            resetBtn.setAttribute("id", "reset-btn")
            resetBtn.textContent = "Reset";
            buttons.appendChild(resetBtn);

            resetBtn.addEventListener("click", resetGame);
            }
        }
        function playAgainBtn() {
            const playAgainBtn = document.createElement("button");
            playAgainBtn.setAttribute("id", "play-again-btn")     
            playAgainBtn.textContent = "Play Again";
            buttons.appendChild(playAgainBtn);

            playAgainBtn.addEventListener("click", playAgain);
        }

        function playAgain() {
            enableBtns();
            btns.disabled = false;    
            roundMsg.textContent = "";
            yourScore.textContent = "";
            rivalScore.textContent = "";
            draws.textContent = "";
            roundsTracker.textContent = "";

            playerScore = 0;
            machineScore = 0;
            drawsPerRound = 0;
            totalScore = 0;

            const resetBtn = document.querySelector("#reset-btn");
            buttons.removeChild(resetBtn);

            const playAgainBtn = document.querySelector("#play-again-btn");
            buttons.removeChild(playAgainBtn);
        }
        function resetGame() {
            enableBtns();
            roundMsg.textContent = "";
            yourScore.textContent = "";
            rivalScore.textContent = "";
            draws.textContent = "";
            roundsTracker.textContent = "";
            gamesWon.textContent = "";
            gamesPlayed.textContent = "";

            playerScore = 0;
            machineScore = 0;
            drawsPerRound = 0;
            totalScore = 0;
            totalWins = 0;
            totalGames = 0;
            
            const resetBtn = document.querySelector("#reset-btn");
            buttons.removeChild(resetBtn);

            const playAgainBtn = document.querySelector("#play-again-btn");
            buttons.removeChild(playAgainBtn);
        }

        function finishRoundWin() {
            ++totalWins;
            ++totalGames;
            roundMsg.textContent = "You've won the match!";
            gamesWon.textContent = `Games won: ${totalWins}`;
            gamesPlayed.textContent = `Games played: ${totalGames}`;

            disableBtns();
            playAgainBtn();
        }

        function finishRoundLose() {
            ++totalGames;
            roundMsg.textContent = "You've lost the match!";
            gamesWon.textContent = `Games won: ${totalWins}`;
            gamesPlayed.textContent = `Games played: ${totalGames}`;

            disableBtns();
            playAgainBtn();
        }

        if(roundResult.includes("won")) {
            playerScore = ++playerScore;
            totalScore = ++totalScore;
            getResultBoard();
            getResetBtn();
        } else if(roundResult.includes("lost")) {
            machineScore = ++machineScore;
            totalScore = ++totalScore;
            getResultBoard();
            getResetBtn();
        } else {
            drawsPerRound = ++drawsPerRound;
            totalScore = ++totalScore;
            getResultBoard();
            getResetBtn();
        }

        if(playerScore === 5 || machineScore === 5) {
            if (playerScore > machineScore) {
            finishRoundWin();
            } else {
            finishRoundLose();
            }
        }
    }
}

function playRound(playerSelection, machineSelection) {
    const winMsg = [
        "Your rock has flawlessly crushed your opponent's scissors. You've won!",
        "Your scissors have cut his paper with ease and style. You've won!",
        "Your paper has fully covered his rock rendering it moveless. You've won!"
        ];
    const loseMsg = [
         "Your scissors have dwindled to the solid power of the rock. You've lost.",
         "Your paper has been sliced in half by his scissors. You've lost.",
         "Your rock has been blindfolded by your opponent's paper. You've lost."
        ];
    const drawMsg = [
        "Two rocks have clashed against each other leaving behind crumbles of despair. Shocking, it's a draw!",
        "Two scissors have collided in an incredible fashion. Such a beautiful and elegant draw!",
        "Two papers covered each other shrinking into a tiny ball. This looks like a writer's paper bin, it's a draw!"
        ];
    
    switch(playerSelection + "/" + machineSelection) {
        case "rock/scissors":
            return winMsg[0];
        case "scissors/rock":
            return loseMsg[0];
        case "rock/rock":
            return drawMsg[0];
        case "scissors/paper":
            return winMsg[1];
        case "paper/scissors":
            return loseMsg[1];
        case "scissors/scissors":
            return drawMsg[1];
        case "paper/rock":
            return winMsg[2];
        case "rock/paper":
            return loseMsg[2];
        case "paper/paper":
            return drawMsg[2];
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

