let letterArea = document.querySelector('#word');
const line = document.querySelector('#hang__line--hide')
const head = document.querySelector('#hang__head--hide');
const torso = document.querySelector('#hang__torso--hide');
const leftArm = document.querySelector('#hang__leftArm--hide');
const rightArm = document.querySelector('#hang__rightArm--hide');
const leftLeg = document.querySelector('#hang__leftLeg--hide');
const rightLeg = document.querySelector('#hang__rightLeg--hide');



let wordList = ["apple", "avalanche", "volcano", "machine", "autobus", "woman", "busines", "skyscraper", "computer", "network", "flashlight", "village", "technology", "andromeda", "desert", "carrot", "forest"];

let originalWord = "";
let maskedWord = "";

function wordPick(wordList) {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  originalWord = wordList[randomIndex];
  maskedWord = originalWord.replace(/./g, '*');
  letterArea.innerText = maskedWord;
}

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
  let existingLetter = usedLetters.textContent; //metody includes można użyć tylko na stringach, nie obiektach DOM, dlatego dodajemy do zmiennej textContent
  if (existingLetter.includes(enterLetter) && enterLetter !== '') {
    alert('Letter ' + enterLetter + ' was used. Chose other one.');
    letterInput.value = "";
  } else if (enterLetter == '') {
    alert('Write a letter.');
  } else {
    usedLetters.textContent += enterLetter + ',';
    letterInput.value = '';
    checkLetter(enterLetter);
  }
});

function checkLetter(enterLetter) {
  let letterFound = false;

  for (let i = 0; i < originalWord.length; i++) {
    if (originalWord[i] === enterLetter) {
      // Zamienianie * na wpisaną literę w zmiennej maskedWord
      maskedWord = maskedWord.substring(0, i) + enterLetter + maskedWord.substring(i + 1);
      letterArea.innerText = maskedWord;
      letterFound = true;
    }
  }
  if (!letterFound) {
    showNextHangElement();
  }
  endGame();
}

function showNextHangElement() {
  // Lista elementów do pokazania w odpowiedniej kolejności
  const hangElements = [
    'line', 'head', 'torso', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'
  ];

  // Iteruj przez elementy i pokazuj kolejne elementy, jeśli są dostępne
  for (const element of hangElements) {
    const elementSelector = `#hang__${element}--hide`;
    const elementStyle = window.getComputedStyle(document.querySelector(elementSelector));


    if (elementStyle.display === 'none') {
      // Jeśli element jest ukryty, pokaż go i przerwij pętlę
      document.querySelector(elementSelector).style.display = 'block';
      break;
    }
  }
}

function reset() {
  usedLetters.textContent = '';
  const hideElements = document.querySelectorAll('[id*="--hide"]');

  hideElements.forEach(element => {
    element.style.display = 'none';
  });
}

function endGame() {
  if (originalWord === maskedWord) {
    const answearWin = confirm('You discoverd word: ' + originalWord + '. Do you want to start new game?');
    if (answearWin) {
      wordPick(wordList);
      reset();
    }
  }
  if (window.getComputedStyle(rightLeg).getPropertyValue('display') === 'block') {
    const answearLost = confirm('You are hangman! Do you want to try again?');
    if (answearLost) {
      wordPick(wordList);
      reset();
    }
  }
}