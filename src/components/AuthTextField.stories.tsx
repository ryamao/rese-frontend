import { fn, within, expect, userEvent } from "@storybook/test";

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

export const Username: Story = {
  args: {
    type: "username"
  }
};

export const Email: Story = {
  args: {
    type: "email"
  }
};

export const Password: Story = {
  args: {
    type: "password"
  }
};

export const Filled: Story = {
  args: {
    type: "username"
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Username");
    await expect(input).toBeInTheDocument();
    await userEvent.type(input, "test");
    await userEvent.tab();
    await expect(input).toHaveClass("filled");
  }
};
