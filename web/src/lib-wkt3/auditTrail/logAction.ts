export type Log = {
  id: string;
  userId: string;
  action: string;
  timestamp: number;
};

export const logs: Log[] = [];

export function logAction(userId: string, action: string): void {
  logs.push({ id: `log-${Date.now()}`, userId, action, timestamp: Date.now() });
}