import React from "react";

import { Outlet, useOutletContext } from "react-router-dom";

import {
  BackendAccessContext,
  createBackendAccessContextType
} from "../contexts/BackendAccessContext";
import { HttpClient } from "../HttpClient";
import { AuthStatus } from "../models";

export function BackendAccessRoute() {
  const httpClient = new HttpClient();
  const [authStatus, setAuthStatus] = React.useState<AuthStatus>();

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
    return <div>Loading...</div>;
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
  return useOutletContext<{ authStatus: AuthStatus }>();
}
