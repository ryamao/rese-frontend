import { fn, userEvent, within, expect, waitFor } from "@storybook/test";

import { RegisterForm } from "./RegisterForm";
import { handlers } from "../mocks/handlers";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Register/RegisterForm",
  component: RegisterForm,
  tags: ["autodocs"],
  args: {
    onRegister: fn()
  },
  parameters: {
    msw: {
      handlers
    }
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
      expect(args.onRegister).toHaveBeenCalled();
    });
  }
};

export const Error: Story = {
  play: async ({ canvasElement }) => {
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
  }
};
