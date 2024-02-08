// element from DOM
const cards = document.querySelectorAll(".card");

//event
cards.forEach(function (card) {
  card.addEventListener("click", flipCard);
});

// Using toggle will ensure that if the class is already present, it will be removed, and if it's not present, it will be added.
function flipCard() {
  //use this to get "card" element
  this.classList.toggle("flipCard");
}
