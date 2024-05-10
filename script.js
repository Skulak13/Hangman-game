// Selecting the element where the word will be displayed
let letterArea = document.querySelector('#word');

// Selecting the hidden elements of the hangman game
const line = document.querySelector('#hang__line--hide')
const head = document.querySelector('#hang__head--hide');
const torso = document.querySelector('#hang__torso--hide');
const leftArm = document.querySelector('#hang__leftArm--hide');
const rightArm = document.querySelector('#hang__rightArm--hide');
const leftLeg = document.querySelector('#hang__leftLeg--hide');
const rightLeg = document.querySelector('#hang__rightLeg--hide');


// Array of words for the hangman game
let wordList = ["apple", "avalanche", "volcano", "machine", "autobus", "woman", "busines", "skyscraper", "computer", "network", "flashlight", "village", "technology", "andromeda", "desert", "carrot", "forest"];

// Variables to store the original and masked word
let originalWord = "";
let maskedWord = "";

function wordPick(wordList) {
  // Generate a random index for the wordList array
  const randomIndex = Math.floor(Math.random() * wordList.length);
  originalWord = wordList[randomIndex];
  // Replacing all the characters in the originalWord with '*' and storing it in the maskedWord variable
  maskedWord = originalWord.replace(/./g, '*');
  letterArea.innerText = maskedWord;
}

// Calling the wordPick function to start the game
wordPick(wordList);

const buttonReset = document.getElementById('buttonReset');
const buttonLetter = document.getElementById('buttonLetter');
let usedLetters = document.getElementById('usedLetters');
let letterInput = document.getElementById('letterInput');

buttonReset.addEventListener("click", () => {
  wordPick(wordList);
  reset();
});

buttonLetter.addEventListener("click", () => {
  let enterLetter = letterInput.value.toLowerCase();
  let existingLetter = usedLetters.textContent;
  // Checking if the entered letter is already used or if the input field is empty 
  if (existingLetter.includes(enterLetter) && enterLetter !== '') {
    alert('Letter ' + enterLetter + ' was used. Chose other one.');
    letterInput.value = "";
  } else if (enterLetter == '') {
    alert('Write a letter.');
  } else {
    // Adding the entered letter to the used letters element and clearing the input field
    usedLetters.textContent += enterLetter + ',';
    letterInput.value = '';
    // Calling the checkLetter function to check if the entered letter is in the originalWord
    checkLetter(enterLetter);
  }
});

// Function to check if the entered letter is in the originalWord
function checkLetter(enterLetter) {
  let letterFound = false;

  for (let i = 0; i < originalWord.length; i++) {
    if (originalWord[i] === enterLetter) {
      // Replacing the '*' at the correct position in the maskedWord with the entered letter
      maskedWord = maskedWord.substring(0, i) + enterLetter + maskedWord.substring(i + 1);
      letterArea.innerText = maskedWord;
      letterFound = true;
    }
  }

  // If the letter is not found in the originalWord, the showNextHangElement function is called
  if (!letterFound) {
    showNextHangElement();
  }
  // The endGame function is called to check if the game is over
  endGame();
}

// Function to display the next hidden element of the hangman game
function showNextHangElement() {
  const hangElements = [
    'line', 'head', 'torso', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'
  ];

  // Looping through the hangElements array to find the next hidden element to display
  for (const element of hangElements) {
    const elementSelector = `#hang__${element}--hide`;
    const elementStyle = window.getComputedStyle(document.querySelector(elementSelector));

    // Displaying the next hidden element and breaking the loop  
    if (elementStyle.display === 'none') {
      document.querySelector(elementSelector).style.display = 'block';
      break;
    }
  }
}

// Function to reset the game
function reset() {
  usedLetters.textContent = '';
  // Selecting all the hidden elements and looping through them to hide them
  const hideElements = document.querySelectorAll('[id*="--hide"]');

  hideElements.forEach(element => {
    element.style.display = 'none';
  });
}

// Function to check if the game is over
function endGame() {
  if (originalWord === maskedWord) {
    const answearWin = confirm('You discoverd word: ' + originalWord + '. Do you want to start new game?');
    if (answearWin) {
      wordPick(wordList);
      reset();
    }
  }
  // Checking if the player has lost the game
  if (window.getComputedStyle(rightLeg).getPropertyValue('display') === 'block') {
    // Displaying a confirmation dialog to ask the player if they want to try again
    const answearLost = confirm('You are hangman! Do you want to try again?');
    // Starting a new game if the player confirms
    if (answearLost) {
      wordPick(wordList);
      reset();
    }
  }
}