import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const parseLine = (line: string) => {
  const gameData = /Game (\d+): (.*)$/.exec(line);
  if (!gameData) {
    return { gameNumber: 0, rounds: [] };
  }
  const gameNumber = parseInt(gameData[1]);
  const rawRounds = gameData[2].split(";");
  const rounds = rawRounds.map((round) => {
    const pulls = round.split(",");
    return pulls.reduce(
      (acc, pull) => {
        const values = /(\d+) (red|green|blue)/.exec(pull);
        if (!values) {
          throw new Error(`Error parsing pull ${pull} for ${line}`);
        }
        return { ...acc, [values[2]]: parseInt(values[1]) };
      },
      { red: 0, green: 0, blue: 0 },
    );
  });
  return { gameNumber, rounds };
};

const validGame = (line: string) => {
  const { gameNumber, rounds } = parseLine(line);
  const valid = rounds.every(
    (round: any) => round.red < 13 && round.green < 14 && round.blue < 15,
  );
  return valid ? gameNumber : 0;
};

const powerOfGame = (line: string) => {
  const { rounds } = parseLine(line);
  const power = rounds.reduce(
    (acc, round) => {
      return {
        red: Math.max(acc.red, round.red),
        green: Math.max(acc.green, round.green),
        blue: Math.max(acc.blue, round.blue),
      };
    },
    { red: 0, green: 0, blue: 0 },
  );
  return power.red * power.blue * power.green;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const gamesSum = input.map(validGame).reduce((sum, value) => {
    return sum + value;
  }, 0);
  return gamesSum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const gamesSum = input.map(powerOfGame).reduce((sum, value) => {
    return sum + value;
  }, 0);
  return gamesSum;
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
