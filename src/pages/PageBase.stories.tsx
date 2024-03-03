import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { PageBase } from "./PageBase";
import { Client } from "../Client";
import {
  ApiAccessContext,
  useApiAccessState
} from "../contexts/ApiAccessContext";
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
      const apiAccess = useApiAccessState(new Client());
      return (
        <MemoryRouter>
          <ApiAccessContext.Provider value={apiAccess}>
            <Story />
          </ApiAccessContext.Provider>
        </MemoryRouter>
      );
    }
  ]
} satisfies Meta<typeof PageBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
