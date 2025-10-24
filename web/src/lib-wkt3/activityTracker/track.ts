type ActivityLog = {
  userId: string;
  route: string;
  enteredAt: number;
  exitedAt?: number;
};

const logs: ActivityLog[] = [];

export function enterRoute(userId: string, route: string) {
  logs.push({ userId, route, enteredAt: Date.now() });
}

export function exitRoute(userId: string, route: string) {
  const log = logs.find(l => l.userId === userId && l.route === route && !l.exitedAt);
  if (log) log.exitedAt = Date.now();
}

export function getLogs() {
  return logs.map(log => ({
    ...log,
    duration: log.exitedAt ? log.exitedAt - log.enteredAt : null,
  }));
}