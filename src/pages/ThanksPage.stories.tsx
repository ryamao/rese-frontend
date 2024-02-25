import { Meta, StoryObj } from "@storybook/react";

import { ThanksPage } from "./ThanksPage";

const meta = {
  title: "Pages/ThanksPage",
  component: ThanksPage,
  tags: ["autodocs"]
} satisfies Meta<typeof ThanksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
