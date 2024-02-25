import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import App from "./App";

const meta = {
  title: "Rese",
  component: App,
  parameters: {
    layout: "fullscreen"
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
  tags: ["autodocs"]
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof App>;

export const Default: Story = {};
