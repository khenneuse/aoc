import { Buckets, Hand } from "./types";

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

export function runPart2(input: string[]): number {
  const rounds = getHands(input);
  const buckets = rounds.reduce(
    (acc, round) => {
      const cardCounts = countCards(round.hand);
      const keys = Object.keys(cardCounts);
      const mostCards = findMostCards(keys, cardCounts);

      if (fiveOfAKind(mostCards, cardCounts)) {
        acc.five.push({ ...round, type: "five" });
      } else if (fourOfAKind(mostCards, cardCounts)) {
        acc.four.push({ ...round, type: "four" });
      } else if (fullHouse(keys, cardCounts)) {
        acc.full.push({ ...round, type: "full" });
      } else if (threeOfAKind(mostCards, keys, cardCounts)) {
        acc.three.push({ ...round, type: "three" });
      } else if (twoPair(keys, cardCounts)) {
        acc.twoPair.push({ ...round, type: "two" });
      } else if (onePair(mostCards, keys, cardCounts)) {
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
  // console.log(buckets);
  const rankedRounds = rankRounds(buckets);
  rankedRounds.forEach((round) => {
    console.log(round);
  });
  return rankedRounds.reduce((acc, hand, index) => {
    const score = hand.bid * (index + 1);
    return acc + score;
  }, 0);
}
