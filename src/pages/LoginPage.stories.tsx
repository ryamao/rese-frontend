import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { LoginPage } from "./LoginPage";
import { handlers } from "../mocks/handlers";

const meta = {
  title: "Pages/LoginPage",
  component: LoginPage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ],
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers
    }
  }
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
