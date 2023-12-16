import run from "aocrunner";

interface Transform {
  destinationStart: number;
  sourceStart: number;
  range: number;
}
const parseInput = (rawInput: string) => rawInput.split("\n");

const startsWithDigit = /^\d/;

const applyUpdate1 = (
  entry: number,
  {
    destinationStart,
    sourceStart,
    range,
  }: { destinationStart: number; sourceStart: number; range: number },
) => {
  if (entry < sourceStart || entry > sourceStart + range) {
    return null;
  }
  return entry - sourceStart + destinationStart;
};

const applyTransforms = (
  entry: { start: number; end: number },
  transforms: Transform[],
) => {
  const results: { start: number; end: number }[] = [];
  let { start, end } = entry;
  for (let transform of transforms) {
    const { destinationStart, sourceStart, range } = transform;
    const rangeStart = sourceStart;
    const rangeEnd = sourceStart + range;
    const offset = destinationStart - sourceStart;
    if (end < rangeStart || start > rangeEnd) {
      console.log("out of range");
      continue;
    }
    if (start >= rangeStart && end <= rangeEnd) {
      console.log("in range complete");
      results.push({
        start: start + offset,
        end: end + offset,
      });
    } else if (end > rangeStart) {
      console.log("upper portion");
      results.push({
        start: destinationStart,
        end: end + offset,
      });
    } else if (start < rangeEnd) {
      console.log("lower portion");
      results.push({
        start: start + offset,
        end: rangeEnd + offset,
      });
    }
  }

  if (!results.length) {
    results.push(entry);
  }

  return results;
};

const parseSection1 = (
  input: string[],
  startIndex: number,
  seeds: number[],
) => {
  let index = startIndex;
  // console.log(input[index++]);

  let currentLine = input[index];
  const transforms: Transform[] = [];
  do {
    const rawNumbers = currentLine.split(/\s+/).map((str) => str.trim());
    const [destinationStart, sourceStart, range] = rawNumbers.map(Number);
    transforms.push({ destinationStart, sourceStart, range });
    currentLine = input[++index];
  } while (startsWithDigit.test(currentLine));

  for (let seedIndex = 0; seedIndex < seeds.length; seedIndex++) {
    for (let transform of transforms) {
      const update = applyUpdate1(seeds[seedIndex], transform);
      if (update) {
        seeds[seedIndex] = update;
        break;
      }
    }
  }

  return { index: index + 1, seeds };
};

const parseSection2 = (
  input: string[],
  startIndex: number,
  seeds: { start: number; end: number }[],
) => {
  let index = startIndex;
  const mapName = input[index++];
  let currentLine = input[index];
  const transforms: Transform[] = [];
  do {
    const rawNumbers = currentLine.split(/\s+/).map((str) => str.trim());
    const [destinationStart, sourceStart, range] = rawNumbers.map(Number);
    transforms.push({ destinationStart, sourceStart, range });
    currentLine = input[++index];
  } while (startsWithDigit.test(currentLine));

  console.log(`starting ${mapName}`);
  const results: { start: number; end: number }[] = [];
  console.log("transforms", transforms);
  for (let seedIndex = 0; seedIndex < seeds.length; seedIndex++) {
    const transformResponse = applyTransforms(seeds[seedIndex], transforms);
    results.push(...transformResponse);
  }

  console.log(`after ${mapName}\n`, results);
  return { index: index + 1, seeds: results };
};

const parseSeeds = (line: string) => {
  const [, seedNumbers] = line.split(":");
  return seedNumbers
    .trim()
    .split(/\s+/)
    .map((num) => Number(num));
};

const parseSeeds2 = (line: string) => {
  const [, seedNumbers] = line.split(":");
  const seedRanges = seedNumbers
    .trim()
    .split(/\s+/)
    .map((num) => Number(num));

  const seeds = [];
  for (let index = 0; index < seedRanges.length; ) {
    const start = seedRanges[index++];
    const range = seedRanges[index++];

    seeds.push({ start, end: start + range });
  }
  return seeds;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let seeds = parseSeeds(input[0]);
  let index = 2;
  while (index < input.length) {
    ({ seeds, index } = parseSection1(input, index, seeds));
  }

  return Math.min(...seeds);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let seeds = parseSeeds2(input[0]);
  console.log(seeds);
  let index = 2;
  while (index < input.length) {
    ({ seeds, index } = parseSection2(input, index, seeds));
  }

  const locations = seeds.map((seed) => seed.start);
  return Math.min(...locations);
};

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`,
        expected: 35,
      },
      {
        input: `seeds: 14

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`,
        expected: 43,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      //       {
      //         input: `seeds: 79 14 55 13

      // seed-to-soil map:
      // 50 98 2
      // 52 50 48

      // soil-to-fertilizer map:
      // 0 15 37
      // 37 52 2
      // 39 0 15

      // fertilizer-to-water map:
      // 49 53 8
      // 0 11 42
      // 42 0 7
      // 57 7 4

      // water-to-light map:
      // 88 18 7
      // 18 25 70

      // light-to-temperature map:
      // 45 77 23
      // 81 45 19
      // 68 64 13

      // temperature-to-humidity map:
      // 0 69 1
      // 1 0 69

      // humidity-to-location map:
      // 60 56 37
      // 56 93 4
      // `,
      //         expected: 46,
      //       },
      {
        input: `seeds: 76 1

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
