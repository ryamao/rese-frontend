import { Meta, StoryObj } from "@storybook/react";

import { ReservationNumberField } from "./ReservationNumberField";

const meta = {
  title: "Components/Reservation/ReservationNumberField",
  component: ReservationNumberField,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "blue",
      values: [{ name: "blue", value: "#315dff" }]
    }
  }
} satisfies Meta<typeof ReservationNumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
