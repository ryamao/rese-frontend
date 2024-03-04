import { Meta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { RegisterPage } from "./RegisterPage";
import { HttpClient } from "../HttpClient";
import { handlers } from "../mocks/handlers";

const meta = {
  title: "Pages/RegisterPage",
  component: RegisterPage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ],
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers
    }
  },
  args: {
    client: new HttpClient()
  }
} satisfies Meta<typeof RegisterPage>;
export default meta;

export const Default = {};
