import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useBackendAccessContext } from "../contexts/BackendAccessContext";

export function CustomersOnlyRoute() {
  const { authStatus } = useBackendAccessContext();

  const location = useLocation();

  switch (authStatus?.status) {
    case null:
    case "guest":
      return (
        <Navigate to="/login" state={{ from: location }} replace={false} />
      );
    case "customer":
      return <Outlet context={{ id: authStatus.id }} />;
  }
}
