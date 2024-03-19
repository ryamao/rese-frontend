import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";

import { MenuOverlayProvider } from "./contexts/MenuOverlayContext";
import { AdminPage } from "./pages/AdminPage";
import { DashboardPage } from "./pages/DashboardPage";
import { EmailVerificationPage } from "./pages/EmailVerificationPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ReservationCompletedPage } from "./pages/ReservationCompletedPage";
import { ShopDetailPage } from "./pages/ShopDetailPage";
import { ShopListPage } from "./pages/ShopListPage";
import { ThanksPage } from "./pages/ThanksPage";
import { AdminOnlyRoute } from "./routes/AdminOnlyRoute";
import { BackendAccessRoute } from "./routes/BackendAccessRoute";
import { CustomersOnlyRoute } from "./routes/CustomersOnlyRoute";
import { GuestsOnlyRoute } from "./routes/GuestsOnlyRoute";
import { NeedsToVerifyEmailRoute } from "./routes/NeedsToVerifyEmailRoute";
import { ScrollRestorationRoute } from "./routes/ScrollRestorationRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ScrollRestorationRoute />}>
        <Route element={<BackendAccessRoute />}>
          <Route path="/" element={<ShopListPage />} />
          <Route path="/detail/:shopId" element={<ShopDetailPage />} />
          <Route element={<GuestsOnlyRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<NeedsToVerifyEmailRoute />}>
            <Route path="/verify-email" element={<EmailVerificationPage />} />
          </Route>
          <Route element={<CustomersOnlyRoute />}>
            <Route path="/thanks" element={<ThanksPage />} />
            <Route path="/mypage" element={<DashboardPage />} />
            <Route path="/done" element={<ReservationCompletedPage />} />
          </Route>
          <Route element={<AdminOnlyRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <MenuOverlayProvider>
        <RouterProvider router={router} />
      </MenuOverlayProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
