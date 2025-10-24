import SuperadminGuard from "@/components/SuperadminGuard";
import AppListControl from "@/modules/superadmin/AppListControl";

export default function Page() {
  return (
    <SuperadminGuard>
      <AppListControl />
    </SuperadminGuard>
  );
}
