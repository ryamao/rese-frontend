import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { ThanksPage } from "./ThanksPage";

const meta = {
  title: "Pages/ThanksPage",
  component: ThanksPage,
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
} satisfies Meta<typeof ThanksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
