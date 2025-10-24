"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Overview", href: "/admin/dashboard/overview", icon: "📊" },
  { label: "Users", href: "/admin/dashboard/usercontrolpanel", icon: "👥" },
  { label: "Games", href: "/admin/dashboard/gamecontrolpanel", icon: "🎮" },
  { label: "Moderators", href: "/admin/dashboard/modpanel", icon: "🛡️" },
  { label: "Analytics", href: "/admin/dashboard/analytics", icon: "📈" },
  { label: "Audit Logs", href: "/admin/dashboard/auditpanel", icon: "🕵️" },
  {
    label: "Notifications",
    href: "/admin/dashboard/notifications",
    icon: "🔔",
  },
  { label: "Feedback", href: "/admin/dashboard/feedbackpanel", icon: "💬" },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-full sm:w-64 bg-gradient-to-b from-pink-50 to-blue-50 p-4 shadow-lg rounded-r-xl">
      <div className="mb-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
          A
        </div>
        <p className="mt-2 font-semibold text-lg text-gray-800">Admin Panel</p>
        <p className="text-sm text-gray-500">
          College-ready, platform steady 💁‍♀️
        </p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = path === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-pink-100 hover:text-purple-700"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-6">
        <button
          onClick={() => {
            localStorage.removeItem("wkt3-session");
            window.location.href = "/login";
          }}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
