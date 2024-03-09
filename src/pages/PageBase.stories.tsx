import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { MemoryRouter } from "react-router-dom";

import { PageBase } from "./PageBase";
import {
  BackendAccessContext,
  createBackendAccessContextType
} from "../contexts/BackendAccessContext";
import { HttpClient } from "../HttpClient";
import { handlers } from "../mocks/handlers";

const meta = {
  title: "Pages/PageBase",
  component: PageBase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers
    }
  },
  args: {
    children: "Hello, world!"
  },
  decorators: [
    (Story) => {
      const backendAccess = createBackendAccessContextType({
        httpClient: new HttpClient(),
        authStatus: { status: "customer", id: 1 },
        setAuthStatus: fn()
      });
      return (
        <MemoryRouter>
          <BackendAccessContext.Provider value={backendAccess}>
            <Story />
          </BackendAccessContext.Provider>
        </MemoryRouter>
      );
    }
  ]
} satisfies Meta<typeof PageBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
