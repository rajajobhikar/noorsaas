type Player = { id: string; name: string; raids: number; points: number };
type Team = { id: string; name: string; players: Player[]; totalPoints: number };

const teams: Team[] = [];

export function createKabaddiTeam(name: string, players: Player[]): Team {
  const totalPoints = players.reduce((sum, p) => sum + p.points, 0);
  const team = { id: `kabaddi-${Date.now()}`, name, players, totalPoints };
  teams.push(team);
  return team;
}

export function recordRaid(teamId: string, playerId: string, success: boolean): boolean {
  const team = teams.find(t => t.id === teamId);
  const player = team?.players.find(p => p.id === playerId);
  if (!team || !player) return false;

  player.raids += 1;
  if (success) {
    player.points += 1;
    team.totalPoints += 1;
  }
  return true;
}