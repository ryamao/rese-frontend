import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { ReservationChangeForm } from "./ReservationChangeForm";
import { ReservationData } from "../models";

const meta = {
  title: "Components/Reservation/ReservationChangeForm",
  component: ReservationChangeForm,
  tags: ["autodocs"],
  args: {
    reservation: {
      id: 1,
      reserved_at: "2022-01-01T12:00:00+09:00",
      number_of_guests: 2,
      shop: {
        id: 1,
        name: "Shop Name"
      }
    } as ReservationData,
    onSubmit: fn()
  }
} satisfies Meta<typeof ReservationChangeForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
