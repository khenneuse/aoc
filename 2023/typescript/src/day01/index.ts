import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const isDigit = (char: string) => {
  return /\d/.test(char);
};

const stringNumber = (remainder: string): string | null => {
  if (remainder.startsWith("one")) {
    return "1";
  }
  if (remainder.startsWith("two")) {
    return "2";
  }
  if (remainder.startsWith("three")) {
    return "3";
  }
  if (remainder.startsWith("four")) {
    return "4";
  }
  if (remainder.startsWith("five")) {
    return "5";
  }
  if (remainder.startsWith("six")) {
    return "6";
  }
  if (remainder.startsWith("seven")) {
    return "7";
  }
  if (remainder.startsWith("eight")) {
    return "8";
  }
  if (remainder.startsWith("nine")) {
    return "9";
  }

  return null;
};

const getStringNumberFromInput = (line: string): string => {
  const array: string[] = [];
  let index = 0;
  while (index < line.length) {
    const char = line.at(index);
    if (char && isDigit(char)) {
      array.push(char);
    } else {
      const stringAsNumber = stringNumber(line.slice(index));
      if (stringAsNumber) {
        array.push(stringAsNumber);
      }
    }
    index += 1;
  }
  return array.toString();
};

const getNumber = (line: string): number => {
  const onlyNumbers = getStringNumberFromInput(line);

  const first = onlyNumbers.at(0) || "";
  const last = onlyNumbers.at(-1) || "";

  const asString = first + last;
  return parseInt(asString);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.map(getNumber).reduce((sum, entry) => {
    return sum + entry;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.map(getNumber).reduce((sum, entry) => {
    return sum + entry;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
