export type Role = 'USER' | 'ADMIN' | 'SUPERADMIN';

type UserRoleMap = Record<string, Role>;
export const roleMap: UserRoleMap = {
  u1: 'SUPERADMIN',
  u2: 'ADMIN',
  u3: 'USER',
};