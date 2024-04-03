import { Meta, StoryObj } from "@storybook/react";

import { ShopReviewCard } from "./ShopReviewCard";
import { ReservationData } from "../models";

const meta = {
  title: "Components/Shop/ShopReviewCard",
  component: ShopReviewCard,
  tags: ["autodocs"],
  args: {
    reservation: {
      id: 1,
      shop: {
        name: "仙人"
      },
      reserved_at: "2021-04-01T17:00:00+09:00",
      number_of_guests: 1
    } as ReservationData
  }
} satisfies Meta<typeof ShopReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
