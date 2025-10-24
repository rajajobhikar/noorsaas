import { FairnessData } from "@/types/fairness";

export default function FairnessBadge({ fairness }: { fairness: FairnessData }) {
  return (
    <div className="flex gap-2 mt-2 text-sm text-gray-700">
      {fairness.verified && <span>✅ Verified</span>}
      {fairness.cleanRecord && <span>🛡️ Clean Record</span>}
      <span>🎯 {fairness.skillLevel}</span>
      <span>
        📅 Active since {new Date(fairness.activeSince).getFullYear()}
      </span>
    </div>
  );
}
