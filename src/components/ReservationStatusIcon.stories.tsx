import { Meta, StoryObj } from "@storybook/react";

import { ReservationStatusIcon } from "./ReservationStatusIcon";

const meta = {
  title: "Components/Reservation/ReservationStatusIcon",
  component: ReservationStatusIcon,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "blue",
      values: [{ name: "blue", value: "#315dff" }]
    }
  },
  args: {
    hour: 10,
    minute: 12
  }
} as Meta<typeof ReservationStatusIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
