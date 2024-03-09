import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";

import { DashboardPage } from "./DashboardPage";
import {
  BackendAccessContext,
  createBackendAccessContextType
} from "../contexts/BackendAccessContext";
import { HttpClient } from "../HttpClient";
import { handlers } from "../mocks/handlers";

const meta = {
  title: "Pages/DashboardPage",
  component: DashboardPage,
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
        authStatus: { status: "customer", id: 1 },
        invalidateAuthStatus: () => Promise.resolve()
      });
      const DummyRoute = () => <Outlet context={{ customerId: 1 }} />;
      const StoryRoute = () => (
        <QueryClientProvider client={queryClient}>
          <BackendAccessContext.Provider value={backendAccess}>
            <Story />
          </BackendAccessContext.Provider>
        </QueryClientProvider>
      );
      return (
        <MemoryRouter>
          <Routes>
            <Route element={<DummyRoute />}>
              <Route path="/" element={<StoryRoute />} />
            </Route>
          </Routes>
        </MemoryRouter>
      );
    }
  ]
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
