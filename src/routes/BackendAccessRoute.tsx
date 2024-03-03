import { Outlet } from "react-router-dom";

import { Client } from "../Client";
import {
  BackendAccessContext,
  useBackendAccessState
} from "../contexts/BackendAccessContext";

export function BackendAccessRoute() {
  const httpClient = new Client();
  const value = useBackendAccessState(httpClient);
  return (
    <BackendAccessContext.Provider value={value}>
      <Outlet />
    </BackendAccessContext.Provider>
  );
}
