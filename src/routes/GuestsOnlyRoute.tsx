import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStatus } from "./BackendAccessRoute";

export function GuestsOnlyRoute() {
  const { authStatus } = useAuthStatus();

  const location = useLocation();

  switch (authStatus.status) {
    case "customer":
      if (authStatus.has_verified_email) {
        return (
          <Navigate to="/mypage" state={{ from: location }} replace={false} />
        );
      } else {
        return <Navigate to="/verify-email" replace={false} />;
      }
    case "guest":
      return <Outlet />;
  }
}
