// element from DOM
const cards = document.querySelectorAll(".card");

//event
cards.forEach((card) => {
  card.addEventListener("click", handleClick, { once: true });
});

//function
function handleClick(event) {
  const cell = event.target;
  flipCard(cell);
}

// Using toggle will ensure that if the class is already present, it will be removed, and if it's not present, it will be added.
function flipCard(cell) {
  cell.classList.add("flipCard");
}
