type UserStatus = 'ONLINE' | 'OFFLINE';

export type User = {
  id: string;
  name: string;
  status: UserStatus;
  lastActive: number;
  apiKey?: string;
};

const users: User[] = [
  { id: 'u1', name: 'Amit', status: 'ONLINE', lastActive: Date.now() },
  { id: 'u2', name: 'Priya', status: 'OFFLINE', lastActive: Date.now() - 60000 },
];

export function getUserStats() {
  const total = users.length;
  const online = users.filter(u => u.status === 'ONLINE').length;
  const offline = total - online;
  return { total, online, offline };
}