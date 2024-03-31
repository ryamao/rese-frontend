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

import { BillingPage } from "./BillingPage";
import {
  BackendAccessContext,
  createBackendAccessContextType
} from "../contexts/BackendAccessContext";
import { HttpClient } from "../HttpClient";
import { handlers } from "../mocks/handlers";
import { ReservationForOwner } from "../models";

const reservation: ReservationForOwner = {
  id: 1,
  customer_name: "ユーザー1",
  reserved_at: "2022-01-01T12:00:00+09:00",
  number_of_guests: 2,
  is_checked_in: false,
  billing: {
    amount: 1000,
    description: "サンプル請求"
  }
};

const meta = {
  title: "pages/BillingPage",
  component: BillingPage,
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
                    element={<Navigate to="/billing" state={reservation} />}
                  />
                  <Route path="/billing" element={<Story />} />
                </Route>
              </Routes>
            </MemoryRouter>
          </BackendAccessContext.Provider>
        </QueryClientProvider>
      );
    }
  ]
} satisfies Meta<typeof BillingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
