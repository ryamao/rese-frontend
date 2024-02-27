import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, waitFor, within, expect } from "@storybook/test";

import { LoginForm } from "./LoginForm";
import { handlers } from "../mocks/handlers";

const meta = {
  title: "Components/Auth/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  args: {
    onLogin: fn()
  },
  parameters: {
    msw: {
      handlers
    }
  }
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Email"), "test@example.com");
    await userEvent.type(canvas.getByLabelText("Password"), "password");
    await userEvent.click(canvas.getByText("ログイン"));
    await waitFor(() => {
      expect(args.onLogin).toHaveBeenCalled();
    });
  }
};

export const Error: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("ログイン"));
    await waitFor(() => {
      expect(
        canvas.getByText("メールアドレスを入力してください")
      ).toBeInTheDocument();
      expect(
        canvas.getByText("パスワードを入力してください")
      ).toBeInTheDocument();
    });
  }
};
