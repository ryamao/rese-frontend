import { Meta, StoryObj } from "@storybook/react";

import { ShopReservationArea } from "./ShopReservationArea";

const meta = {
  title: "Components/Reservation/ShopReservationArea",
  component: ShopReservationArea,
  tags: ["autodocs"]
} satisfies Meta<typeof ShopReservationArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
