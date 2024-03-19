import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext
} from "react-router-dom";

import { useAuthStatus } from "./BackendAccessRoute";

export function AdminOnlyRoute() {
  const { authStatus } = useAuthStatus();

  const location = useLocation();

  switch (authStatus.status) {
    case "admin":
      return <Outlet context={{ adminId: authStatus.id }} />;
    case "guest":
      return (
        <Navigate to="/login" state={{ from: location }} replace={false} />
      );
    case "owner":
      return <Navigate to="/owner" replace={false} />;
    case "customer":
      return <Navigate to="/mypage" replace={false} />;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdminId() {
  return useOutletContext<{ adminId: number }>();
}
