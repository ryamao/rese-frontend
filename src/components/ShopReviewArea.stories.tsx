import { Meta, StoryObj } from "@storybook/react";

import { ShopReviewArea } from "./ShopReviewArea";

const meta = {
  title: "Components/Shop/ShopReviewArea",
  component: ShopReviewArea,
  tags: ["autodocs"],
  args: {
    reviews: [
      {
        id: 1,
        customer_name: "ユーザー1",
        rating: 5,
        comment: "サンプルコメント1"
      },
      {
        id: 2,
        customer_name: "ユーザー2",
        rating: 4,
        comment: "サンプルコメント2"
      },
      {
        id: 3,
        customer_name: "ユーザー3",
        rating: 3,
        comment: "サンプルコメント3"
      }
    ]
  }
} satisfies Meta<typeof ShopReviewArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
