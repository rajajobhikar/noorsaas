type FlairEvent = {
  flair: string;
  timestamp: string;
  reason?: string;
};

export function FlairTimeline({ history }: { history: FlairEvent[] }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Flair Evolution</h2>
      <ul className="text-sm text-gray-700 space-y-1">
        {history.map((event, i) => (
          <li key={i}>
            <span className="font-medium">{event.flair}</span> —{" "}
            {new Date(event.timestamp).toLocaleString()}
            {event.reason && (
              <span className="text-gray-500"> ({event.reason})</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
