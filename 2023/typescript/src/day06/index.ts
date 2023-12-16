import run from "aocrunner";

interface RaceData {
  time: number;
  distance: number;
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((s) => s.trim());

const getTimeAndDistances1 = (input: string[]): RaceData[] => {
  const times = input[0].split(":")[1].trim().split(/\s+/).map(Number);
  const distances = input[1].split(":")[1].trim().split(/\s+/).map(Number);
  return times.map((time, index) => {
    return { time, distance: distances[index] };
  });
};

const getTimeAndDistance2 = (input: string[]): RaceData => {
  const timeRaw = input[0].split(":")[1].replace(/\s+/g, "");
  const distanceRaw = input[1].split(":")[1].replace(/\s+/g, "");
  return { time: Number(timeRaw), distance: Number(distanceRaw) };
};

const calculateRace = ({ time, distance }: RaceData) => {
  const raceResult = [];
  for (let t = 0; t < time; t++) {
    const raceDistance = (time - t) * t;
    if (raceDistance > distance) {
      raceResult.push(t);
    }
  }
  return raceResult.length;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const data = getTimeAndDistances1(input);

  const result = data.map(calculateRace);

  return result.reduce((s, v) => s * v, 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const data = getTimeAndDistance2(input);
  return calculateRace(data);
};

run({
  part1: {
    tests: [
      {
        input: `Time:      7
        Distance:  9`,
        expected: 4,
      },
      {
        input: `Time:      7  15   30
        Distance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Time:      7  15   30
        Distance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
