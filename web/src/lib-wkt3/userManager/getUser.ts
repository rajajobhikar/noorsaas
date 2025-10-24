type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  apiKey?: string;
  language?: string;
  currency?: string;
  twoFA?: boolean;
};

const users: User[] = [
  { id: 'u1', name: 'Amit', email: 'amit@example.com', password: 'hashed' },
];

export function getUser(id: string): User | null {
  return users.find(u => u.id === id) || null;
}