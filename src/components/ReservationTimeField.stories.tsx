import { Meta, StoryObj } from "@storybook/react";

import { ReservationTimeField } from "./ReservationTimeField";

const meta = {
  title: "Components/Reservation/ReservationTimeField",
  component: ReservationTimeField,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "blue",
      values: [{ name: "blue", value: "#315dff" }]
    }
  }
} satisfies Meta<typeof ReservationTimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
