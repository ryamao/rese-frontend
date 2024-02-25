import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
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

export const ThanksPage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText("Username"), "Test User");
    await userEvent.type(canvas.getByLabelText("Email"), "test@example.com");
    await userEvent.type(canvas.getByLabelText("Password"), "password");
    await userEvent.click(canvas.getByText("登録"));
    await canvas.findByText("会員登録ありがとうございます");
  }
};
