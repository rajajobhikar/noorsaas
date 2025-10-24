type PokerTable = {
  id: string;
  name: string;
  pot: number;
  players: string[];
  bets: { playerId: string; amount: number }[];
};

const pokerTables: Record<string, PokerTable> = {};

export function createTable(name: string, players: string[]): PokerTable {
  const id = `poker-${Date.now()}`;
  const table: PokerTable = {
    id,
    name,
    pot: 0,
    players,
    bets: [],
  };
  pokerTables[id] = table;
  return table;
}

export function dealHand(tableId: string): void {
  const table = pokerTables[tableId];
  if (!table) return;
  // Simulate dealing cards (no-op for now)
  // In a real implementation, this would initialize the game state
}

export function placeBet(
  tableId: string,
  playerId: string,
  amount: number
): void {
  const table = pokerTables[tableId];
  if (!table) return;
  table.bets.push({ playerId, amount });
  table.pot += amount;
}
