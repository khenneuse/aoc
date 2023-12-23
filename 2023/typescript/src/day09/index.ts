import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((s) => s.trim());

const parseHistory = (history: string): number[] => {
  return history.split(" ").map(Number);
};

const sum = (arr: number[]): number => {
  return arr.reduce((acc, curr) => acc + curr, 0);
};

const zeroCheck = (row: number[]): boolean => {
  return row.every((num) => num === 0);
};

const findNextValue = (row: number[]): number => {
  // console.log("row", row);
  const lastEntry = row.at(-1);
  if (lastEntry == null || zeroCheck(row)) {
    return 0;
  }

  let lastValue = row[0];
  const deltas: number[] = [];
  for (let index = 1; index < row.length; index++) {
    const current = row[index];
    deltas.push(current - lastValue);
    lastValue = current;
  }
  return lastEntry + findNextValue(deltas);
};

const findPreviousValue = (row: number[]): number => {
  // console.log("row", row);
  const firstEntry = row.at(0);
  if (firstEntry == null || zeroCheck(row)) {
    return 0;
  }

  let lastValue = row[0];
  const deltas: number[] = [];
  for (let index = 1; index < row.length; index++) {
    const current = row[index];
    deltas.push(current - lastValue);
    lastValue = current;
  }

  const first = firstEntry - findPreviousValue(deltas);
  // console.log(first);
  return first;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const nextValuesInHistories = input.map((row) => {
    const history = parseHistory(row);

    return findNextValue(history);
  });
  // console.log(nextValuesInHistories);
  return sum(nextValuesInHistories);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const previousValuesInHistories = input.map((row) => {
    const history = parseHistory(row);

    return findPreviousValue(history);
  });
  // console.log(previousValuesInHistories);
  return sum(previousValuesInHistories);
};

run({
  part1: {
    tests: [
      {
        input: `0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45`,
        expected: 114,
      },
      {
        input: `7 10 23 62 147 303 562 967 1585 2545 4127 6933 12171 22103 40826 75939 142603 273520 542191 1113540 2347099
        1 6 26 67 139 256 437 720 1221 2314 5086 12343 30619 73880 169929 370916 769849 1525598 2899594 5308259 9396171
        21 27 33 40 47 50 37 -24 -207 -663 -1671 -3708 -7541 -14344 -25843 -44492 -73683 -117993 -183471 -277968 -411513
        9 14 19 24 29 34 39 44 49 54 59 64 69 74 79 84 89 94 99 104 109
        22 47 97 192 368 686 1245 2203 3807 6432 10636 17262 27671 44287 71794 119567 206268 368021 672227 1239924 2280674
        16 42 94 185 328 536 822 1199 1680 2278 3006 3877 4904 6100 7478 9051 10832 12834 15070 17553 20296
        2 6 22 72 190 419 808 1409 2274 3452 4986 6910 9246 12001 15164 18703 22562 26658 30878 35076 39070
        1 7 26 63 118 186 257 316 343 313 196 -43 -444 -1052 -1917 -3094 -4643 -6629 -9122 -12197 -15934
        28 41 54 67 80 93 106 119 132 145 158 171 184 197 210 223 236 249 262 275 288`,
        expected: 24726025,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45`,
        expected: 2,
      },
      {
        input: `10 13 16 21 30 45`,
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
