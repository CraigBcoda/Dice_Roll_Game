const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRst = document.querySelector('.btn--new');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scoreCurrent0El = document.getElementById('current--0');
const scoreCurrent1El = document.getElementById('current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
let activePlayer = 0;
let currentScore = 0;
const scores = [0, 0];
let playing = true;

// Switch Player Function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Starting parameters
scoreCurrent0El.textContent = Number(0);
scoreCurrent1El.textContent = Number(0);
score0El.textContent = Number(0);
score1El.textContent = Number(0);

// Dice Roll
const diceRoll = function () {
  if (playing) {
    const result = Math.floor(Math.random() * 6) + 1;
    console.log(result);
    diceEl.src = `dice-${result}.png`;
    diceEl.classList.remove('hidden');
    currentScore += result;
    if (result !== 1) {
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};
//Hold Score
const holdScore = function () {
  if (playing) {
    //1. add current score to active score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if > 100
    if (document.getElementById(`score--${activePlayer}`).textContent < 100) {
      switchPlayer();
    } else {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
  }
};
// Game Over
const gameOver = function () {
  scoreCurrent0El.textContent = Number(0);
  scoreCurrent1El.textContent = Number(0);
  score0El.textContent = Number(0);
  score1El.textContent = Number(0);
  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  activePlayer = 0;
  playing = true;
};

// Dice Roll Button Press
const diceRollBtn = btnRoll.addEventListener('click', diceRoll);
// Hold Button Press
const holdScoreBtn = btnHold.addEventListener('click', holdScore);
// Reset Button Press
const rstButton = btnRst.addEventListener('click', gameOver);
