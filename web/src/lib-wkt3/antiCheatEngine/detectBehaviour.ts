type BehaviorLog = { userId: string; actions: string[] };

const logs: BehaviorLog[] = [];

export function logBehavior(userId: string, action: string): void {
  const log = logs.find((l) => l.userId === userId);
  if (log) log.actions.push(action);
  else logs.push({ userId, actions: [action] });
}

export function detectSuspicious(userId: string): boolean {
  const log = logs.find((l) => l.userId === userId);
  if (!log) return false;
  const spammy = log.actions.filter((a) => a === "bet-max").length;
  return spammy > 5;
}
