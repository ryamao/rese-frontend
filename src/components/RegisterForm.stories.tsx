import { fn, userEvent, within, expect, waitFor } from "@storybook/test";

import { RegisterForm } from "./RegisterForm";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Auth/RegisterForm",
  component: RegisterForm,
  tags: ["autodocs"],
  args: {
    onRegister: fn().mockImplementation(async () => ({
      error: undefined
    }))
  }
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Username"), "test");
    await userEvent.type(canvas.getByLabelText("Email"), "test@example.com");
    await userEvent.type(canvas.getByLabelText("Password"), "password");
    await userEvent.click(canvas.getByText("登録"));
    await waitFor(() => {
      expect(args.onRegister).toHaveBeenCalledWith(
        "test",
        "test@example.com",
        "password"
      );
    });
  }
};

export const Error: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("登録"));
    expect(
      await canvas.findByText("名前を入力してください")
    ).toBeInTheDocument();
    expect(
      await canvas.findByText("メールアドレスを入力してください")
    ).toBeInTheDocument();
    expect(
      await canvas.findByText("パスワードを入力してください")
    ).toBeInTheDocument();
  }
};
