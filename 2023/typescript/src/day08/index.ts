import run from "aocrunner";
import { Node } from "./types";

// import { runPart1 } from "./part1";
// import { runPart2 } from "./part2";

const buildGraph = (
  input: string[],
): { graph: Record<string, Node>; starts: string[] } => {
  const graph: Record<string, Node> = {};
  const starts: string[] = [];
  const regex = /([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})\)/;
  const startRegex = /A$/;

  for (let index = 2; index < input.length; index++) {
    const match = regex.exec(input[index]);
    if (!match) {
      throw new Error(`failed to parse ${input[index]}`);
    }
    const [, key, left, right] = match;
    graph[key] = { left, right };
    if (startRegex.test(key)) {
      starts.push(key);
    }
  }
  return { graph, starts };
};

const lcm = (arr: number[]): number => {
  const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
  const _lcm = (x: number, y: number): number => (x * y) / gcd(x, y);
  return arr.reduce((a, b) => _lcm(a, b));
};

export function runPart2(input: string[]): number {
  const directions = input[0].split("");
  const { graph, starts } = buildGraph(input);
  const endRegex = /Z$/;

  const directionCount = directions.length;
  const stepCounts = starts.map((currentPosition) => {
    let steps = 0;
    while (true) {
      if (endRegex.test(currentPosition)) {
        return steps;
      }
      const direction = directions[steps % directionCount];
      const node = graph[currentPosition];
      currentPosition = direction === "L" ? node.left : node.right;
      steps += 1;
    }
  });

  return lcm(stepCounts);
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((s) => s.trim());

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // return runPart1(input);
  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return runPart2(input);
};

run({
  part1: {
    tests: [
      {
        input: `LLR

        AAA = (BBB, BBB)
        BBB = (AAA, ZZZ)
        ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR

        11A = (11B, XXX)
        11B = (XXX, 11Z)
        11Z = (11B, XXX)
        22A = (22B, XXX)
        22B = (22C, 22C)
        22C = (22Z, 22Z)
        22Z = (22B, 22B)
        XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
