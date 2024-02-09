// element from DOM
const cards = document.querySelectorAll(".card");

//----------------state variable--------------------------------
const state = {
  firstClickNum: null,
  secondClickNum: null,
  shuffledCards: [],
};

//-----------------event-----------------------------------------
//click card
cards.forEach(function (card) {
  card.addEventListener("click", flipCard);
});

//-------------------------functions----------------------------------
//shuffled cards
const cardNum = Array.from({ length: 8 }, (_, index) => index + 1); //generate random num from 1-8
const pairs = cardNum.flatMap((number) => [number, number]); //Duplicate each number to form pairs
//Shuffle the card array function
function shuffleCard(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
state.shuffledCards = shuffleCard(pairs);

// linked shuffled card number array to image

// Using toggle will ensure that if the class is already present, it will be removed, and if it's not present, it will be added.
function flipCard() {
  //use this to get "card" element
  this.classList.toggle("flipCard");

  //showing picture index
  console.log(Array.from(cards).indexOf(this));
}
