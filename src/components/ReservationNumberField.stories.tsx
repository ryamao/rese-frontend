import { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";

import { ReservationNumberField } from "./ReservationNumberField";
import { ReservationForm } from "../types";

function Wrapper() {
  const { register } = useForm<ReservationForm>();
  return <ReservationNumberField register={register} />;
}

const meta = {
  title: "Components/Reservation/ReservationNumberField",
  component: Wrapper,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "blue",
      values: [{ name: "blue", value: "#315dff" }]
    }
  }
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
