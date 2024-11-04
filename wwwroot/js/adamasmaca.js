const keyboard = document.querySelector(".keyboard");
const h4 = document.querySelector("h4");
const kelimeDisplay = document.querySelector(".kelime-display");
const chance = document.querySelector(".chance");
const img = document.querySelector(".img");

const gameover = document.querySelector(".GameOver");
const gameoverimg = document.querySelector(".gameoverImg");
const answer = document.querySelector(".answer");
const h3 = document.querySelector("h3");
const h6 = document.querySelector("h6");

let count = 0;
const maxAttempts = 6;

// Randomly select a word and hint from the list
const randomOyun = Math.floor(Math.random() * kelimeList.length);
const { kelime, ipucu } = kelimeList[randomOyun];

// Turkish keyboard layout
const trKeyboardLayout = [
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü",
  "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ",
  "Z", "X", "C", "V", "B", "N", "M", "Ö", "Ç"
];

// Create keyboard buttons
trKeyboardLayout.forEach(letter => {
  let button = document.createElement("button");
  button.classList.add("btn");
  button.innerHTML = letter;
  keyboard.appendChild(button);
});

// Update hangman image based on wrong attempts
const updateHangmanImage = () => {
  img.src = `../img/hangman-${Math.min(count, maxAttempts)}.svg`;
  if (count >= maxAttempts) {
    setTimeout(() => gameOver(false), 200);
  }
};

// Display game over screen
const gameOver = (won) => {
  gameover.classList.add("show");
  document.querySelector(".game").style.opacity = 0.8;
  if (won) {
    gameoverimg.src = "../img/victory.gif";
    h3.innerText = "Tebrikler!";
    h6.innerText = "Doğru cevabı bildiniz!";
  } else {
    gameoverimg.src = "../img/lost.gif";
    h3.innerText = "Oyunu Kaybettin!";
    h6.innerText = `Doğru Kelime: ${kelime}`;
  }
};

// Check if the game is won
const gameOverwin = () => {
  const letterElems = document.querySelectorAll(".letter");
  const displayedWord = Array.from(letterElems).map(elem => elem.innerText.toLowerCase()).join('');
  if (displayedWord === kelime.toLowerCase()) {
    gameOver(true);
  }
};

// Process the guessed letter
const matchKelime = (val) => {
  const matches = [];
  kelime.toLowerCase().split("").forEach((el, idx) => {
    if (el === val.toLowerCase()) {
      matches.push(idx);
    }
  });

  if (matches.length === 0) {
    count++;
    chance.innerText = `${count}/${maxAttempts}`;
    updateHangmanImage();
  } else {
    matches.forEach((idx) => {
      const letterElem = document.querySelectorAll(".letter")[idx];
      letterElem.innerText = val;
      letterElem.classList.add("guess");
    });
    gameOverwin(); // Check if the game is won after updating the display
  }
};

// Load the question and initialize the game
const loadQuestion = () => {
  h4.innerText = `İpucu: ${ipucu}`;

  // Create placeholder letters for the word
  kelime.split("").forEach(() => {
    let liTag = document.createElement("li");
    liTag.classList.add("letter");
    kelimeDisplay.appendChild(liTag);
  });

  // Add event listeners to keyboard buttons
  const buttonTag = document.querySelectorAll(".btn");
  buttonTag.forEach((button) => {
    button.addEventListener("click", (e) => {
      matchKelime(e.target.innerText);
    });
  });
};

loadQuestion();

    let button = document.createElement("button");
    button.classList.add("btn")
        button.innerHTML = String.fromCharCode(i);
        keyboard.appendChild(button);