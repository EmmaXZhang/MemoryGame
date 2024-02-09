// element from DOM
const cards = document.querySelectorAll(".card");
const frontFaces = document.querySelectorAll(".frontFace");

//----------------state variable--------------------------------
const state = {
  firstClickNum: null,
  secondClickNum: null,
  shuffledCards: [],
  firstImgIndex: null,
  secondImgIndex: null,
  imgClickIndex: null,
};

init();
//-----------------event-----------------------------------------
//click card
cards.forEach(function (card) {
  card.addEventListener("click", flipCard);
});

//-------------------------functions----------------------------------
//shuffled cards
function shuffledNumArr() {
  const cardNum = Array.from({ length: 8 }, (_, index) => index + 1); //generate random num from 1-8
  const pairs = cardNum.flatMap((number) => [number, number]); //Duplicate each number to form 8 pairs nums array
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

  if (state.firstClickNum === null) {
    state.firstImgIndex = state.imgClickIndex;
    state.firstClickNum = state.shuffledCards[state.firstImgIndex];
  } else {
    state.secondImgIndex = state.imgClickIndex;
    state.secondClickNum = state.shuffledCards[state.secondImgIndex];
  }

  //if same, keep img open ???
  if (state.firstClickNum === state.secondClickNum) {
    // this.classList.toggle("flipCard");
    cards[state.firstImgIndex].classList.remove("flipCard");
    cards[state.secondImgIndex].classList.remove("flipCard");
  } else {
    // Create local variables to store image indices
    const firstIndex = state.firstImgIndex;
    const secondIndex = state.secondImgIndex;
    //if note, fip back after few second: 2 imgs
    setTimeout(() => {
      cards[firstIndex].classList.toggle("flipCard");
      cards[secondIndex].classList.toggle("flipCard");
    }, 2000);

    //reset state for click num for next pair
    state.firstClickNum = null;
    state.secondClickNum = null;
    state.firstImgIndex = null;
    state.secondImgIndex = null;
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
