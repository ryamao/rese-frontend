import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  MemoryRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from "react-router-dom";

import { ReservationViewerPage } from "./ReservationViewerPage";
import {
  BackendAccessContext,
  createBackendAccessContextType
} from "../contexts/BackendAccessContext";
import { HttpClient } from "../HttpClient";
import { handlers } from "../mocks/handlers";
import { OwnerShopData } from "../models";

const shop: OwnerShopData = {
  id: 1,
  name: "サンプルショップ",
  area: { id: 1, name: "東京都" },
  genre: { id: 1, name: "寿司" },
  image_url: "https://via.placeholder.com/800x500",
  detail: "サンプルテキスト"
};

const meta = {
  title: "pages/ReservationViewerPage",
  component: ReservationViewerPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers
    }
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      const backendAccess = createBackendAccessContextType({
        httpClient: new HttpClient(),
        authStatus: { status: "owner", id: 1, has_verified_email: true },
        setAuthStatus: fn()
      });
      const DummyRoute = () => <Outlet context={{ ownerId: 1 }} />;
      return (
        <QueryClientProvider client={queryClient}>
          <BackendAccessContext.Provider value={backendAccess}>
            <MemoryRouter>
              <Routes>
                <Route element={<DummyRoute />}>
                  <Route
                    path="/"
                    element={<Navigate to="/reservations" state={shop} />}
                  />
                  <Route path="/reservations" element={<Story />} />
                </Route>
              </Routes>
            </MemoryRouter>
          </BackendAccessContext.Provider>
        </QueryClientProvider>
      );
    }
  ]
} satisfies Meta<typeof ReservationViewerPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
