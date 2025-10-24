import { roleMap, Role } from './roles';

export function hasAccess(userId: string, required: Role): boolean {
  const role = roleMap[userId];
  const hierarchy: Role[] = ['USER', 'ADMIN', 'SUPERADMIN'];
  return hierarchy.indexOf(role) >= hierarchy.indexOf(required);
}