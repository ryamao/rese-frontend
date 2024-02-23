import { fn } from "@storybook/test";

import { UsernameInputField } from "./UsernameInputField";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Rese/UsernameInputField",
  component: UsernameInputField,
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    onBlur: fn()
  }
} satisfies Meta<typeof UsernameInputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
