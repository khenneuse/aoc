import run from "aocrunner";

interface Hand {
  hand: string;
  bid: number;
  type?: string;
}

interface Buckets {
  five: Hand[];
  four: Hand[];
  full: Hand[];
  three: Hand[];
  twoPair: Hand[];
  pair: Hand[];
  highCard: Hand[];
}

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
      return 11;
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

const fiveOfAKind = (keys: string[]) => {
  return keys.length === 1;
};

const fourOfAKind = (keys: string[], counts: Record<string, number>) => {
  if (keys.length !== 2) {
    return false;
  }
  for (let key of keys) {
    if (counts[key] === 4) {
      return true;
    }
  }
  return false;
};

const fullHouse = (keys: string[]) => {
  return keys.length === 2;
};

const threeOfAKind = (keys: string[], counts: Record<string, number>) => {
  if (keys.length !== 3) {
    return false;
  }
  for (let key of keys) {
    if (counts[key] === 3) {
      return true;
    }
  }
  return false;
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
  return pairCount === 2;
};

const onePair = (keys: string[], counts: Record<string, number>) => {
  if (keys.length !== 4) {
    return false;
  }
  for (let key of keys) {
    if (counts[key] === 2) {
      return true;
    }
  }
  return false;
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
  const rounds = getHands(input);
  const buckets = rounds.reduce(
    (acc, round) => {
      const cardCounts = countCards(round.hand);
      const keys = Object.keys(cardCounts);
      console.log({ round, cardCounts });

      if (fiveOfAKind(keys)) {
        acc.five.push({ ...round, type: "five" });
      } else if (fourOfAKind(keys, cardCounts)) {
        acc.four.push({ ...round, type: "four" });
      } else if (fullHouse(keys)) {
        acc.full.push({ ...round, type: "full" });
      } else if (threeOfAKind(keys, cardCounts)) {
        acc.three.push({ ...round, type: "three" });
      } else if (twoPair(keys, cardCounts)) {
        acc.twoPair.push({ ...round, type: "two" });
      } else if (onePair(keys, cardCounts)) {
        acc.pair.push({ ...round, type: "pair" });
      } else {
        acc.highCard.push({ ...round, type: "high" });
      }
      return acc;
    },
    {
      five: [],
      four: [],
      full: [],
      three: [],
      twoPair: [],
      pair: [],
      highCard: [],
    } as Buckets,
  );
  const rankedRounds = rankRounds(buckets);
  return rankedRounds.reduce((acc, hand, index) => {
    const score = hand.bid * (index + 1);
    return acc + score;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
