import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((s) => s.trim().split(""));

const sum = (arr: number[]): number => {
  return arr.reduce((acc, curr) => acc + curr, 0);
};

const slideRocks = (input:string[][]): string[][] => { 
  const rowCount = input.length;
  const columnCount = input[0].length;

  for(let column = 0; column < columnCount; column++) {    
    let a = 0, b = 1;
    while (a < rowCount - 1 && b < rowCount) {
      if (input[a][column] === "O" || input[a][column] === "#") {
        a += 1;
      }
      if (input[b][column] === "#") {
        a = b + 1;
        b = a + 1;
      }
      else if (a === b || input[b][column] === '.') {
        b += 1;
      } else if (input[a][column] === "." && input[b][column] === "O") {
        input[a][column] = "O";
        input[b][column] = ".";
        a += 1;
        b += 1;
      }
    }
  }
  return input;
}

const countRocks = (line: string[]) => {
  return line.reduce((count, entry) => {
    return entry === "O" ? count + 1 : count
  }, 0);
}

const calculateLoad = (input:string[][]) => {
  const rowCount = input.length;
  return input.reduce((sum, row, index) => {
    return sum + (countRocks(row) * (rowCount - index))
  }, 0);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input.map((row) => row.join("")));
  const slid = slideRocks(input);
  const load = calculateLoad(slid);
  console.log(load);
  
  return load;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `O....#....
        O.OO#....#
        .....##...
        OO.#O....O
        .O.....O#.
        O.#..O.#.#
        ..O..#O..O
        .......O..
        #....###..
        #OO..#....`,
        expected: 136,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
