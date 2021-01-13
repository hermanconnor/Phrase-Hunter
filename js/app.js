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
const keyboard = document.querySelectorAll('#qwerty button');
document.addEventListener('keydown', e => {
  for (let key of keyboard) {
    if (key.textContent === e.key && key.className !== 'wrong') {
      game.handleInteraction(key);
    }
  }
});
