function shuffledNumArr() {
  const cardNum = Array.from({ length: 8 }, (_, index) => index + 1); // Generate numbers from 1 to 8
  const pairs = cardNum.flatMap((number) => [number, number]); // Duplicate each number to form 8 pairs nums array

  // Fisher-Yates shuffle algorithm to shuffle the pairs array
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }

  // Store shuffled pairs in state.shuffledCards
  return pairs;
}

console.log(shuffledNumArr());
