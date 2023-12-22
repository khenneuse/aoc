import { Node } from "./types";

const buildGraph = (input: string[]): Record<string, Node> => {
  const graph: Record<string, Node> = {};
  const regex = /([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/;

  for (let index = 2; index < input.length; index++) {
    const match = regex.exec(input[index]);
    if (!match) {
      throw new Error(`failed to parse ${input[index]}`);
    }
    const [, key, left, right] = match;
    graph[key] = { left, right };
  }
  return graph;
};

export function runPart1(input: string[]): number {
  const directions = input[0].split("");
  const graph = buildGraph(input);

  let steps = 0;
  let currentPosition = "AAA";
  const directionCount = directions.length;
  while (true) {
    if (currentPosition === "ZZZ") {
      return steps;
    }
    const direction = directions[steps % directionCount];
    const node = graph[currentPosition];
    currentPosition = direction === "L" ? node.left : node.right;
    steps += 1;
  }
}
