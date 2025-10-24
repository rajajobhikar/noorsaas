import AnalyticsPanel from "./analytics/page";
import AuditPanel from "./auditpanel/page";
import GameControlPanel from "./gamecontrolpanel/page";
import UserControlPanel from "./usercontrolpanel/page.old";
import AdControlPanel from "./adcontrolpanel/page";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Superadmin Dashboard</h1>
      <AnalyticsPanel />
      <AuditPanel />
      <GameControlPanel />
      <UserControlPanel />
      <AdControlPanel />
    </div>
  );
}
