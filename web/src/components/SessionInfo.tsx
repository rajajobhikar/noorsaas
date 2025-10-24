import { Session } from "@/types/Session";

export default function SessionInfo({ session }: { session: Session }) {
  return (
    <div>
      <p>🔐 Provider: {session.provider}</p>
      <p>📅 Created: {new Date(session.createdAt).toLocaleString()}</p>
      <p>🧠 IP: {session.audit.ip}</p>
    </div>
  );
}
