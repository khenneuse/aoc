import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const isDigit = (char: string) => {
  return /\d/.test(char);
};

const directions = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];
const symbolNearby = (input: string[], rowIndex: number, colIndex: number) => {
  const rowCount = input.length;
  const colCount = input[0].length;

  for (let move of directions) {
    const x = rowIndex + move[0];
    const y = colIndex + move[1];
    if (x < 0 || y < 0 || x >= rowCount || y >= colCount) {
      continue;
    }
    const entry = input[x][y];
    if (entry === "." || isDigit(entry)) {
      continue;
    }
    return true;
  }
  return false;
};

const stringLocation = (x: number, y: number) => {
  return `${x},${y}`;
};

const gearNearby = (input: string[], rowIndex: number, colIndex: number) => {
  const rowCount = input.length;
  const colCount = input[0].length;

  for (let move of directions) {
    const x = rowIndex + move[0];
    const y = colIndex + move[1];
    if (x < 0 || y < 0 || x >= rowCount || y >= colCount) {
      continue;
    }
    const entry = input[x][y];
    if (entry === "*") {
      return stringLocation(x, y);
    }
  }
  return null;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rowCount = input.length;
  const colCount = input[0].length;
  const availableNumbers = [];
  let currentNumber = [];

  let foundSymbol = false;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let colIndex = 0; colIndex < colCount; colIndex++) {
      const entry = input[rowIndex][colIndex];
      if (isDigit(entry)) {
        currentNumber.push(entry);
        foundSymbol ||= symbolNearby(input, rowIndex, colIndex);
      } else {
        if (currentNumber.length && foundSymbol) {
          availableNumbers.push(parseInt(currentNumber.join("")));
        }
        foundSymbol = false;
        currentNumber = [];
      }
    }
  }

  return availableNumbers.reduce((sum, num) => sum + num, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rowCount = input.length;
  const colCount = input[0].length;
  const availableNumbers = [];
  let currentNumber = [];
  const gears: any = {};

  let gearLocation = null;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let colIndex = 0; colIndex < colCount; colIndex++) {
      const entry = input[rowIndex][colIndex];
      if (isDigit(entry)) {
        currentNumber.push(entry);
        gearLocation ||= gearNearby(input, rowIndex, colIndex);
      } else {
        if (currentNumber.length && gearLocation) {
          const currentGear = parseInt(currentNumber.join(""));
          const previousGear = gears[gearLocation];
          if (previousGear) {
            availableNumbers.push(currentGear * previousGear);
          } else {
            gears[gearLocation] = currentGear;
          }
        }
        gearLocation = null;
        currentNumber = [];
      }
    }
  }

  return availableNumbers.reduce((sum, num) => sum + num, 0);
};

run({
  part1: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
      },
      {
        input: `
.2.6.
...*.`,
        expected: 6,
      },
      {
        input: `.........232.633.......................803..........................361................192............539.................973.221...340.....
.............*..............#.....256.#.........329....................*313............*.......766.......*..........472..-...........+..249.`,
        expected: 4154,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
