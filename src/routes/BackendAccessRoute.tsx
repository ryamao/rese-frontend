import React from "react";

import { Outlet, useOutletContext } from "react-router-dom";

import {
  BackendAccessContext,
  createBackendAccessContextType
} from "../contexts/BackendAccessContext";
import { GetAuthStatusResult, HttpClient } from "../HttpClient";

export function BackendAccessRoute() {
  const httpClient = new HttpClient();
  const [authStatus, setAuthStatus] = React.useState<GetAuthStatusResult>();

  if (authStatus === undefined) {
    httpClient
      .getAuthStatus()
      .then((result) => setAuthStatus(result))
      .catch((error) => {
        throw new Error(error);
      });
  }

  const value = createBackendAccessContextType({
    httpClient,
    authStatus,
    setAuthStatus
  });

  if (authStatus === undefined) {
    return <div>TODO: BackendAccessRoute</div>;
  } else {
    return (
      <BackendAccessContext.Provider value={value}>
        <Outlet context={{ authStatus: authStatus }} />
      </BackendAccessContext.Provider>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthStatus() {
  return useOutletContext<{ authStatus: GetAuthStatusResult }>();
}
