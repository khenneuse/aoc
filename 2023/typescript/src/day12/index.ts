import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((s) => {
    const [spas, damages] = s.trim().split(" ");
    return { spas, damages };
  });

const sum = (arr: number[]): number => {
  return arr.reduce((acc, curr) => acc + curr, 0);
};

const determineDamage = (damage: string): string => {
  let damageCount = 0;

  const damages = [];
  for (let index = 0; index < damage.length; index++) {
    if (damage[index] === "#") {
      damageCount++;
    } else {
      damages.push(damageCount);
      damageCount = 0;
    }
  }
  damages.push(damageCount);

  return damages.filter((e) => e > 0).join(",");
};

const makeDamagePossibilities = (
  input: string,
): { spas: string[]; damages: string[] } => {
  if (input.indexOf("?") === -1) {
    return { spas: [input], damages: [determineDamage(input)] };
  }

  const working = makeDamagePossibilities(input.replace("?", "."));
  const broken = makeDamagePossibilities(input.replace("?", "#"));

  return {
    spas: [...working.spas, ...broken.spas],
    damages: [...working.damages, ...broken.damages],
  };
};

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput);

  const counts = rows.map((row) => {
    const currentRow = makeDamagePossibilities(row.spas);
    // console.log(currentRow);
    let arrangementSet = new Set();
    for (let index = 0; index < currentRow.damages.length; index++) {
      if (currentRow.damages[index] === row.damages) {
        arrangementSet.add(currentRow.spas[index]);
      }
    }
    return arrangementSet.size;
  });

  console.log(counts);
  return sum(counts);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: `.??..??...?##. 1,1,3`,
      //   expected: 1,
      // },
      {
        input: `???.### 1,1,3
        .??..??...?##. 1,1,3
        ?#?#?#?#?#?#?#? 1,3,1,6
        ????.#...#... 4,1,1
        ????.######..#####. 1,6,5
        ?###???????? 3,2,1`,
        expected: 21,
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
