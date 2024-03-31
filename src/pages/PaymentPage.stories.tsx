import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  MemoryRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from "react-router-dom";

import { PaymentPage } from "./PaymentPage";
import {
  BackendAccessContext,
  createBackendAccessContextType
} from "../contexts/BackendAccessContext";
import { HttpClient } from "../HttpClient";
import { handlers } from "../mocks/handlers";
import { ReservationData } from "../models";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const reservation: ReservationData = {
  id: 1,
  shop: {
    id: 1,
    name: "サンプルショップ",
    area: { id: 1, name: "東京都" },
    genre: { id: 1, name: "寿司" },
    image_url: "https://via.placeholder.com/800x500",
    detail: "サンプルテキスト",
    favorite_status: "marked"
  },
  reserved_at: "2022-01-01T12:00:00+09:00",
  number_of_guests: 2,
  is_checked_in: true,
  billing: {
    amount: 3000,
    description: "サンプルコース",
    is_paid: false
  }
};

const meta = {
  title: "pages/PaymentPage",
  component: PaymentPage,
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
      const stripeOptions: StripeElementsOptions = {
        mode: "payment",
        amount: 3000,
        currency: "jpy"
      };
      const DummyRoute = () => <Outlet context={{ ownerId: 1 }} />;
      return (
        <QueryClientProvider client={queryClient}>
          <BackendAccessContext.Provider value={backendAccess}>
            <Elements stripe={stripePromise} options={stripeOptions}>
              <MemoryRouter>
                <Routes>
                  <Route element={<DummyRoute />}>
                    <Route
                      path="/"
                      element={<Navigate to="/payment" state={reservation} />}
                    />
                    <Route path="/payment" element={<Story />} />
                  </Route>
                </Routes>
              </MemoryRouter>
            </Elements>
          </BackendAccessContext.Provider>
        </QueryClientProvider>
      );
    }
  ]
} satisfies Meta<typeof PaymentPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
