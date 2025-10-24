import { registerSchema } from '@/lib-wkt3/zodValidator/userSchema';
import { hashPassword } from '@/lib-wkt3/passwordHasher/hash';

type User = { id: string; name: string; email: string; password: string };
const users: User[] = [];

export function registerUser(data: unknown): User | null {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) return null;

  const { name, email, password } = parsed.data;
  const hashed = hashPassword(password);
  const newUser = { id: `u-${Date.now()}`, name, email, password: hashed };
  users.push(newUser);
  return newUser;
}