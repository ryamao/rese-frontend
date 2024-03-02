import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { MemoryRouter } from "react-router-dom";

import { ShopListPage } from "./ShopListPage";
import { AuthContextProvider } from "../providers/AuthContextProvider";

const meta = {
  title: "Pages/ShopListPage",
  component: ShopListPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  args: {
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
} satisfies Meta<typeof ShopListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
