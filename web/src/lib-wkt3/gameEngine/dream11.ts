// lib-wkt3/gameEngine/dream11.ts

type Player = {
  id: string;
  name: string;
  runs: number;
};

type Team = {
  id: string;
  name: string;
  players: Player[];
  totalRuns: number;
};

const teams: Record<string, Team> = {};

export function createDream11Team(name: string, players: Player[]): Team {
  const id = `dream11-${Date.now()}`;
  const team: Team = {
    id,
    name,
    players,
    totalRuns: 0,
  };
  teams[id] = team;
  return team;
}

export function simulateMatch(
  teamId: string,
  playerId: string,
  runs: number
): void {
  const team = teams[teamId];
  if (!team) return;

  const player = team.players.find((p) => p.id === playerId);
  if (!player) return;

  player.runs += runs;
  team.totalRuns += runs;
}
