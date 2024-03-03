import { Meta, StoryObj } from "@storybook/react";

import { ShopOverviewCard } from "./ShopOverviewCard";
import { Client } from "../Client";
import {
  BackendAccessContext,
  useBackendAccessState
} from "../contexts/BackendAccessContext";
import {
  ShopSearchContext,
  useShopSearchState
} from "../contexts/ShopSearchContext";

const meta = {
  title: "Components/Shop/ShopOverviewCard",
  component: ShopOverviewCard,
  tags: ["autodocs"],
  args: {
    id: 1,
    imageUrl: "https://via.placeholder.com/800x500",
    name: "仙人",
    area: { id: 1, name: "東京都" },
    genre: { id: 1, name: "寿司" },
    favoriteStatus: "unknown"
  },
  decorators: [
    (Story) => {
      const backendAccess = useBackendAccessState(new Client());
      const shopSearch = useShopSearchState();
      return (
        <BackendAccessContext.Provider value={backendAccess}>
          <ShopSearchContext.Provider value={shopSearch}>
            <Story />
          </ShopSearchContext.Provider>
        </BackendAccessContext.Provider>
      );
    }
  ]
} satisfies Meta<typeof ShopOverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
