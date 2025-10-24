import SuperadminGuard from "@/components/SuperadminGuard";
import SessionGuard from "@/modules/superadmin/SessionGuard";

export default function Page() {
  return (
    <SuperadminGuard>
      <SessionGuard />
    </SuperadminGuard>
  );
}
