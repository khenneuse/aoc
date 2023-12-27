import run from "aocrunner";

type Direction = "north" | "south" | "east" | "west";
type Point = number[];
type Maze = string[][];

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((s) => s.trim().split(""));

const findStart = (input: Maze): Point => {
  for (let row = 0; row < input.length; row++) {
    for (let column = 0; column < input[row].length; column++) {
      if (input[row][column] === "S") {
        return [row, column];
      }
    }
  }
  return [-1, -1];
};

const isPointInsidePolygon = (point: Point, vertices: Point[]) => {
  const x = point[0];
  const y = point[1];

  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i][0],
      yi = vertices[i][1];
    const xj = vertices[j][0],
      yj = vertices[j][1];

    const intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

const firstMove = (
  pipes: Maze,
  start: Point,
): { move: Point; cameFrom: Direction } => {
  let move = [start[0] - 1, start[1]];
  let symbol = pipes[move[0]][move[1]];
  // Check North
  if (symbol === "|" || symbol === "7" || symbol === "F") {
    // console.log("Going north");

    return { move, cameFrom: "south" };
  }
  // Check East
  move = [start[0], start[1] + 1];
  symbol = pipes[move[0]][move[1]];
  if (symbol === "-" || symbol === "J" || symbol === "7") {
    // console.log("Going east");
    return { move, cameFrom: "west" };
  }
  // Check South
  move = [start[0] + 1, start[1]];
  symbol = pipes[move[0]][move[1]];
  if (symbol === "|" || symbol === "L" || symbol === "J") {
    // console.log("Going South");

    return { move, cameFrom: "north" };
  }
  // Check West
  move = [start[0], start[1] - 1];
  symbol = pipes[move[0]][move[1]];
  if (symbol === "-" || symbol === "L" || symbol === "F") {
    // console.log("Going west");

    return { move, cameFrom: "east" };
  }
  throw new Error(`No possible move from position ${start}`);
};

const getNext = (
  pipes: Maze,
  current: Point,
  cameFrom: Direction,
): { move: Point; cameFrom: Direction } => {
  let move: Point;
  const currentSymbol = pipes[current[0]][current[1]];

  if (currentSymbol === "|") {
    move = [current[0] - 1, current[1]];
    return cameFrom === "north"
      ? { move: [current[0] + 1, current[1]], cameFrom: "north" }
      : { move, cameFrom: "south" };
  }
  if (currentSymbol === "-") {
    move = [current[0], current[1] - 1];
    return cameFrom === "west"
      ? { move: [current[0], current[1] + 1], cameFrom: "west" }
      : { move, cameFrom: "east" };
  }
  if (currentSymbol === "L") {
    move = [current[0] - 1, current[1]];
    return cameFrom === "north"
      ? { move: [current[0], current[1] + 1], cameFrom: "west" }
      : { move, cameFrom: "south" };
  }
  if (currentSymbol === "J") {
    move = [current[0] - 1, current[1]];
    return cameFrom === "north"
      ? { move: [current[0], current[1] - 1], cameFrom: "east" }
      : { move, cameFrom: "south" };
  }
  if (currentSymbol === "7") {
    move = [current[0] + 1, current[1]];
    return cameFrom === "south"
      ? { move: [current[0], current[1] - 1], cameFrom: "east" }
      : { move, cameFrom: "north" };
  }
  if (currentSymbol === "F") {
    move = [current[0] + 1, current[1]];
    return cameFrom === "south"
      ? { move: [current[0], current[1] + 1], cameFrom: "west" }
      : { move, cameFrom: "north" };
  }
  throw new Error(
    `No possible move from position ${{ current, currentSymbol }}`,
  );
};

const atStart = (pipes: Maze, point: Point): boolean => {
  // console.log("atStart", point);

  return pipes[point[0]][point[1]] === "S";
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input);

  const start = findStart(input);
  // console.log("start", start);

  let stepCount = 1;
  let { move: current, cameFrom } = firstMove(input, start);
  while (!atStart(input, current)) {
    // console.log({ current, cameFrom });
    ({ move: current, cameFrom } = getNext(input, current, cameFrom));
    // console.log("currentSymbol", input[current[0]][current[1]]);

    stepCount++;
  }
  // console.log("final current", current);
  return stepCount / 2;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input);

  const start = findStart(input);
  const visited: Point[] = [[...start]];

  let stepCount = 1;
  let { move: current, cameFrom } = firstMove(input, start);
  while (!atStart(input, current)) {
    // console.log({ current, cameFrom });
    ({ move: current, cameFrom } = getNext(input, current, cameFrom));
    // console.log("currentSymbol", input[current[0]][current[1]]);

    stepCount++;
  }
  // console.log("final current", current);
  return stepCount / 2;
};

run({
  part1: {
    tests: [
      {
        input: `-L|F7
        7S-7|
        L|7||
        -L-J|
        L|-JF`,
        expected: 4,
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
