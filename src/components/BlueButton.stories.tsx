import { ButtonHTMLAttributes, FC } from "react";

import { fn } from "@storybook/test";

import * as styles from "./styles";

import type { Meta, StoryObj } from "@storybook/react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <button className={styles.blueButton} {...props}></button>;
};

const meta = {
  title: "Components/Common/BlueButton",
  component: Button,
  tags: ["autodocs"],
  args: { onClick: fn() }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Register: Story = {
  args: { children: "登録" }
};

export const Thanks: Story = {
  args: { children: "ログインする" }
};

export const Login: Story = {
  args: { children: "ログイン" }
};

export const Detail: Story = {
  args: { children: "詳しくみる" }
};

export const Back: Story = {
  args: { children: "戻る" }
};
