const otpMap = new Map<string, { code: string; expires: number }>();

export function setOTP(mobile: string): string {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpMap.set(mobile, { code, expires: Date.now() + 3 * 60 * 1000 }); // 3 min expiry
  return code;
}

export function verifyOTP(mobile: string, input: string): boolean {
  const entry = otpMap.get(mobile);
  if (!entry || Date.now() > entry.expires) return false;
  const valid = entry.code === input;
  otpMap.delete(mobile);
  return valid;
}
