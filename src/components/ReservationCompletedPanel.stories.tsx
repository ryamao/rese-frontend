import { Meta, StoryObj } from "@storybook/react";

import { ReservationCompletedPanel } from "./ReservationCompletedPanel";

const meta = {
  title: "Components/Reservation/ReservationCompletedPanel",
  component: ReservationCompletedPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered"
  }
} satisfies Meta<typeof ReservationCompletedPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
