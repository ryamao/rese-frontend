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
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ShopDetailPage } from "./pages/ShopDetailPage";
import { ShopListPage } from "./pages/ShopListPage";
import { ThanksPage } from "./pages/ThanksPage";
import { BackendAccessRoute } from "./routes/BackendAccessRoute";
import { CustomersOnlyRoute } from "./routes/CustomersOnlyRoute";
import { GuestsOnlyRoute } from "./routes/GuestsOnlyRoute";
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
            <Route path="/login" element={<LoginPage />} />R
          </Route>
          <Route element={<CustomersOnlyRoute />}>
            <Route path="thanks" element={<ThanksPage />} />
            <Route path="mypage" element={<DashboardPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
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
