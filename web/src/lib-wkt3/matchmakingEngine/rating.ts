type PlayerRating = Record<string, number>; // e.g., { u1: 1200 }

export const ratings: PlayerRating = {
  u1: 1200,
  u2: 1350,
  u3: 1100,
};

export function getRating(userId: string): number {
  return ratings[userId] || 1000;
}

export function updateRating(userId: string, delta: number): void {
  ratings[userId] = getRating(userId) + delta;
}
