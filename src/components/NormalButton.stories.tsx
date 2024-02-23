import { fn } from "@storybook/test";

import { NormalButton } from "./NormalButton";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Rese/NormalButton",
  component: NormalButton,
  tags: ["autodocs"],
  args: { onClick: fn() }
} satisfies Meta<typeof NormalButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Register: Story = {
  args: { text: "登録" }
};

export const Thanks: Story = {
  args: { text: "ログインする" }
};

export const Login: Story = {
  args: { text: "ログイン" }
};

export const Detail: Story = {
  args: { text: "詳しくみる" }
};

export const Reserve: Story = {
  args: { text: "予約する" }
};

export const LoginAndReserve: Story = {
  args: { text: "ログインして予約する" }
};

export const Back: Story = {
  args: { text: "戻る" }
};
