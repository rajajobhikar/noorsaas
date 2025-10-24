"use client";
import { UserProvider, SessionUser } from "@/context/UserContext";

export default function SessionProvider({
  user,
  children,
}: {
  user: SessionUser | null;
  children: React.ReactNode;
}) {
  return <UserProvider initialUser={user}>{children}</UserProvider>;
}
