import { Outlet } from "react-router-dom";

import {
  BackendAccessContext,
  useBackendAccessState
} from "../contexts/BackendAccessContext";
import { HttpClient } from "../HttpClient";

export function BackendAccessRoute() {
  const httpClient = new HttpClient();
  const value = useBackendAccessState(httpClient);
  return (
    <BackendAccessContext.Provider value={value}>
      <Outlet />
    </BackendAccessContext.Provider>
  );
}
