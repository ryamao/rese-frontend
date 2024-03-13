import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext
} from "react-router-dom";

import { useAuthStatus } from "./BackendAccessRoute";

export function CustomersOnlyRoute() {
  const { authStatus } = useAuthStatus();

  const location = useLocation();

  switch (authStatus.status) {
    case "guest":
      return (
        <Navigate to="/login" state={{ from: location }} replace={false} />
      );
    case "customer":
      if (authStatus.has_verified_email) {
        return <Outlet context={{ customerId: authStatus.id }} />;
      } else {
        return <Navigate to="/verify-email" replace={false} />;
      }
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCustomerId() {
  return useOutletContext<{ customerId: number }>();
}
