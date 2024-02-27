import { Meta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { RegisterPage } from "./RegisterPage";
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
    msw: {
      handlers
    }
  }
} satisfies Meta<typeof RegisterPage>;
export default meta;

export const Default = {};
