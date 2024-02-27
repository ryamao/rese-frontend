import { Meta, StoryObj } from "@storybook/react";
import { fn, userEvent, waitFor, within, expect, spyOn } from "@storybook/test";

import { LoginForm } from "./LoginForm";
import { Client, PostAuthLoginResult } from "../Client";

const meta = {
  title: "Components/Auth/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  args: {
    client: new Client("http://localhost:12345"),
    onLogin: fn()
  }
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  play: async ({ canvasElement, args }) => {
    const spy = spyPostAuthLogin({ data: undefined, error: undefined });
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Email"), "test@example.com");
    await userEvent.type(canvas.getByLabelText("Password"), "password");
    await userEvent.click(canvas.getByText("ログイン"));
    await expect(spy).toHaveBeenCalled();
    await waitFor(() => {
      expect(args.onLogin).toHaveBeenCalled();
    });
  }
};

export const Invalid: Story = {
  play: async ({ canvasElement }) => {
    const spy = spyPostAuthLogin({ data: undefined, error: undefined });
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
    expect(spy).not.toHaveBeenCalled();
  }
};

function spyPostAuthLogin(response: PostAuthLoginResult) {
  return spyOn(Client.prototype, "postAuthLogin").mockImplementation(() =>
    Promise.resolve(response)
  );
}
