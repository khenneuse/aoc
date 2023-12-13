import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const getNumbersFromString = (numbers: string): number[] => {
  return numbers
    .trim()
    .split(" ")
    .map((num) => parseInt(num))
    .filter((num) => Number.isInteger(num));
};

const sum = (arr: number[]): number => {
  return arr.reduce((acc, curr) => acc + curr, 0);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const points = [];
  for (let line of input) {
    const [, numbersOnly] = line.split(":");
    const [winning, scratched] = numbersOnly.split("|");
    const winningNumbers = getNumbersFromString(winning);
    const scratchedNumbers = getNumbersFromString(scratched);
    // console.log({ winningNumbers, scratched, scratchedNumbers });

    const matches = scratchedNumbers.filter((num) =>
      winningNumbers.includes(num),
    );
    if (matches.length) {
      points.push(2 ** (matches.length - 1));
    }
  }

  return sum(points);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const cards = Array(input.length).fill(0);

  for (let lineIndex = 0; lineIndex < input.length; lineIndex++) {
    // console.log("******* Card number", lineIndex + 1);
    const [, numbersOnly] = input[lineIndex].split(":");
    const [winning, scratched] = numbersOnly.split("|");
    const winningNumbers = getNumbersFromString(winning);
    const scratchedNumbers = getNumbersFromString(scratched);

    const matches = scratchedNumbers.filter((num) =>
      winningNumbers.includes(num),
    );

    cards[lineIndex] += 1;
    const numberOfWinningCards = cards[lineIndex];
    // console.log("   count", numberOfWinningCards);

    for (
      let nextCardIndex = 1;
      nextCardIndex <= matches.length;
      nextCardIndex++
    ) {
      const currentCard = nextCardIndex + lineIndex;
      cards[currentCard] += numberOfWinningCards;
      // console.log("updated card", currentCard + 1, cards[currentCard]);
    }
  }

  // console.log(cards);
  return sum(cards);
};

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
