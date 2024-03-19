import { Meta, StoryObj } from "@storybook/react";

import { NotificationEmailForm } from "./NotificationEmailForm";

const meta = {
  title: "components/Admin/NotificationEmailForm",
  component: NotificationEmailForm,
  tags: ["autodocs"]
} satisfies Meta<typeof NotificationEmailForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
