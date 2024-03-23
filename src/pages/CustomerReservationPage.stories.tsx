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

import { CustomerReservationPage } from "./CustomerReservationPage";
import {
  BackendAccessContext,
  createBackendAccessContextType
} from "../contexts/BackendAccessContext";
import { HttpClient } from "../HttpClient";
import { handlers } from "../mocks/handlers";
import { ReservationData } from "../models";

const reservation: ReservationData = {
  id: 1,
  shop: {
    id: 1,
    name: "dummy shop",
    area: { id: 1, name: "dummy area" },
    genre: { id: 1, name: "dummy genre" },
    image_url: "https://via.placeholder.com/400x300",
    detail: "dummy detail",
    favorite_status: "marked"
  },
  reserved_at: "2022-01-01T12:00:00+09:00",
  number_of_guests: 2
};

const meta = {
  title: "pages/CustomerReservationPage",
  component: CustomerReservationPage,
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
        authStatus: { status: "customer", id: 1, has_verified_email: true },
        setAuthStatus: fn()
      });
      const DummyRoute = () => <Outlet context={{ customerId: 1 }} />;
      return (
        <QueryClientProvider client={queryClient}>
          <BackendAccessContext.Provider value={backendAccess}>
            <MemoryRouter>
              <Routes>
                <Route element={<DummyRoute />}>
                  <Route
                    path="/"
                    element={<Navigate to="/reservation" state={reservation} />}
                  />
                  <Route path="/reservation" element={<Story />} />
                </Route>
              </Routes>
            </MemoryRouter>
          </BackendAccessContext.Provider>
        </QueryClientProvider>
      );
    }
  ]
} satisfies Meta<typeof CustomerReservationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
