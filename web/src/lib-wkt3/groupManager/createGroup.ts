import { Group } from './types';

const groups: Group[] = [];

export function createGroup(name: string, createdBy: string): Group {
  const newGroup: Group = {
    id: `group-${Date.now()}`,
    name,
    createdBy,
    players: [],
  };
  groups.push(newGroup);
  return newGroup;
}

export function getGroups(): Group[] {
  return groups;
}