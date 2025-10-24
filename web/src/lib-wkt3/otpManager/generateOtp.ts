type OTPRecord = {
  email: string;
  otp: string;
  expiresAt: number;
};

const otpStore: OTPRecord[] = [];

export function generateOtp(email: string): string {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore.push({ email, otp, expiresAt });
  return otp;
}

export function getOtp(email: string): OTPRecord | undefined {
  return otpStore.find(o => o.email === email && o.expiresAt > Date.now());
}