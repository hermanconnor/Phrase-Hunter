/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

  /**
   * Creates phrases for use in game
   * @return {array} An array of phrases that could be used in the game
   */
  createPhrases() {
    const phrases = [
      new Phrase('Yippee Ki Yay'),
      new Phrase('Get To The Choppa'),
      new Phrase('Hasta La Vista Baby'),
      new Phrase('A Royale With Cheese'),
      new Phrase('Say Hello To My Little Friend'),
    ];

    return phrases;
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    const randNum = Math.floor(Math.random() * 5);
    const phrase = this.phrases[randNum];

    return phrase;
  }

  /**
   * Handles onscreen keyboard button clicks
   * @param (HTMLButtonElement) button - The clicked button element
   */
  handleInteraction(button) {
    const letter = button.innerText;
    // Check letter, display if correct, check for win, add class for correct/incorrect guess
    if (this.activePhrase.checkLetter(letter)) {
      this.activePhrase.showMatchedLetter(letter);
      button.className = 'chosen';
      button.disabled = true;
      if (this.checkForWin()) {
        this.gameOver(true);
      }
    } else {
      button.className = 'wrong';
      button.disabled = true;
      this.removeLife();
    }
  }

  /**
   * Lets players use their physical computer keyboard to enter guesses.
   * @param key - The key that's pressed on physical keyboard
   */
  handleKeypress(key) {
    if (this.activePhrase.checkLetter(key)) {
      this.activePhrase.showMatchedLetter(key);
      if (this.checkForWin()) {
        this.gameOver(true);
      }
    } else {
      this.removeLife();
    }
  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    // Gets the first instance of the heart image in the list
    let lostHearts = document.querySelector('img[src="images/liveHeart.png"]');
    // Change the image to 'remove' a heart from scoreboard
    lostHearts.src = 'images/lostHeart.png';
    this.missed++;

    if (this.missed === 5) {
      this.gameOver(false);
    }
  }

  /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't
   won
  */
  checkForWin() {
    const currentPhraseLength = this.activePhrase.phrase.length;
    const show = document.getElementsByClassName('show');
    const space = document.getElementsByClassName('space');
    const totalLength = show.length + space.length;
    // Return true/false if show + space classes equals phrase length
    return totalLength === currentPhraseLength ? true : false;
  }

  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    const overlay = document.getElementById('overlay');
    let message = document.getElementById('game-over-message');

    if (gameWon) {
      message.innerText = 'You Win!🏆';
      overlay.classList.remove('start');
      overlay.classList.remove('lose');
      overlay.classList.add('win');
      overlay.style.display = 'block';
    } else {
      message.innerText = 'You Lose!😢';
      overlay.classList.remove('start');
      overlay.classList.remove('win');
      overlay.classList.add('lose');
      overlay.style.display = 'block';
    }
  }

  /**
   * Removes all `li` elements from the Phrase `ul` element.
   * Resets all of the onscreen keyboard buttons.
   * Reset all of the heart images.
   */
  gameReset() {
    /**code adapted from https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript - Gabriel McAdams */
    const ul = document.querySelector('ul');
    while (ul.lastElementChild) {
      ul.removeChild(ul.lastElementChild);
    }

    // Reset onscreen keyboard buttons
    const buttons = document.querySelectorAll('#qwerty button');
    for (let button of buttons) {
      button.classList.remove('chosen');
      button.classList.remove('wrong');
      button.classList.add('key');
      button.disabled = false;
    }

    // Reset heart images
    this.missed = 0;
    let hearts = document.querySelectorAll('img[src="images/lostHeart.png"]');
    for (let heart of hearts) {
      heart.src = 'images/liveHeart.png';
    }
    // Get and display random phrase
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }
}
