import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { ShopListPage } from "./ShopListPage";
import { ShopSearchContextProvider } from "../contexts/ShopSearchContext";

const areas = [
  { id: 1, name: "Shibuya" },
  { id: 2, name: "Shinjuku" },
  { id: 3, name: "Ebisu" }
];

const genres = [
  { id: 1, name: "Ramen" },
  { id: 2, name: "Sushi" },
  { id: 3, name: "Italian" }
];

const shopList = [
  {
    id: "1",
    imageUrl: "https://source.unsplash.com/800x600/?restaurant",
    name: "Shop 1",
    area: "Shibuya",
    genre: "Ramen"
  },
  {
    id: "2",
    imageUrl: "https://source.unsplash.com/800x600/?restaurant",
    name: "Shop 2",
    area: "Shinjuku",
    genre: "Sushi"
  },
  {
    id: "3",
    imageUrl: "https://source.unsplash.com/800x600/?restaurant",
    name: "Shop 3",
    area: "Ebisu",
    genre: "Italian"
  },
  {
    id: "4",
    imageUrl: "https://source.unsplash.com/800x600/?restaurant",
    name: "Shop 4",
    area: "Shibuya",
    genre: "Ramen"
  },
  {
    id: "5",
    imageUrl: "https://source.unsplash.com/800x600/?restaurant",
    name: "Shop 5",
    area: "Shinjuku",
    genre: "Sushi"
  },
  {
    id: "6",
    imageUrl: "https://source.unsplash.com/800x600/?restaurant",
    name: "Shop 6",
    area: "Ebisu",
    genre: "Italian"
  }
];

const meta = {
  title: "Pages/ShopListPage",
  component: ShopListPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen"
  },
  decorators: [
    (Story) => (
      <ShopSearchContextProvider>
        <Story />
      </ShopSearchContextProvider>
    )
  ],
  args: {
    authStatus: "guest",
    onClickMenuItem: fn(),
    areas,
    genres,
    shopList
  }
} satisfies Meta<typeof ShopListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
