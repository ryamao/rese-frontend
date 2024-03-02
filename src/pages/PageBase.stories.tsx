import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { PageBase } from "./PageBase";

const meta = {
  title: "Pages/PageBase",
  component: PageBase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  args: {
    authStatus: "guest",
    onClickMenuItem: fn(),
    children: "Hello, world!"
  }
} satisfies Meta<typeof PageBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
