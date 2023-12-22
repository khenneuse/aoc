import run from "aocrunner";

import { Node } from "./types";
import { runPart1 } from "./part1";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((s) => s.trim());

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return runPart1(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
