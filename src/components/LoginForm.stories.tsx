import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, waitFor, within, expect } from "@storybook/test";

import { LoginForm } from "./LoginForm";

const meta = {
  title: "Components/Auth/LoginForm",
  component: LoginForm,
  tags: ["autodocs"]
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLogin: fn().mockImplementation(() =>
      Promise.resolve({ error: undefined })
    )
  }
};

export const Filled: Story = {
  args: {
    onLogin: fn().mockImplementation(() =>
      Promise.resolve({ error: undefined })
    )
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Email"), "test@example.com");
    await userEvent.type(canvas.getByLabelText("Password"), "password");
    await userEvent.click(canvas.getByText("ログイン"));
    await waitFor(() => {
      expect(args.onLogin).toHaveBeenCalledWith("test@example.com", "password");
    });
  }
};

export const Invalid: Story = {
  args: {
    onLogin: fn().mockImplementation(() =>
      Promise.resolve({ error: undefined })
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("ログイン"));
    expect(
      await canvas.findByText("メールアドレスを入力してください")
    ).toBeInTheDocument();
    expect(
      await canvas.findByText("パスワードを入力してください")
    ).toBeInTheDocument();
  }
};
