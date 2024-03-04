import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { PageBase } from "./PageBase";
import {
  BackendAccessContext,
  useBackendAccessState
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
      const backendAccess = useBackendAccessState(new HttpClient());
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
