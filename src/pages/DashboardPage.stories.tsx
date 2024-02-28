import { Meta, StoryObj } from "@storybook/react";

import { DashboardPage } from "./DashboardPage";
import { Client } from "../Client";
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
  args: {
    client: new Client()
  }
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
