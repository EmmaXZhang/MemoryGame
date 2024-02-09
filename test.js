const cardNum = Array.from({ length: 8 }, (_, index) => index + 1);
//
// Step 2: Duplicate each number to form pairs
const pairs = cardNum.flatMap((number) => [number, number]);

// Step 3: Shuffle the array
function shuffleCard(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledCards = shuffleCard(pairs);

console.log(shuffledCards);
