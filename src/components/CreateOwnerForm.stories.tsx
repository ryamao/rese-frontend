import { Meta, StoryObj } from "@storybook/react";

import { CreateOwnerForm } from "./CreateOwnerForm";
import { fn } from "@storybook/test";

const meta = {
  title: "Components/Owner/CreateOwnerForm",
  component: CreateOwnerForm,
  tags: ["autodocs"],
  args: {
    onSubmit: fn()
  }
} satisfies Meta<typeof CreateOwnerForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
