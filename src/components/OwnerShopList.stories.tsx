import { Meta, StoryObj } from "@storybook/react";

import { OwnerShopList } from "./OwnerShopList";

const meta = {
  title: "components/Owner/OwnerShopList",
  component: OwnerShopList,
  tags: ["autodocs"]
} satisfies Meta<typeof OwnerShopList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
