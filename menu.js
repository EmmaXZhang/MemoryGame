const numberOfCardsEasy = 8;
const numberOfCardsHard = 10;

document.getElementById("EazyMode").addEventListener("click", function () {
  document.getElementsByClassName("container")[0].style.display = "grid";
  init(numberOfCardsEasy);
});

document.getElementById("HardMode").addEventListener("click", function () {
  document.getElementsByClassName("container")[0].style.display = "grid";
  init(numberOfCardsHard);
});

// document.getElementById("EazyMode").addEventListener("click", function () {
//   // Create a new script element
//   var script = document.createElement("script");
//   // Set the src attribute to the JavaScript file you want to load
//   script.src = "./game.js";
//   // Once the script is loaded, execute this function
//   script.onload = function () {
//     // Access the variables inside the loaded script
//     if (typeof init === "function") {
//       document.getElementsByClassName("container")[0].style.display = "grid";
//       init(numberOfCardsEasy);
//     }
//   };

//   // Append the script element to the document's body
//   document.body.appendChild(script);
// });

// // for Hard button
// document.getElementById("HardMode").addEventListener("click", function () {
//   var script = document.createElement("script");
//   script.src = "./game.js";
//   script.onload = function () {
//     if (typeof init === "function") {
//       document.getElementsByClassName("container")[0].style.display = "grid";
//       init(numberOfCardsHard);
//     }
//   };
//   document.body.appendChild(script);
// });
