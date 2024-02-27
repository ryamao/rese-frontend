import { fn, within, expect, userEvent } from "@storybook/test";

import { AuthTextField } from "./AuthTextField";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Auth/AuthTextField",
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
    fieldType: "name"
  }
};

export const Email: Story = {
  args: {
    fieldType: "email"
  }
};

export const Password: Story = {
  args: {
    fieldType: "password"
  }
};

export const Filled: Story = {
  args: {
    fieldType: "name"
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
