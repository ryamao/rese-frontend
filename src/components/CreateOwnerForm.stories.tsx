import { Meta, StoryObj } from "@storybook/react";

import { CreateOwnerForm } from "./CreateOwnerForm";

const meta = {
  title: "Components/Owner/CreateOwnerForm",
  component: CreateOwnerForm,
  tags: ["autodocs"]
} satisfies Meta<typeof CreateOwnerForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
