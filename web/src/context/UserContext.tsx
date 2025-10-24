"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type SessionUser = {
  id: string;
  email: string;
  role: string;
};

type UserContextType = {
  user: SessionUser | null;
  setUser: (user: SessionUser | null) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, initialUser }: { children: ReactNode; initialUser: SessionUser | null }) {
  const [user, setUser] = useState<SessionUser | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
