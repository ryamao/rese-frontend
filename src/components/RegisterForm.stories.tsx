import { fn, within, userEvent, waitFor, expect } from "@storybook/test";

import { RegisterForm } from "./RegisterForm";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Rese/Register/RegisterForm",
  component: RegisterForm,
  tags: ["autodocs"],
  args: {
    onSubmit: fn(),
    onError: fn()
  }
} satisfies Meta<typeof RegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  play: async ({ canvasElement, args }) => {
    const { onSubmit, onError } = args;
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Username"), "Test User");
    await userEvent.type(canvas.getByLabelText("Email"), "test@exmaple.com");
    await userEvent.type(canvas.getByLabelText("Password"), "password");
    await userEvent.click(canvas.getByText("登録"));
    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    await waitFor(() => expect(onError).not.toHaveBeenCalled());
  }
};

export const Invalid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("登録"));
    await waitFor(() =>
      expect(canvas.getByText("名前を入力してください")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        canvas.getByText("メールアドレスを入力してください")
      ).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        canvas.getByText("パスワードを入力してください")
      ).toBeInTheDocument()
    );
  }
};
