// element from DOM
let cards = document.querySelectorAll(".card");
const frontFaces = document.querySelectorAll(".frontFace");
const winMsg = document.querySelector(".messageText");
const message = document.querySelector(".message");
const restartBtn = document.querySelector(".restart");
const countdownNumber = document.getElementById("countdown-number");
const countdown = document.querySelector("#countdown");
const circle = document.querySelector("svg circle");
const cardContainer = document.querySelector(".container");
const cardsLeftEl = document.querySelector(".cardsLeftText");
const flipSound = new Audio(
  "https://cdn.freesound.org/previews/240/240776_4107740-lq.mp3"
);
const btnClickSound = new Audio(
  "https://cdn.freesound.org/previews/504/504166_9961300-lq.mp3"
);

const DIFFICULTY = {
  EASY: 8,
  HARD: 10,
};

//----------------state variable--------------------------------
const state = {
  firstClickNum: null,
  secondClickNum: null,
  shuffledCards: [],
  firstImgIndex: null,
  secondImgIndex: null,
  imgClickIndex: null,
  isFirstClick: true,
  flippedNum: 0,
  countdownOrigin: 60,
  timer: null,
  numberOfCards: 0,
  cardsLeft: 0,
};

//-----------------event-----------------------------------------
//click card
cards.forEach(function (card) {
  card.addEventListener("click", flipCard);
});
restartBtn.addEventListener("click", restart);

//-------------------------functions----------------------------------

//shuffled cards
function shuffledNumArr(numberOfCards) {
  let cardNum;
  let pairs;
  switch (numberOfCards) {
    case 8:
      //generate random num from 1-8
      cardNum = Array.from({ length: 8 }, (_, index) => index + 1);
      break;
    case 10:
      //generate random num from 1-10
      cardNum = Array.from({ length: 10 }, (_, index) => index + 1);
      break;
  }
  //Duplicate each number to form 8 or10 pairs nums array
  pairs = cardNum.flatMap((number) => [number, number]);
  //Shuffle the pairs number array
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

function flipCard() {
  // flipCardAudio();
  flipSound.play();
  flipSound.volume = 0.5;
  //check if the card flip up or not to avoid second click to flip back
  if (this.classList.contains("flipCard")) {
    return;
  }

  //use "this" to get "card" element
  this.classList.toggle("flipCard");
  //check is second click img == first click img. (Num same), also store 1st and 2nd img index
  state.imgClickIndex = Array.from(cards).indexOf(this); //get image index from "cards" notelist

  if (state.isFirstClick) {
    state.firstImgIndex = state.imgClickIndex;
    state.firstClickNum = state.shuffledCards[state.firstImgIndex];
    state.isFirstClick = false;
  } else {
    state.secondImgIndex = state.imgClickIndex;
    state.secondClickNum = state.shuffledCards[state.secondImgIndex];
    state.isFirstClick = true;
    //check pair match
    checkMatch(state.numberOfCards);
  }
}

function checkMatch(numberOfCards) {
  if (state.firstClickNum === state.secondClickNum) {
    //if same, keep img open
    cards[state.firstImgIndex].removeEventListener("click", flipCard);
    cards[state.secondImgIndex].removeEventListener("click", flipCard);

    state.flippedNum += 2;

    //display cards Left
    state.cardsLeft -= 2;
    cardsLeftEl.innerText = `Cards Left: ${state.cardsLeft}`;

    //check Win
    if (
      numberOfCards == DIFFICULTY.EASY &&
      state.flippedNum === DIFFICULTY.EASY * 2
    ) {
      winMsg.innerText = "Yeah! You Win";
      countdown.classList.remove("countdown-show");
      //clear countdown timer
      clearInterval(state.timer);
      message.classList.add("msgShow");
      reset();
    } else if (
      numberOfCards == DIFFICULTY.HARD &&
      state.flippedNum === DIFFICULTY.HARD * 2
    ) {
      winMsg.innerText = "Yeah! You Win";
      countdown.classList.remove("countdown-show");
      //clear countdown timer
      clearInterval(state.timer);
      message.classList.add("msgShow");
      reset();
    }
  } else {
    //check not Match
    // Create local variables to store image indices
    const firstIndex = state.firstImgIndex;
    const secondIndex = state.secondImgIndex;
    //if note, fip back 2 imgs after few second
    setTimeout(() => {
      cards[firstIndex].classList.toggle("flipCard");
      cards[secondIndex].classList.toggle("flipCard");
    }, 1000);
    reset();
  }
}

function reset() {
  //reset state for click num for next pair
  state.firstClickNum = null;
  state.secondClickNum = null;
  state.firstImgIndex = null;
  state.secondImgIndex = null;
}

//countDown timer
function countdownTimer() {
  if (state.countdownOrigin > 0) {
    state.countdownOrigin--;
    countdownNumber.textContent = state.countdownOrigin;
  } else if (state.countdownOrigin == 0) {
    winMsg.innerText = "You lose";
    countdown.classList.remove("countdown-show");
    message.classList.add("msgShow");
  } else {
    return;
  }
}

function init(numberOfCards) {
  countdown.classList.add("countdown-show");

  //timer count down
  state.timer = setInterval(countdownTimer, 1000);
  //link to player choice
  state.numberOfCards = numberOfCards;

  state.shuffledCards = shuffledNumArr(numberOfCards);
  // linked shuffled card number array to images
  //easy mode
  if (numberOfCards === DIFFICULTY.EASY) {
    cardRender();
  } else if (numberOfCards === DIFFICULTY.HARD) {
    // add all the new cards
    const createdNewCards = (DIFFICULTY.HARD - DIFFICULTY.EASY) * 2;
    for (let i = 0; i < createdNewCards; i++) {
      let newCards = document.createElement("section");
      newCards.classList.add("card");
      //newCard identifier
      newCards.classList.add("newCard");
      //add frontFace/backFace img class
      let frontFace = document.createElement("img");
      frontFace.classList.add("front-face");
      let backFace = document.createElement("img");
      backFace.classList.add("back-face");
      //back face image link
      backFace.setAttribute("src", "./css/images/question-mark.png");
      //add frontFace/backFace to newCards class
      newCards.appendChild(frontFace);
      newCards.appendChild(backFace);
      //addback to container
      cardContainer.appendChild(newCards);
    }
    //reselect all cards
    cards = document.querySelectorAll(".card");

    //enable flipcard
    cards.forEach(function (card) {
      card.addEventListener("click", flipCard);
    });

    cardRender();
  }

  //cards left number
  state.cardsLeft = numberOfCards * 2;
  cardsLeftEl.innerText = `Cards Left: ${state.cardsLeft}`;

  // add the circle animation to game page -css
  circle.style.animation = "countdown 60s linear forwards";
  circle.style.display = "block";
}

function restart() {
  //play click sound
  btnClickSound.play();

  message.classList.remove("msgShow");
  countdown.classList.add("countdown-show");

  //reset countdown timer to 60
  state.countdownOrigin = 60;
  countdownNumber.textContent = state.countdownOrigin;
  // Clear the existing timer interval
  clearInterval(state.timer);

  //remove old newCards via giving newCard class name
  let newCardsToRemove = document.querySelectorAll(".newCard");
  newCardsToRemove.forEach((card) => card.remove());
  // Re-initialize the game
  init(state.numberOfCards);
  // Flip all cards back
  cards.forEach((card) => {
    card.classList.remove("flipCard");
  });
  //enable flipCard
  cards.forEach(function (card) {
    card.addEventListener("click", flipCard);
  });
}

function cardRender() {
  cards.forEach((card, index) => {
    let randomImgSrc =
      "./css/images/animal" + state.shuffledCards[index] + ".png";
    card.querySelector(".front-face").setAttribute("src", randomImgSrc);
  });
}
