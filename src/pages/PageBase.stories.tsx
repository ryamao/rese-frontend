import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { PageBase } from "./PageBase";

const meta = {
  title: "Pages/PageBase",
  component: PageBase,
  tags: ["autodocs"],
  args: {
    onMenuButtonClick: fn(),
    children: "サンプルテキスト"
  },
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof PageBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
