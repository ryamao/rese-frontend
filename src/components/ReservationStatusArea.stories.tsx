import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { ReservationStatusArea } from "./ReservationStatusArea";
import { ReservationData } from "../models";

const meta = {
  title: "Components/Dashboard/ReservationStatusArea",
  component: ReservationStatusArea,
  tags: ["autodocs"],
  args: {
    reservations: [
      {
        id: 1,
        shop: {
          name: "店舗1"
        },
        reserved_at: "2021-04-01T17:00:00+09:00",
        number_of_guests: 1
      },
      {
        id: 2,
        shop: {
          name: "店舗2"
        },
        reserved_at: "2021-04-11T18:00:00+09:00",
        number_of_guests: 2
      },
      {
        id: 3,
        shop: {
          name: "店舗3"
        },
        reserved_at: "2021-04-22T19:00:00+09:00",
        number_of_guests: 3
      }
    ] as ReservationData[],
    onRemove: fn()
  }
} satisfies Meta<typeof ReservationStatusArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
