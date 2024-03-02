import React from "react";

import { Global, css } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";

import { Client } from "./Client";
import { DashboardPage } from "./pages/DashboardPage";
import { ErrorPage } from "./pages/ErrorPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ShopListPage } from "./pages/ShopListPage";
import { ThanksPage } from "./pages/ThanksPage";
import { AuthContextProvider } from "./providers/AuthContextProvider";
import { AppLayout } from "./routes/AppLayout";
import { CustomersOnly } from "./routes/CustomersOnly";
import { GuestsOnly } from "./routes/GuestsOnly";
import { UseAuthStatus } from "./routes/UseAuthStatus";

const httpClient = new Client();

const queryClient = new QueryClient();

async function getAuthStatus() {
  return httpClient.getAuthStatus();
}

async function postLogout() {
  const { error } = await httpClient.postAuthLogout();
  if (error) {
    throw new Error(`ログアウトに失敗しました: ${error}`);
  }
}

async function loadShopListPageData() {
  const { areas } = await httpClient.getAreas();
  const { genres } = await httpClient.getGenres();
  return { areas, genres };
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<UseAuthStatus />} loader={getAuthStatus}>
        <Route
          path="/"
          element={
            <ShopListPage httpClient={httpClient} postLogout={postLogout} />
          }
          loader={loadShopListPageData}
        />

        <Route element={<GuestsOnly />}>
          <Route
            path="/register"
            element={<RegisterPage client={httpClient} />}
          />
          <Route path="/login" element={<LoginPage client={httpClient} />} />
        </Route>

        <Route element={<CustomersOnly />}>
          <Route path="thanks" element={<ThanksPage />} />
          <Route
            path="mypage"
            element={<DashboardPage client={httpClient} />}
          />
        </Route>
      </Route>

      <Route
        path="/old"
        element={<AppLayout httpClient={httpClient} />}
        loader={() => httpClient.getAuthStatus()}
        errorElement={<ErrorPage />}
      >
        <Route element={<GuestsOnly />}>
          <Route
            path="register"
            element={<RegisterPage client={httpClient} />}
          />
          <Route path="login" element={<LoginPage client={httpClient} />} />
        </Route>

        <Route element={<CustomersOnly />}>
          <Route path="thanks" element={<ThanksPage />} />
          <Route
            path="mypage"
            element={<DashboardPage client={httpClient} />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

const global = css`
  body {
    margin: 0;
    background-color: #eee;
  }
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Global styles={global} />
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
