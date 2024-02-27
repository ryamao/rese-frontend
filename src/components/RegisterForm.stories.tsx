import { fn, userEvent, within, expect, waitFor } from "@storybook/test";

import { RegisterForm } from "./RegisterForm";
import { Client, PostAuthRegisterResult } from "../Client";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Auth/RegisterForm",
  component: RegisterForm,
  tags: ["autodocs"],
  args: {
    client: new Client("http://localhost:12345"),
    onRegister: fn()
  }
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  play: async ({ canvasElement, args }) => {
    const spy = spyPostAuthRegister({ data: undefined, error: undefined });
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Username"), "test");
    await userEvent.type(canvas.getByLabelText("Email"), "test@example.com");
    await userEvent.type(canvas.getByLabelText("Password"), "password");
    await userEvent.click(canvas.getByText("登録"));
    expect(spy).toHaveBeenCalled();
    await waitFor(() => {
      expect(args.onRegister).toHaveBeenCalled();
    });
  }
};

export const Error: Story = {
  play: async ({ canvasElement }) => {
    const spy = spyPostAuthRegister({ data: undefined, error: undefined });
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("登録"));
    await waitFor(() => {
      expect(canvas.getByText("名前を入力してください")).toBeInTheDocument();
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

function spyPostAuthRegister(response: PostAuthRegisterResult) {
  return vitest
    .spyOn(Client.prototype, "postAuthRegister")
    .mockImplementation(() => Promise.resolve(response));
}
