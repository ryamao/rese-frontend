import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useBackendAccessContext } from "../contexts/BackendAccessContext";

export function GuestsOnlyRoute() {
  const { authStatus } = useBackendAccessContext();

  const location = useLocation();

  switch (authStatus?.status) {
    case null:
    case "customer":
      return (
        <Navigate to="/mypage" state={{ from: location }} replace={false} />
      );
    case "guest":
      return <Outlet />;
  }
}
