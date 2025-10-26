export function VerifiedBadge({ trustScore }: { trustScore: number }) {
  if (trustScore >= 90)
    return <span className="text-green-600">✅ Verified Mentor</span>;
  if (trustScore >= 70)
    return <span className="text-blue-600">🌀 Girl Going College</span>;
  if (trustScore >= 40)
    return <span className="text-yellow-600">🌱 Fair Trainee</span>;
  return <span className="text-gray-400">🧪 Under Evaluation</span>;
}
