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
import { RegisterPage } from "./pages/RegisterPage";
import { ThanksPage } from "./pages/ThanksPage";
import { AuthContextProvider } from "./providers/AuthContextProvider";
import { AppLayout } from "./routes/AppLayout";
import { CustomersOnly } from "./routes/CustomersOnly";
import { GuestsOnly } from "./routes/GuestsOnly";

const httpClient = new Client();

const queryClient = new QueryClient();

function NotFound() {
  return <div>Not Found</div>;
}

function ErrorPage() {
  return <div>Error</div>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={<AppLayout />}
        loader={() => httpClient.getAuthStatus()}
        errorElement={<ErrorPage />}
      >
        <Route element={<GuestsOnly />}>
          <Route
            path="/register"
            element={<RegisterPage client={httpClient} />}
          />
          <Route path="/login" element={<LoginPage client={httpClient} />} />
        </Route>

        <Route element={<CustomersOnly />}>
          <Route path="/thanks" element={<ThanksPage />} />
          <Route
            path="/mypage"
            element={<DashboardPage client={httpClient} />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
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
