import { Meta, StoryObj } from "@storybook/react";

import { ShopOverview } from "./ShopOverview";

const meta = {
  title: "Components/Shop/ShopOverview",
  component: ShopOverview,
  tags: ["autodocs"],
  args: {
    imageUrl: "https://via.placeholder.com/800x500",
    name: "仙人",
    area: "東京都",
    genre: "寿司"
  }
} satisfies Meta<typeof ShopOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
