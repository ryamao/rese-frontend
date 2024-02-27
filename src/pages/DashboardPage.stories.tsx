import { Meta, StoryObj } from "@storybook/react";

import { DashboardPage } from "./DashboardPage";

const meta = {
  title: "Pages/DashboardPage",
  component: DashboardPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
