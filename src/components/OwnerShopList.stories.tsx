import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { OwnerShopList } from "./OwnerShopList";
import { OwnerShopData } from "../models";

const sampleShops: OwnerShopData[] = [
  {
    id: 1,
    name: "Shop 1",
    detail: "Detail 1",
    image_url: "https://dummyimage.com/300",
    area: {
      id: 1,
      name: "Area 1"
    },
    genre: {
      id: 1,
      name: "Genre 1"
    }
  },
  {
    id: 2,
    name: "Shop 2",
    detail: "Detail 2",
    image_url: "https://dummyimage.com/300",
    area: {
      id: 2,
      name: "Area 2"
    },
    genre: {
      id: 2,
      name: "Genre 2"
    }
  },
  {
    id: 3,
    name: "Shop 3",
    detail: "Detail 3",
    image_url: "https://dummyimage.com/300",
    area: {
      id: 3,
      name: "Area 3"
    },
    genre: {
      id: 3,
      name: "Genre 3"
    }
  }
];

const meta = {
  title: "components/Owner/OwnerShopList",
  component: OwnerShopList,
  tags: ["autodocs"],
  args: {
    shops: sampleShops,
    onCreateShop: fn(),
    onUpdateShop: fn()
  }
} satisfies Meta<typeof OwnerShopList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
