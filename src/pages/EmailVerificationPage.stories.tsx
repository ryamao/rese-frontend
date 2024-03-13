import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { EmailVerificationPage } from "./EmailVerificationPage";

const meta = {
  title: "Pages/EmailVerificationPage",
  component: EmailVerificationPage,
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
} satisfies Meta<typeof EmailVerificationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
