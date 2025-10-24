import { Session } from "@/types/Session";

export default function SessionInfo({ session }: { session: Session }) {
  return (
    <div className="flex flex-col gap-2 text-sm text-[#444] bg-[#f9f9ff] p-4 rounded-md border border-[#ddd]">
      <div>
        <strong>✅ Verified</strong> &nbsp; | &nbsp;
        <strong>🛡️ Clean Record</strong> &nbsp; | &nbsp;
        <strong>🎯 Pro</strong>
      </div>
      <div>
        <strong>📅 Active Since:</strong> 📅 Active since{" "}
        {new Date(session.createdAt).getFullYear()}
      </div>
      <div>
        <strong>🔐 Login Method:</strong>{" "}
        <span className="px-2 py-1 rounded bg-[#e0f7ff] text-[#0077aa] font-medium">
          {session.provider === "google" ? "Google" : "GitHub"}
        </span>
      </div>
      <div>
        <strong>🔢 Serial:</strong> {session.serial}
      </div>
    </div>
  );
}
