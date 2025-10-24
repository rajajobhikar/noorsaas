export function otpTemplate(code: string): string {
  return `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2>Your wkt3 OTP Code</h2>
      <p>Use the code below to reset your password:</p>
      <h1 style="color: #0070f3;">${code}</h1>
      <p>This code expires in 5 minutes.</p>
    </div>
  `;
}