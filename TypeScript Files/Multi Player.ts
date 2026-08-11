let backtohomebutton = document.querySelector('.backtohomebutton') as HTMLButtonElement;
let singleplayermodebutton = document.querySelector('.singleplayermodebutton') as HTMLButtonElement;
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

// Home Button FUnction
backtohomebutton.onclick = function() {
    window.location.href = 'index.html';
}

// Single Player Mode Button Function
singleplayermodebutton.onclick = function() {
    window.location.href = 'Single Player.html';
}

// Empty Cell Checking Function
let empty : string = "";
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

// Winner Maker Function
let scoreX = 0;
let score0 = 0;
function winner(): boolean {
    const winningLines: Array<[HTMLButtonElement, HTMLButtonElement, HTMLButtonElement]> = [
        [gamebutton1, gamebutton2, gamebutton3],
        [gamebutton1, gamebutton5, gamebutton9],
        [gamebutton1, gamebutton4, gamebutton7],
        [gamebutton2, gamebutton5, gamebutton8],
        [gamebutton3, gamebutton6, gamebutton9],
        [gamebutton4, gamebutton5, gamebutton6],
        [gamebutton7, gamebutton8, gamebutton9],
        [gamebutton3, gamebutton5, gamebutton7]
    ];
// Winner Announcer & Score Updater Function
    for (const [first, second, third] of winningLines) {
        if (first.innerText !== empty && first.innerText === second.innerText && second.innerText === third.innerText) {
            gamestatus.style.color = 'red';
            gamestatus.value = `Hooray ! Player ${first.innerText} has Won`;
            if (first.innerText == "X") {
                scoreX++;
                playerxscore.value = scoreX.toString().padStart(2, "0");
            }
            else if (first.innerText == "0") {
                score0++;
                player0score.value = score0.toString().padStart(2, "0");
            }
            return true;
        }
    }
    if (emptycheck()) {
        gamestatus.style.color = 'red';
        gamestatus.value = "It's a Draw";
        return true;
    }
    return false;
}

// Next Move Status Updater Function
let turnX : boolean = true;
gamestatus.value = "Turn of Player X";
playerxscore.value = "00";
player0score.value = "00";
gamebuttons.forEach((gamebutton) => {
    gamebutton.addEventListener("click", () => {
        if (turnX == true) {
            gamebutton.innerText = "X";
            turnX = false;
            gamestatus.value = "Turn of Player 0";
        }
        else {
            gamebutton.innerText = "0";
            turnX = true;
            gamestatus.style.color = 'chocolate';
            gamestatus.value = "Turn of Player X";
        }
         gamebutton.disabled = true;
    });

// After Winner Announcement Board Stage FUnction
    gamebutton.addEventListener("click", () => {
        if (winner()) {
            gamebuttons.forEach((button) => {
                button.disabled = true;
            });
        }
    });

//New Game Button Function
    newgamebutton.addEventListener("click", () => {
     gamebutton.disabled = false;
     gamebutton.innerText = "";
     gamestatus.style.color = 'chocolate';
     if (turnX = true) {
        gamestatus.value = "Turn of Player X";
     }
     else if (turnX = false) {
        gamestatus.value = "Turn of Player 0";
     }
    });
});




