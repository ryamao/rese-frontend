import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

import { ShopDetailPage } from "./ShopDetailPage";
import {
  BackendAccessContext,
  useBackendAccessState
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
      const backendAccess = useBackendAccessState(new HttpClient());
      return (
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <BackendAccessContext.Provider value={backendAccess}>
              <Story />
            </BackendAccessContext.Provider>
          </QueryClientProvider>
        </MemoryRouter>
      );
    }
  ]
} satisfies Meta<typeof ShopDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
