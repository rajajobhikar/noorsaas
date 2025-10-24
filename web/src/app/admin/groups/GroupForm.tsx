'use client';
import { useState } from 'react';
import { createGroup, getGroups } from '@/lib-wkt3/groupManager/createGroup';

export default function GroupForm() {
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState(getGroups());

  const handleCreate = () => {
    const newGroup = createGroup(groupName, 'admin-123');
    setGroups([...groups, newGroup]);
    setGroupName('');
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
        placeholder="Group name"
        className="border p-2 rounded w-full"
      />
      <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Group
      </button>
      <ul className="mt-4 space-y-2">
        {groups.map(group => (
          <li key={group.id} className="text-sm">
            {group.name} (Players: {group.players.length})
          </li>
        ))}
      </ul>
    </div>
  );
}