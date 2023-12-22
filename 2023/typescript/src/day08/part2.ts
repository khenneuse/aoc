import { Node } from "./types";

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
