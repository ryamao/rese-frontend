import { useContext } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "../providers/AuthContextProvider";

export function GuestsOnly() {
  const auth = useContext(AuthContext).authStatus;

  const location = useLocation();

  switch (auth?.status) {
    case null:
    case "customer":
      return (
        <Navigate to="/mypage" state={{ from: location }} replace={false} />
      );
    case "guest":
      return <Outlet />;
  }
}
