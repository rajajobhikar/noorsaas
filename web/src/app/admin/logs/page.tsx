'use client';
import { useEffect } from 'react';
import { enterRoute, exitRoute, getLogs } from '@/lib-wkt3/activityTracker/track';

export default function LogsPage() {
  useEffect(() => {
    const userId = 'user-123';
    enterRoute(userId, '/admin/logs');
    return () => exitRoute(userId, '/admin/logs');
  }, []);

  const logs = getLogs();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Activity Logs</h1>
      <ul className="mt-4 space-y-2">
        {logs.map((log, i) => (
          <li key={i} className="text-sm">
            {log.userId} visited {log.route} for {log.duration ? `${log.duration / 1000}s` : '...'}
          </li>
        ))}
      </ul>
    </div>
  );
}