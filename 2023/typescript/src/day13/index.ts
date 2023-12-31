import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((s) => s.trim());

const sum = (arr: number[]): number => {
  return arr.reduce((acc, curr) => acc + curr, 0);
};

const breakInputIntoPatterns = (inputRows: string[]): string[][] => {
  const patterns: string[][] = [];
  let pattern: string[] = [];
  for (let row of inputRows) {
    if (row.length !== 0) {
      pattern.push(row);
    } else {
      patterns.push([...pattern]);
      pattern = [];
    }
  }
  patterns.push([...pattern]);
  return patterns;
};

const rotatePattern = (pattern: string[]): string[] => {
  const copy: string[][] = [];
  for (var i = 0; i < pattern.length; ++i) {
    for (var j = 0; j < pattern[i].length; ++j) {
      if (copy[j] === undefined) copy[j] = [];
      copy[j][i] = pattern[i][j];
    }
  }
  return copy.map((r) => r.join(""));
};

const validMirror = (pattern: string[], start: number): boolean => {
  let backward = start;
  let forward = start + 1;
  while (backward >= 0 && forward < pattern.length) {
    if (pattern[backward] !== pattern[forward]) {
      return false;
    }
    backward -= 1;
    forward += 1;
  }
  return true;
};

const findHorizontalMirror = (pattern: string[]) => {
  for (let index = 0; index < pattern.length - 1; index += 1) {
    if (pattern[index] === pattern[index + 1] && validMirror(pattern, index)) {
      return index + 1;
    }
  }

  return 0;
};

const findVerticalMirror = (pattern: string[]) => {
  const rotated = rotatePattern(pattern);
  // console.log(rotated);

  return findHorizontalMirror(rotated);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const patterns = breakInputIntoPatterns(input);

  const counts = patterns.map((pattern) => {
    // console.log("Vertical");
    const vertical = findVerticalMirror(pattern);
    if (vertical) {
      return vertical;
    }
    // console.log("Horizontal");
    return findHorizontalMirror(pattern) * 100;
  });
  console.log(counts);
  return sum(counts);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `#.##..##.
        ..#.##.#.
        ##......#
        ##......#
        ..#.##.#.
        ..##..##.
        #.#.##.#.

        #...##..#
        #....#..#
        ..##..###
        #####.##.
        #####.##.
        ..##..###
        #....#..#`,
        expected: 405,
      },
      {
        input: `##..####..##..#
        #.##.#..##..##.
        ##..###.##..##.
        .#..#.#........
        ######.########
        ##..##...####..
        ##..###.#....#.
        .###..#.######.
        #.##.#..##..##.
        #....#..##..##.
        #....##.##..##.
        ######.##.##.##
        .####..###..###`,
        expected: 11,
      },
      {
        input: `...###....###..
        ##...#....#...#
        ..#.#.#..#.#.#.
        ...#.#.##.#.#..
        ####........###
        ....########...
        ####........###
        ####.#....#.###
        ####.######.###
        ###..........##
        ..##.##..##.##.
        ..#.#..##..#.#.
        ..#.#.####.###.
        `,
        expected: 1,
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
