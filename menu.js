const numberOfCardsEasy = 8;
const numberOfCardsHard = 10;

document.getElementById("EazyMode").addEventListener("click", function () {
  document.querySelector(".gameDifficulty").classList.add("hide");
  document.getElementsByClassName("container")[0].style.display = "grid";
  init(numberOfCardsEasy);
});

document.getElementById("HardMode").addEventListener("click", function () {
  document.querySelector(".gameDifficulty").classList.add("hide");
  document.getElementsByClassName("container")[0].style.display = "grid";
  init(numberOfCardsHard);
});
