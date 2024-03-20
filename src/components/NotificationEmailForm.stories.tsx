import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { NotificationEmailForm } from "./NotificationEmailForm";

const meta = {
  title: "components/Admin/NotificationEmailForm",
  component: NotificationEmailForm,
  tags: ["autodocs"],
  args: {
    onSubmit: fn()
  }
} satisfies Meta<typeof NotificationEmailForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
