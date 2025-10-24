type BetLimits = Record<string, number>; // e.g., { dream11: 1000 }

export const betLimits: BetLimits = {
  dream11: 1000,
  poker: 5000,
};

export function setBetLimit(game: string, amount: number): void {
  betLimits[game] = amount;
}
