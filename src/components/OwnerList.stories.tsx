import { Meta, StoryObj } from "@storybook/react";

import { OwnerList } from "./OwnerList";

const meta = {
  title: "components/Owner/OwnerList",
  component: OwnerList,
  tags: ["autodocs"]
} satisfies Meta<typeof OwnerList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
