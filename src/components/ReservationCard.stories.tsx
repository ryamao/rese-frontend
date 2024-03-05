import { Meta, StoryObj } from "@storybook/react";

import { ReservationCard } from "./ReservationCard";
import { ReservationData, ShopData } from "../models";

const meta = {
  title: "Components/Reservation/ReservationCard",
  component: ReservationCard,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "blue",
      values: [{ name: "blue", value: "#315dff" }]
    }
  },
  args: {
    reservation: {
      shop: {
        name: "仙人"
      } as ShopData,
      reserved_at: "2021-01-01T12:00:00+09:00",
      number_of_guests: 2
    } as ReservationData
  }
} satisfies Meta<typeof ReservationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
