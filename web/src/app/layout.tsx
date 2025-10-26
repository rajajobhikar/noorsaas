import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import LanguageInitializer from "@/components/LanguageInitializer";
import { getSessionUser } from "@/lib/session/getSession";
import SessionProvider from "@/components/SessionProvider";


export const metadata: Metadata = {
  title: "wkt3",
  description: "A SaaS product to manage your subscriptions and invoices.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  return (
    <html lang="en" suppressHydrationWarning={true} data-qb-installed="true">
      <body>
        {/* {user && (
          <div className="bg-gray-100 p-2 text-sm text-right">
            Logged in as <strong>{user.email}</strong> ({user.role})
          </div>
        )} */}

        <LanguageInitializer />

        {/* ✅ Inject user into client layout */}
        <SessionProvider user={user}>
          <ClientLayout>{children}</ClientLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
