import { Meta, StoryObj } from "@storybook/react";

import { ShopDetailArea } from "./ShopDetailArea";

const meta = {
  title: "Components/Shop/ShopDetailArea",
  component: ShopDetailArea,
  tags: ["autodocs"],
  args: {
    id: 1,
    name: "仙人",
    image_url: "https://via.placeholder.com/800x500",
    area: { id: 1, name: "東京都" },
    genre: { id: 1, name: "寿司" },
    detail:
      "料理長厳選の食材から作る寿司を用いたコースをぜひお楽しみください。食材・味・価格、お客様の満足度を徹底的に追及したお店です。特別な日のお食事、ビジネス接待まで気軽に使用することができます。",
    favorite_status: "unknown"
  }
} satisfies Meta<typeof ShopDetailArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
