import { fn } from "@storybook/test";

import { AuthTextField } from "./AuthTextField";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Rese/AuthTextField",
  component: AuthTextField,
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    onBlur: fn()
  }
} satisfies Meta<typeof AuthTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
