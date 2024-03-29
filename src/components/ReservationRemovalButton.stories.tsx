import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { ReservationRemovalButton } from "./ReservationRemovalButton";

const meta = {
  title: "Components/Reservation/ReservationRemovalButton",
  component: ReservationRemovalButton,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "blue",
      values: [{ name: "blue", value: "#315dff" }]
    }
  },
  args: {
    onClick: fn()
  }
} satisfies Meta<typeof ReservationRemovalButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
