// lib-wkt3/authEngine/signup.ts
import { hashPassword } from "@/lib-wkt3/passwordHasher/hash";
import { users } from "./userStore";

export function LoginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): string | null {
  const exists = users.find((u) => u.email === email);
  if (exists) return null;

  const hashed = hashPassword(password);
  const id = `u${users.length + 1}`;
  users.push({ id, email, password: hashed });
  return id;
}
