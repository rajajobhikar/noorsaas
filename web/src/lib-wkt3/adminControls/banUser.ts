const bannedUsers: Set<string> = new Set();

export function banUser(userId: string): void {
  bannedUsers.add(userId);
}

export function unbanUser(userId: string): void {
  bannedUsers.delete(userId);
}

export function isBanned(userId: string): boolean {
  return bannedUsers.has(userId);
}
