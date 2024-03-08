import { Outlet } from "react-router-dom";

import {
  BackendAccessContext,
  createBackendAccessContextType
} from "../contexts/BackendAccessContext";
import { useAuthStatus } from "../hooks/queries";
import { HttpClient } from "../HttpClient";

export function BackendAccessRoute() {
  const httpClient = new HttpClient();
  const authStatus = useAuthStatus(httpClient);

  if (authStatus.isError) {
    return (
      <div>
        Error: {authStatus.error.message}
        <br />
        TODO: 認証状態取得時のエラー画面を作成する
      </div>
    );
  }
  if (authStatus.isPending) {
    return <div>TODO: 認証状態取得時のローディング画面を作成する</div>;
  }

  const value = createBackendAccessContextType({
    httpClient,
    authStatus: authStatus.data,
    invalidateAuthStatus: () => authStatus.invalidate()
  });

  return (
    <BackendAccessContext.Provider value={value}>
      <Outlet />
    </BackendAccessContext.Provider>
  );
}
