'use client';
import { useEffect, useState } from 'react';
import { fetchLiveMatches } from './api';

type Match = {
  seriesName: string;
  matchInfo: string;
  // Add other properties if needed
};

export default function LiveMatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetchLiveMatches().then(setMatches);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Live Matches</h1>
      <ul className="mt-4 space-y-2">
        {matches.map((match: Match, i) => (
          <li key={i} className="border p-2 rounded">
            <p>{match.seriesName}</p>
            <p>{match.matchInfo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}