import { Meta, StoryObj } from "@storybook/react";

import { ShopReservationArea } from "./ShopReservationArea";
import { ReservationData, ShopData } from "../models";

const sampleReservations = [
  {
    id: 1,
    shop: {
      name: "仙人"
    } as ShopData,
    reserved_at: "2021-12-31T12:00:00+09:00",
    number_of_guests: 2
  },
  {
    id: 2,
    shop: {
      name: "仙人"
    } as ShopData,
    reserved_at: "2021-12-31T12:00:00+09:00",
    number_of_guests: 2
  },
  {
    id: 3,
    shop: {
      name: "仙人"
    } as ShopData,
    reserved_at: "2021-12-31T12:00:00+09:00",
    number_of_guests: 2
  }
] as ReservationData[];

const meta = {
  title: "Components/Reservation/ShopReservationArea",
  component: ShopReservationArea,
  tags: ["autodocs"],
  args: {
    reservations: sampleReservations
  }
} satisfies Meta<typeof ShopReservationArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
