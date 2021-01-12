/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;
startBtn = document.getElementById('btn__reset');
startBtn.addEventListener('click', e => {
  game = new Game();
  game.startGame();
  game.gameReset();
});

// Add click event listener to onscreen keyboard buttons
const onscreenKeyboard = document.getElementById('qwerty');
onscreenKeyboard.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    game.handleInteraction(e.target);
  }
});

// Add event listener to players physical keyboard
document.addEventListener('keydown', e => {
  game.handleKeypress(e.key);
});
