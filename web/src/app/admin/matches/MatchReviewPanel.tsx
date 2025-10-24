"use client";
import { matchLogs } from "@/lib-wkt3/matchLogs/logMatch";
import { getReplay } from "@/lib-wkt3/matchLogs/replayAudit";

export default function MatchReviewPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Match Logs</h2>
      {matchLogs.map((match) => (
        <div key={match.matchId} className="border p-4 rounded">
          <p>
            <strong>Match ID:</strong> {match.matchId}
          </p>
          <p>
            <strong>Players:</strong> {match.players.join(", ")}
          </p>
          <p>
            <strong>Winner:</strong> {match.winner}
          </p>
          <p>
            <strong>Time:</strong> {new Date(match.timestamp).toLocaleString()}
          </p>
          <a
            href={getReplay(match.matchId) || "#"}
            target="_blank"
            className="text-blue-600 underline"
          >
            View Replay
          </a>
        </div>
      ))}
    </div>
  );
}
