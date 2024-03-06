import { Meta, StoryObj } from "@storybook/react";

import { ShopSearchForm } from "./ShopSearchForm";
import {
  ShopSearchContext,
  useShopSearchState
} from "../contexts/ShopSearchContext";
import { handlers } from "../mocks/handlers";

const meta = {
  title: "Components/Shop/ShopSearchForm",
  component: ShopSearchForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const shopSearch = useShopSearchState();
      return (
        <ShopSearchContext.Provider value={shopSearch}>
          <Story />
        </ShopSearchContext.Provider>
      );
    }
  ],
  parameters: {
    msw: {
      handlers
    }
  },
  args: {
    areas: [
      { id: 1, name: "Area 1" },
      { id: 2, name: "Area 2" }
    ],
    genres: [
      { id: 1, name: "Genre 1" },
      { id: 2, name: "Genre 2" }
    ]
  }
} satisfies Meta<typeof ShopSearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
