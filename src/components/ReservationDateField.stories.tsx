import { Meta, StoryObj } from "@storybook/react";

import { ReservationDateField } from "./ReservationDateField";

const meta = {
  title: "Components/Reservation/ReservationDateField",
  component: ReservationDateField,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "blue",
      values: [{ name: "blue", value: "#315dff" }]
    }
  }
} satisfies Meta<typeof ReservationDateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
