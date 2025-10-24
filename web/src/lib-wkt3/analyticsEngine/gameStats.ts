type Game = 'Dream11' | 'Poker' | 'Teen Patti' | 'Kabaddi';

type GameParticipation = {
  game: Game;
  userId: string;
};

const participations: GameParticipation[] = [
  { game: 'Poker', userId: 'u1' },
  { game: 'Dream11', userId: 'u2' },
  { game: 'Poker', userId: 'u2' },
];

export function getGameStats() {
  const stats: Record<Game, number> = {
    Dream11: 0,
    Poker: 0,
    'Teen Patti': 0,
    Kabaddi: 0,
  };
  participations.forEach(p => {
    stats[p.game]++;
  });
  return stats;
}