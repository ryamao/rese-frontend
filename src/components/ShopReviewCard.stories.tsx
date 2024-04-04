import { Meta, StoryObj } from "@storybook/react";

import { ShopReviewCard } from "./ShopReviewCard";
import { ShopData } from "../models";

const meta = {
  title: "Components/Shop/ShopReviewCard",
  component: ShopReviewCard,
  tags: ["autodocs"],
  args: {
    shop: {
      id: 1,
      name: "飲食店1",
      area: { id: 1, name: "東京都" },
      genre: { id: 1, name: "寿司" },
      image_url: "https://via.placeholder.com/800x500",
      detail: "サンプルテキスト1",
      favorite_status: "marked"
    } as ShopData
  }
} satisfies Meta<typeof ShopReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
