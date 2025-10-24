import { Group, Player } from './types';

export function assignPlayerToGroup(
  groups: Group[], // added groups parameter
  groupId: string,
  player: Player
): boolean {
  const group = groups.find(g => g.id === groupId);
  if (!group) return false;
  group.players.push(player);
  return true;
}