import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

import { OwnerPage } from "./OwnerPage";
import {
  BackendAccessContext,
  createBackendAccessContextType
} from "../contexts/BackendAccessContext";
import { HttpClient } from "../HttpClient";
import { handlers } from "../mocks/handlers";

const meta = {
  title: "pages/OwnerPage",
  component: OwnerPage,
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
      return (
        <QueryClientProvider client={queryClient}>
          <BackendAccessContext.Provider value={backendAccess}>
            <MemoryRouter>
              <Story />
            </MemoryRouter>
          </BackendAccessContext.Provider>
        </QueryClientProvider>
      );
    }
  ]
} satisfies Meta<typeof OwnerPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
