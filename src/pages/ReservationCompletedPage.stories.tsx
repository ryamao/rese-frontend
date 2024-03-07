import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { ReservationCompletedPage } from "./ReservationCompletedPage";

const meta = {
  title: "Pages/ReservationCompletedPage",
  component: ReservationCompletedPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
} satisfies Meta<typeof ReservationCompletedPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
