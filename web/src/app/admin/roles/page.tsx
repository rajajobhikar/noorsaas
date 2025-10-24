'use client';
import { useState } from 'react';
import { Role, canAccess } from '@/lib-wkt3/roleManager/roles';

export default function RolePage() {
  const [currentRole, setCurrentRole] = useState<Role>('ADMIN');

  const handleRoleChange = (role: Role) => {
    setCurrentRole(role);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Role Access Test</h1>
      <div className="mt-4">
        <label className="block mb-2">Select Role:</label>
        <select
          value={currentRole}
          onChange={(e) => handleRoleChange(e.target.value as Role)}
          className="border p-2 rounded"
        >
          <option value="USER">User</option>
          <option value="MODERATOR">Moderator</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPERADMIN">Super Admin</option>
        </select>
      </div>
      <p className="mt-4">Current Role: {currentRole}</p>
      <p>Can access MODERATOR features: {canAccess(currentRole, 'MODERATOR') ? '✅ Yes' : '❌ No'}</p>
    </div>
  );
}