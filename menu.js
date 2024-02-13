document.getElementById("EazyMode").addEventListener("click", function () {
  document.querySelector(".gameDifficulty").classList.add("hide");
  document.getElementsByClassName("container")[0].style.display = "grid";
  init(DIFFICULTY.EASY);
});

document.getElementById("HardMode").addEventListener("click", function () {
  document.querySelector(".gameDifficulty").classList.add("hide");
  document.getElementsByClassName("container")[0].style.display = "grid";
  init(DIFFICULTY.HARD);
});
