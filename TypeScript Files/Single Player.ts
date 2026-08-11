let backtohomebutton = document.querySelector('.backtohomebutton') as HTMLButtonElement;
let multiplayermodebutton = document.querySelector('.multiplayermodebutton') as HTMLButtonElement;
let gamebuttons = document.querySelectorAll('.gamebutton') as NodeListOf<HTMLButtonElement>;
let gamebutton1 = document.querySelector('#gamebutton1') as HTMLButtonElement;
let gamebutton2 = document.querySelector('#gamebutton2') as HTMLButtonElement;
let gamebutton3 = document.querySelector('#gamebutton3') as HTMLButtonElement;
let gamebutton4 = document.querySelector('#gamebutton4') as HTMLButtonElement;
let gamebutton5 = document.querySelector('#gamebutton5') as HTMLButtonElement;
let gamebutton6 = document.querySelector('#gamebutton6') as HTMLButtonElement;
let gamebutton7 = document.querySelector('#gamebutton7') as HTMLButtonElement;
let gamebutton8 = document.querySelector('#gamebutton8') as HTMLButtonElement;
let gamebutton9 = document.querySelector('#gamebutton9') as HTMLButtonElement;
let playerxscore = document.querySelector('#playerxscore') as HTMLInputElement;
let player0score = document.querySelector('#player0score') as HTMLInputElement;
let gamestatus = document.querySelector('.gamestatus') as HTMLInputElement;
let newgamebutton = document.querySelector('.newgamebutton') as HTMLButtonElement;

// HOME BUTTON FUNCTION
backtohomebutton.onclick = function () {
    window.location.href = 'index.html';
};

// Multi PLAYER MODE BUTTON FUNCTION
multiplayermodebutton.onclick = function () {
    window.location.href = 'Multi Player.html';
};

// EMPTY CELL CHECKING FUNCTION
let empty: string = "";
function emptycheck(): boolean {
    return gamebutton1.innerText !== empty &&
           gamebutton2.innerText !== empty &&
           gamebutton3.innerText !== empty &&
           gamebutton4.innerText !== empty &&
           gamebutton5.innerText !== empty &&
           gamebutton6.innerText !== empty &&
           gamebutton7.innerText !== empty &&
           gamebutton8.innerText !== empty &&
           gamebutton9.innerText !== empty;
}

// SCORE VARIABLES
let scoreX = 0;
let score0 = 0;

// GAME OVER VARIABLE
let gameOver: boolean = false;

// WINNER CHECKING FUNCTION
function winner(): boolean {
    const winningLines: Array<[HTMLButtonElement, HTMLButtonElement, HTMLButtonElement]> = 
    [
        [gamebutton1, gamebutton2, gamebutton3],
        [gamebutton1, gamebutton5, gamebutton9],
        [gamebutton1, gamebutton4, gamebutton7],
        [gamebutton2, gamebutton5, gamebutton8],
        [gamebutton3, gamebutton6, gamebutton9],
        [gamebutton3, gamebutton5, gamebutton7],
        [gamebutton4, gamebutton5, gamebutton6],
        [gamebutton7, gamebutton8, gamebutton9]
    ];

// Check all winning combinations
    for (const [first, second, third] of winningLines) {
        if (
            first.innerText !== empty &&
            first.innerText === second.innerText &&
            second.innerText === third.innerText
        ) 
        {
            gamestatus.style.color = 'red';
            // Player X wins
            if (first.innerText === "X") {
                gamestatus.value = 'Player has Won';
                scoreX++;
                playerxscore.value =
                    scoreX.toString().padStart(2, "0");
            }
            // Computer 0 wins
            else if (first.innerText === "0") {
                gamestatus.value = 'Computer has Won';
                score0++;
                player0score.value =
                    score0.toString().padStart(2, "0");
            }
            gameOver = true;
            disableAllButtons();
            return true;
        }
    }
    // Check for draw
    if (emptycheck()) {
        gamestatus.style.color = 'red';
        gamestatus.value = "It's a Draw";
        gameOver = true;
        disableAllButtons();
        return true;
    }
    return false;
}

// DISABLE ALL GAME BUTTONS
function disableAllButtons(): void {
    gamebuttons.forEach((button) => {
        button.disabled = true;
    });
}

// COMPUTER MOVE FUNCTION
function computerMove(): void {

    // Don't make a move if game is already over
    if (gameOver) {
        return;
    }

    // Find all empty cells
    const emptyButtons: HTMLButtonElement[] = [];
    gamebuttons.forEach((button) => {
        if (button.innerText === empty) {
            emptyButtons.push(button);
        }
    });

    // If there are no empty cells
    if (emptyButtons.length === 0) {
        return;
    }

    // Randomly select one empty cell
    const randomIndex =
        Math.floor(Math.random() * emptyButtons.length);
    const computerButton =
        emptyButtons[randomIndex];
    if (!computerButton) {
        return;
    }

    // Put 0 in selected cell
    computerButton.innerText = "0";
    computerButton.disabled = true;

    // Check whether computer has won
    if (winner()) {
        return;
    }

    // Give turn back to Player X
    gamestatus.style.color = 'chocolate';
    gamestatus.value = "Turn of Player X";
}

// PLAYER X MOVE
gamebuttons.forEach((gamebutton) => {
    gamebutton.addEventListener("click", () => {

        // Do nothing if game is over
        if (gameOver) {
            return;
        }

        // Put X in the clicked cell
        gamebutton.innerText = "X";
        gamebutton.disabled = true;

        // Check whether Player X has won
        if (winner()) {
            return;
        }

        // Tell user that computer is thinking
        gamestatus.style.color = 'chocolate';
        gamestatus.value = "Computer's Turn";

        // Small delay before computer moves
        setTimeout(() => {
            computerMove();
        }, 500);
    });
});

// NEW GAME BUTTON
newgamebutton.addEventListener("click", () => {

    // Reset all cells
    gamebuttons.forEach((button) => {
        button.disabled = false;
        button.innerText = "";
    });

    // Reset game state
    gameOver = false;

    // Player X always starts
    gamestatus.style.color = 'chocolate';
    gamestatus.value = "Turn of Player X";
});

// INITIAL GAME SETTINGS
gamestatus.style.color = 'chocolate';
gamestatus.value = "Turn of Player X";

playerxscore.value = "00";
player0score.value = "00";
