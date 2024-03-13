import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext
} from "react-router-dom";

import { useAuthStatus } from "./BackendAccessRoute";

export function NeedsToVerifyEmailRoute() {
  const { authStatus } = useAuthStatus();

  const location = useLocation();

  console.log("NeedsToVerifyEmailRoute", authStatus);

  switch (authStatus.status) {
    case "guest":
      return (
        <Navigate to="/login" state={{ from: location }} replace={false} />
      );
    case "customer":
      if (authStatus.has_verified_email) {
        return (
          <Navigate to="/mypage" state={{ from: location }} replace={false} />
        );
      } else {
        return <Outlet context={{ customerId: authStatus.id }} />;
      }
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCustomerId() {
  return useOutletContext<{ customerId: number }>();
}
