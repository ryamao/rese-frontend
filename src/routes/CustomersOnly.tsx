import { useContext } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "../providers/AuthContextProvider";

export function CustomersOnly() {
  const auth = useContext(AuthContext).authStatus;

  const location = useLocation();

  switch (auth?.status) {
    case null:
    case "guest":
      return (
        <Navigate to="/login" state={{ from: location }} replace={false} />
      );
    case "customer":
      return <Outlet context={{ id: auth.id }} />;
  }
}
