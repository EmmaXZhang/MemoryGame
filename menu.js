document.getElementById("EazyMode").addEventListener("click", function () {
  btnClickSound.play();
  document.querySelector(".gameDifficulty").classList.add("hide");
  init(DIFFICULTY.EASY);
});

document.getElementById("MediumMode").addEventListener("click", function () {
  btnClickSound.play();
  document.querySelector(".gameDifficulty").classList.add("hide");
  init(DIFFICULTY.MEDIUM);
});

document.getElementById("HardMode").addEventListener("click", function () {
  btnClickSound.play();
  document.querySelector(".gameDifficulty").classList.add("hide");
  init(DIFFICULTY.HARD);
});
