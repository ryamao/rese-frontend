import { Outlet } from "react-router-dom";

import { Client } from "../Client";
import {
  ApiAccessContext,
  useApiAccessState
} from "../contexts/ApiAccessContext";

export function ApiAccessRoute() {
  const httpClient = new Client();
  const value = useApiAccessState(httpClient);
  return (
    <ApiAccessContext.Provider value={value}>
      <Outlet />
    </ApiAccessContext.Provider>
  );
}
