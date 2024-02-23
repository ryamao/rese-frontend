import { fn } from "@storybook/test";

import { MenuButton } from "./MenuButton";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Rese/MenuButton",
  component: MenuButton,
  tags: ["autodocs"],
  args: { onClick: fn() }
} satisfies Meta<typeof MenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Opened: Story = {
  args: { isMenuOpened: true }
};
