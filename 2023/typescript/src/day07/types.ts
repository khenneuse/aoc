export interface Hand {
  hand: string;
  bid: number;
  type?: string;
}

export interface Buckets {
  five: Hand[];
  four: Hand[];
  full: Hand[];
  three: Hand[];
  twoPair: Hand[];
  pair: Hand[];
  highCard: Hand[];
}
