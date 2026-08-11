let entrybuttontosingleplayer = document.querySelector(".entrybuttontosingleplayer") as HTMLButtonElement;
let entrybuttontomultiplayer = document.querySelector(".entrybuttontomultiplayer") as HTMLButtonElement;

entrybuttontosingleplayer.onclick = function() {
    window.location.href = 'Single Player.html';
}

entrybuttontomultiplayer.onclick = function() {
    window.location.href = 'Multi Player.html';
}