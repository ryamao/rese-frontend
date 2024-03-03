import { useContext } from "react";

import { Outlet, useLoaderData } from "react-router-dom";

import { GetAuthStatusResult } from "../Client";
import { AuthContext } from "../providers/AuthContextProvider";

export function UseAuthStatus() {
  const authStatus = useLoaderData() as GetAuthStatusResult;
  const authContext = useContext(AuthContext);

  if (authContext.authStatus === null) {
    switch (authStatus.status) {
      case "guest":
        authContext.setGuest();
        break;
      case "customer":
        authContext.setCustomer(authStatus.id);
        break;
    }
  }

  return <Outlet />;
}
