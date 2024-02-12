// element from DOM
const cards = document.querySelectorAll(".card");
const frontFaces = document.querySelectorAll(".frontFace");
const winMsg = document.querySelector(".messageText");
const message = document.querySelector(".message");
const restartBtn = document.querySelector(".restart");
const countdownNumber = document.getElementById("countdown-number");
const countdown = document.querySelector("#countdown");
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
  countdownOrigin: 10,
  timer: null,
};

init();
//-----------------event-----------------------------------------
//click card
cards.forEach(function (card) {
  card.addEventListener("click", flipCard);
});

restartBtn.addEventListener("click", restart);

//-------------------------functions----------------------------------
//timer count down
state.timer = setInterval(countdownTimer, 1000);

//shuffled cards
function shuffledNumArr() {
  //generate random num from 1-8
  const cardNum = Array.from({ length: 8 }, (_, index) => index + 1);
  //Duplicate each number to form 8 pairs nums array
  const pairs = cardNum.flatMap((number) => [number, number]);
  //Shuffle the pairs number array
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs;
}

function flipCard() {
  //use "this" to get "card" element
  this.classList.toggle("flipCard"); // toggle-if the class is present-removed, not present-added.
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
    checkMatch();
  }
}

function checkMatch() {
  if (state.firstClickNum === state.secondClickNum) {
    //if same, keep img open
    cards[state.firstImgIndex].removeEventListener("click", flipCard);
    cards[state.secondImgIndex].removeEventListener("click", flipCard);

    state.flippedNum += 2;
    //check Win
    if (state.flippedNum === 16) {
      winMsg.innerText = "Yeah! You Win";
      countdown.classList.add("countdown-hide");
      message.classList.add("msgShow");
    }
    reset();
  } else {
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
  state.countdownOrigin = 10;
}

//countDown timer
function countdownTimer() {
  if (state.countdownOrigin > 0) {
    state.countdownOrigin--;
    countdownNumber.textContent = state.countdownOrigin;
  } else if (state.countdownOrigin == 0) {
    winMsg.innerText = "You lose";
    countdown.classList.add("countdown-hide");
    message.classList.add("msgShow");
  } else {
    return;
  }
}

function init() {
  state.shuffledCards = shuffledNumArr();
  // linked shuffled card number array to images
  cards.forEach((card, index) => {
    let randomImgSrc =
      "./css/images/animal" + state.shuffledCards[index] + ".png";
    card.querySelector(".front-face").setAttribute("src", randomImgSrc);
  });
}

function restart() {
  message.classList.remove("msgShow");
  countdown.classList.remove("countdown-hide");
  //reset countdown timer to 120
  state.countdownOrigin = 10;
  countdownNumber.textContent = state.countdownOrigin;
  // Clear the existing timer interval
  clearInterval(state.timer);
  //start a new timer
  setInterval(countdownTimer, 1000);

  // Flip all cards back
  cards.forEach((card) => {
    card.classList.remove("flipCard");
  });
  // Re-initialize the game
  init();

  //enable flipCard
  cards.forEach(function (card) {
    card.addEventListener("click", flipCard);
  });
}
