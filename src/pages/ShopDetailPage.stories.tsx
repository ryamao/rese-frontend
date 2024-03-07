import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { ShopDetailPage } from "./ShopDetailPage";
import {
  BackendAccessContext,
  createBackendAccessContextType
} from "../contexts/BackendAccessContext";
import { HttpClient } from "../HttpClient";
import { handlers } from "../mocks/handlers";

const meta = {
  title: "Pages/ShopDetailPage",
  component: ShopDetailPage,
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
      return (
        <QueryClientProvider client={queryClient}>
          <BackendAccessContext.Provider value={backendAccess}>
            <MemoryRouter initialEntries={["/detail/1"]}>
              <Routes>
                <Route path="/detail/:shopId" element={<Story />} />
              </Routes>
            </MemoryRouter>
          </BackendAccessContext.Provider>
        </QueryClientProvider>
      );
    }
  ]
} satisfies Meta<typeof ShopDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
