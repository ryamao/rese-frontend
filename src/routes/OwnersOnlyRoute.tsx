import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext
} from "react-router-dom";

import { useAuthStatus } from "./BackendAccessRoute";

export function OwnersOnlyRoute() {
  const { authStatus } = useAuthStatus();

  const location = useLocation();

  switch (authStatus.status) {
    case "owner":
      return <Outlet context={{ ownerId: authStatus.id }} />;
    case "guest":
      return (
        <Navigate to="/login" state={{ from: location }} replace={false} />
      );
    case "admin":
      return <Navigate to="/admin" replace={false} />;
    case "customer":
      return <Navigate to="/mypage" replace={false} />;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOwnerId() {
  return useOutletContext<{ ownerId: number }>();
}
