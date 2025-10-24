import { getOtp } from "./generateOtp";

export function verifyOtp(email: string, inputOtp: string): boolean {
  const record = getOtp(email);
  return record?.otp === inputOtp;
}