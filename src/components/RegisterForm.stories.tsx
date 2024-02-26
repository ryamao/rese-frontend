import { RegisterForm } from "./RegisterForm";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Register/RegisterForm",
  component: RegisterForm,
  tags: ["autodocs"]
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
