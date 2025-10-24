export function generateSerial(): string {
  const device = navigator.userAgent.replace(/\s+/g, "").slice(0, 10);
  const timestamp = Date.now();
  return `WKT3-${device}-${timestamp}`;
}
