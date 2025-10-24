import { Session } from "@/types/Session";
import FairnessBadge from "@/components/FairnessBadge";

export default function AuditMirror({ session }: { session: Session }) {
  return (
    <div className="p-4 bg-white rounded-md border border-gray-200 space-y-2">
      <h3 className="text-lg font-semibold text-gray-800">🔍 Session Audit</h3>

      <p>
        <strong>📧 Email:</strong> {session.email}
      </p>
      <p>
        <strong>🔐 Provider:</strong> {session.provider}
      </p>
      <p>
        <strong>🧠 IP:</strong> {session.audit.ip}
      </p>
      <p>
        <strong>📱 Device:</strong> {session.audit.device}
      </p>
      <p>
        <strong>🌐 Language:</strong> {session.audit.language}
      </p>

      {/* ✅ Fairness badge */}
      {session.fairness && <FairnessBadge fairness={session.fairness} />}
    </div>
  );
}
