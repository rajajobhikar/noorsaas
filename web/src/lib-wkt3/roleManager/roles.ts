export type Role = 'SUPERADMIN' | 'ADMIN' | 'MODERATOR' | 'USER';

export const roleHierarchy: Record<Role, number> = {
  SUPERADMIN: 4,
  ADMIN: 3,
  MODERATOR: 2,
  USER: 1,
};

export function canAccess(requester: Role, required: Role): boolean {
  return roleHierarchy[requester] >= roleHierarchy[required];
}