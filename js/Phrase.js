/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    // Get phrase and split into letters
    const letters = this.phrase.split('');
    const ul = document.querySelector('ul');
    // Create li's and classes and append to the ul
    letters.forEach(letter => {
      const li = document.createElement('li');
      const item = document.createTextNode(`${letter}`);
      letter === ' '
        ? (li.className = 'space')
        : (li.className = `hide letter ${letter}`);

      li.appendChild(item);
      ul.appendChild(li);
    });
  }

  /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */
  checkLetter(letter) {
    // return true/false if passed letter matches letter in phrase
    return this.phrase.includes(letter) ? true : false;
  }

  /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
  showMatchedLetter(letter) {
    const listItem = document.querySelectorAll('.letter');
    // Add 'show' class if passed letter mathces
    for (let li of listItem) {
      if (li.innerText === letter) {
        li.classList.remove('hide');
        li.classList.add('show');
      }
    }
  }
}
