import { Meta, StoryObj } from "@storybook/react";

import { FavoriteShopsArea } from "./FavoriteShopsArea";
import { ShopData } from "../models";

const meta = {
  title: "Components/Dashboard/FavoriteShopsArea",
  component: FavoriteShopsArea,
  tags: ["autodocs"],
  args: {
    favorites: Array.from({ length: 10 }, (_, i) => i).map((i) => ({
      id: i,
      name: `店舗${i}`,
      area: { id: i, name: `エリア${i}` },
      genre: { id: i, name: `ジャンル${i}` },
      image_url: "https://via.placeholder.com/800x500",
      detail: `詳細${i}`,
      favorite_status: "marked"
    })) as ShopData[]
  }
} satisfies Meta<typeof FavoriteShopsArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
