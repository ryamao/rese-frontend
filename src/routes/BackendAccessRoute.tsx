import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

import {
  BackendAccessContext,
  createBackendAccessContextType
} from "../contexts/BackendAccessContext";
import { HttpClient } from "../HttpClient";

export function BackendAccessRoute() {
  const httpClient = new HttpClient();
  const queryClient = useQueryClient();

  const authStatus = useQuery({
    queryKey: ["authStatus"],
    queryFn: () => httpClient.getAuthStatus(),
    staleTime: Infinity
  });

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
    invalidateAuthStatus: () =>
      queryClient.invalidateQueries({ queryKey: ["authStatus"] })
  });

  return (
    <BackendAccessContext.Provider value={value}>
      <Outlet />
    </BackendAccessContext.Provider>
  );
}
