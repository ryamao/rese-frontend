import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

import { DashboardPage } from "./DashboardPage";
import { Client } from "../Client";
import {
  BackendAccessContext,
  useBackendAccessState
} from "../contexts/BackendAccessContext";
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
      const backendAccess = useBackendAccessState(new Client());
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
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
