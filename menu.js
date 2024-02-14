document.getElementById("EazyMode").addEventListener("click", function () {
  btnClickSound.play();
  document.querySelector(".gameDifficulty").classList.add("hide");

  init(DIFFICULTY.EASY);
});

document.getElementById("HardMode").addEventListener("click", function () {
  btnClickSound.play();
  document.querySelector(".gameDifficulty").classList.add("hide");

  init(DIFFICULTY.HARD);
});
