import AuditList from "./AuditList"; // ✅ Reuse here

export default function SuperadminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🧠 Superadmin Dashboard</h1>
      <AuditList /> {/* ✅ Embedded inside dashboard */}
    </div>
  );
}
