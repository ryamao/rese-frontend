import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { CreateOwnerForm } from "./CreateOwnerForm";

const meta = {
  title: "Components/Admin/CreateOwnerForm",
  component: CreateOwnerForm,
  tags: ["autodocs"],
  args: {
    onSubmit: fn()
  }
} satisfies Meta<typeof CreateOwnerForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
