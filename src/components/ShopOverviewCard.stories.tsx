import { Meta, StoryObj } from "@storybook/react";

import { ShopOverviewCard } from "./ShopOverviewCard";

const meta = {
  title: "Components/Shop/ShopOverviewCard",
  component: ShopOverviewCard,
  tags: ["autodocs"],
  args: {
    imageUrl: "https://via.placeholder.com/800x500",
    name: "仙人",
    area: "東京都",
    genre: "寿司",
    favoriteStatus: "unknown"
  }
} satisfies Meta<typeof ShopOverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
