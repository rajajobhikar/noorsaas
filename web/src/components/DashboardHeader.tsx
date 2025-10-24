import FairnessBadge from "@/components/FairnessBadge";
import { User } from "@/types/User";

export default function DashboardHeader({ user }: { user: User }) {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Welcome, {user.name}
      </h2>
      <h3 className="text-sm text-[#999] mb-1">🌟 Your Trust Badge</h3>

      {/* ✅ Fairness badge mount */}
      <FairnessBadge fairness={user.fairness} />
    </div>
  );
}
