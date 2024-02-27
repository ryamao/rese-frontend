import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { ThanksPanel } from "./ThanksPanel";

const meta = {
  title: "Components/Auth/ThanksPanel",
  component: ThanksPanel,
  tags: ["autodocs"],
  args: {
    onClick: fn()
  }
} satisfies Meta<typeof ThanksPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
