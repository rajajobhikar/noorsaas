import SuperadminGuard from "@/components/SuperadminGuard";
import AuditMirror from "@/modules/superadmin/AuditMirror";

export default function Page() {
  return (
    <SuperadminGuard>
      <AuditMirror />
    </SuperadminGuard>
  );
}
