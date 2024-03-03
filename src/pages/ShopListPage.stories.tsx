import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

import { ShopListPage } from "./ShopListPage";
import { Client } from "../Client";
import {
  ApiAccessContext,
  useApiAccessState
} from "../contexts/ApiAccessContext";
import { handlers } from "../mocks/handlers";

const httpClient = new Client();

const meta = {
  title: "Pages/ShopListPage",
  component: ShopListPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers
    }
  },
  args: {
    httpClient
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      const apiAccess = useApiAccessState(new Client());
      return (
        <MemoryRouter>
          <QueryClientProvider client={queryClient}>
            <ApiAccessContext.Provider value={apiAccess}>
              <Story />
            </ApiAccessContext.Provider>
          </QueryClientProvider>
        </MemoryRouter>
      );
    }
  ]
} satisfies Meta<typeof ShopListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
