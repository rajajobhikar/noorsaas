const ipMap: Record<string, string> = {}; // userId → IP

export function detectIPConflict(userId: string, ip: string): boolean {
  for (const [uid, storedIP] of Object.entries(ipMap)) {
    if (uid !== userId && storedIP === ip) return true;
  }
  ipMap[userId] = ip;
  return false;
}
