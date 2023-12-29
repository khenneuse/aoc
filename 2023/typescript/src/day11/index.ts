import run from "aocrunner";

type Point = number[];

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((s) => s.trim().split(""));

const sum = (arr: number[]): number => {
  return arr.reduce((acc, curr) => acc + curr, 0);
};

const findEmptyRows = (input: string[][]): number[] => {
  const emptyRows: number[] = [];
  for (let row = input.length - 1; row >= 0; row--) {
    if (input[row].every((c) => c === ".")) {
      emptyRows.push(row);
    }
  }
  return emptyRows;
};

const findEmptyColumns = (input: string[][]): number[] => {
  const emptyColumns: number[] = [];
  for (let column = 0; column < input[0].length; column++) {
    let allEmpty = true;
    for (let row = 0; row < input.length; row++) {
      if (input[row][column] !== ".") {
        allEmpty = false;
        break;
      }
    }
    if (allEmpty) {
      emptyColumns.push(column);
    }
  }
  return emptyColumns;
};

const countEntries = (index: number, empties: number[]) => {
  return empties.filter((n) => n < index).length;
};

const buildUniverse = (
  galaxies: Point[],
  expansion: number,
  emptyColumns: number[],
  emptyRows: number[],
): Point[] => {
  for (let index = 0; index < galaxies.length; index++) {
    let [row, column] = galaxies[index];

    const rowExpansions = countEntries(row, emptyRows);
    const columnExpansions = countEntries(column, emptyColumns);
    row = row + (rowExpansions * expansion - rowExpansions);
    column = column + (columnExpansions * expansion - columnExpansions);
    // console.log(`${galaxies[index]} => ${[row, column]}`);
    galaxies[index] = [row, column];
  }

  return galaxies;
};

const findGalaxies = (universe: string[][]): Point[] => {
  const galaxies: Point[] = [];
  for (let row = 0; row < universe.length; row++) {
    for (let column = 0; column < universe[row].length; column++) {
      if (universe[row][column] === "#") {
        galaxies.push([row, column]);
      }
    }
  }
  return galaxies;
};

const calculateDistance = (pointA: Point, pointB: Point): number => {
  return Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const galaxies = findGalaxies(input);
  // console.log("galaxies", galaxies);
  const emptyRows = findEmptyRows(input);
  const emptyColumns = findEmptyColumns(input);
  const universe = buildUniverse(galaxies, 2, emptyColumns, emptyRows);
  // console.log("universe", universe);

  const distances: number[] = [];
  for (let indexA = 0; indexA < universe.length - 1; indexA++) {
    for (let indexB = indexA + 1; indexB < universe.length; indexB++) {
      const distance = calculateDistance(universe[indexA], universe[indexB]);
      // console.log(`${universe[indexA]} to ${universe[indexB]} \t${distance}`);
      distances.push(distance);
    }
  }
  return sum(distances);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const galaxies = findGalaxies(input);
  // console.log("galaxies", galaxies);
  const emptyRows = findEmptyRows(input);
  const emptyColumns = findEmptyColumns(input);
  const universe = buildUniverse(galaxies, 1000000, emptyColumns, emptyRows);
  // console.log("universe", universe);

  const distances: number[] = [];
  for (let indexA = 0; indexA < universe.length - 1; indexA++) {
    for (let indexB = indexA + 1; indexB < universe.length; indexB++) {
      const distance = calculateDistance(universe[indexA], universe[indexB]);
      // console.log(`${universe[indexA]} to ${universe[indexB]} \t${distance}`);
      distances.push(distance);
    }
  }
  return sum(distances);
};

run({
  part1: {
    tests: [
      {
        input: `...#......
        .......#..
        #.........
        ..........
        ......#...
        .#........
        .........#
        ..........
        .......#..
        #...#.....`,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `...#......
        .......#..
        #.........
        ..........
        ......#...
        .#........
        .........#
        ..........
        .......#..
        #...#.....`,
        expected: 82000210,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
