import run from "aocrunner";
import { Hand, Buckets } from "./types";
import { runPart2 } from "./part2";
import { runPart1 } from "./part1";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((s) => s.trim());

const getHands = (input: string[]): Hand[] => {
  return input.map((line) => {
    const entries = line.split(" ");
    return {
      hand: entries[0],
      bid: Number(entries[1]),
    };
  });
};

const scoreCard = (card: string) => {
  switch (card) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 1;
    case "T":
      return 10;
    default:
      return Number(card);
  }
};

const sortByStrength = (a: Hand, b: Hand) => {
  const aCards = a.hand.split("");
  const bCards = b.hand.split("");
  for (let index = 0; index < 5; index++) {
    const aScore = scoreCard(aCards[index]);
    const bScore = scoreCard(bCards[index]);
    if (aScore != bScore) {
      return aScore - bScore;
    }
  }
  return 0;
};

const countCards = (hand: string) => {
  return hand.split("").reduce((counts, card) => {
    counts[card] = counts[card] ? counts[card] + 1 : 1;
    return counts;
  }, {} as Record<string, number>);
};

const fiveOfAKind = (mostCard: string, counts: Record<string, number>) => {
  if (counts[mostCard] === 5) {
    return true;
  }
  const hasWildCards = counts["J"];

  if (hasWildCards) {
    return hasWildCards + counts[mostCard] === 5;
  }
  return false;
};

const fourOfAKind = (mostCard: string, counts: Record<string, number>) => {
  if (counts[mostCard] === 4) {
    return true;
  }
  const hasWildCards = counts["J"];
  // console.log({ mostCard, counts, hasWildCards });
  if (hasWildCards) {
    return hasWildCards + counts[mostCard] === 4;
  }
  return false;
};

const fullHouse = (keys: string[], counts: Record<string, number>) => {
  if (keys.length === 2) {
    return true;
  }
  let pairCount = 0;
  for (let key of keys) {
    if (counts[key] === 2) {
      pairCount += 1;
    }
  }
  const hasWildCards = counts["J"];

  return pairCount === 2 && hasWildCards;
};

const threeOfAKind = (
  mostCard: string,
  keys: string[],
  counts: Record<string, number>,
) => {
  if (counts[mostCard] === 3) {
    return true;
  }
  const hasWildCards = counts["J"];

  if (hasWildCards === 2) {
    return true;
  }

  let pairCount = 0;
  for (let key of keys) {
    if (counts[key] === 2) {
      pairCount += 1;
    }
  }
  return pairCount && hasWildCards;
};

const twoPair = (keys: string[], counts: Record<string, number>) => {
  if (keys.length !== 3) {
    return false;
  }
  let pairCount = 0;
  for (let key of keys) {
    if (counts[key] === 2) {
      pairCount += 1;
    }
  }

  const hasWildCards = counts["J"];

  return pairCount === 2 || (pairCount && hasWildCards);
};

const onePair = (
  mostCard: string,
  keys: string[],
  counts: Record<string, number>,
) => {
  if (counts[mostCard] === 2) {
    return true;
  }
  const hasWildCards = counts["J"];

  return !!hasWildCards;
};

const findMostCards = (
  keys: string[],
  counts: Record<string, number>,
): string => {
  if (keys.length === 1) {
    return keys[0];
  }
  const startKey = keys[0] === "J" ? keys[1] : keys[0];
  return keys.reduce((max, key) => {
    if (key === "J") {
      return max;
    }
    return counts[key] > counts[max] ? key : max;
  }, startKey);
};

const rankRounds = (buckets: Buckets): Hand[] => {
  buckets.highCard.sort(sortByStrength);
  buckets.pair.sort(sortByStrength);
  buckets.twoPair.sort(sortByStrength);
  buckets.three.sort(sortByStrength);
  buckets.full.sort(sortByStrength);
  buckets.four.sort(sortByStrength);
  buckets.five.sort(sortByStrength);

  return [
    ...buckets.highCard,
    ...buckets.pair,
    ...buckets.twoPair,
    ...buckets.three,
    ...buckets.full,
    ...buckets.four,
    ...buckets.five,
  ];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return runPart1(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return runPart2(input);
};

run({
  part1: {
    tests: [
      {
        input: `32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 6440,
      },
      {
        input: `JJJJJ 10
        T55J5 2`,
        expected: 22,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `32T3K 765
        T55J5 684
        KK677 28
        KTJJT 220
        QQQJA 483`,
        expected: 5905,
      },
      {
        input: `JJJ77 174
        JJ2AA 695
        JJAA9 242`,
        expected: 1701,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
