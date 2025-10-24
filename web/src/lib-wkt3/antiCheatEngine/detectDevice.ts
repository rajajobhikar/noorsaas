const deviceMap: Record<string, string> = {}; // userId → deviceId

export function detectDeviceConflict(
  userId: string,
  deviceId: string
): boolean {
  for (const [uid, stored] of Object.entries(deviceMap)) {
    if (uid !== userId && stored === deviceId) return true;
  }
  deviceMap[userId] = deviceId;
  return false;
}
