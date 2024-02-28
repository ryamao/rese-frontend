import { createContext, useState } from "react";

import { GetAuthStatusResult } from "../Client";

export interface AuthContextType {
  authStatus: GetAuthStatusResult | null;
  setGuest: () => void;
  setCustomer: (id: number) => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [authStatus, setAuthStatus] = useState<GetAuthStatusResult | null>(
    null
  );

  const value = {
    authStatus,
    setGuest: () => {
      setAuthStatus({ status: "guest" });
    },
    setCustomer: (id: number) => {
      setAuthStatus({ status: "customer", id });
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
