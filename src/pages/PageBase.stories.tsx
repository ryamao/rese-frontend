import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { MemoryRouter } from "react-router-dom";

import { PageBase } from "./PageBase";
import { AuthContextProvider } from "../providers/AuthContextProvider";

const meta = {
  title: "Pages/PageBase",
  component: PageBase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  args: {
    children: "Hello, world!",
    postLogout: fn()
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthContextProvider>
          <Story />
        </AuthContextProvider>
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof PageBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
