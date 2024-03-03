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
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ShopListPage } from "./pages/ShopListPage";
import { ThanksPage } from "./pages/ThanksPage";
import { AuthContextProvider } from "./providers/AuthContextProvider";
import { BackendAccessRoute } from "./routes/BackendAccessRoute";
import { CustomersOnlyRoute } from "./routes/CustomersOnlyRoute";
import { GuestsOnlyRoute } from "./routes/GuestsOnlyRoute";

const httpClient = new Client();

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<BackendAccessRoute />}>
        <Route path="/" element={<ShopListPage />} />

        <Route element={<GuestsOnlyRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage client={httpClient} />} />
        </Route>

        <Route element={<CustomersOnlyRoute />}>
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
