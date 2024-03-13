import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ShopOverviewCard } from "./ShopOverviewCard";
import {
  BackendAccessContext,
  createBackendAccessContextType
} from "../contexts/BackendAccessContext";
import {
  ShopSearchContext,
  useShopSearchState
} from "../contexts/ShopSearchContext";
import { HttpClient } from "../HttpClient";
import { ShopData } from "../models";

const meta = {
  title: "Components/Shop/ShopOverviewCard",
  component: ShopOverviewCard,
  tags: ["autodocs"],
  args: {
    shop: {
      id: 1,
      image_url: "https://via.placeholder.com/800x500",
      name: "仙人",
      area: { id: 1, name: "東京都" },
      genre: { id: 1, name: "寿司" },
      favorite_status: "unknown"
    } as ShopData,
    onClickDetailButton: fn()
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      const backendAccess = createBackendAccessContextType({
        httpClient: new HttpClient(),
        authStatus: { status: "customer", id: 1, has_verified_email: true },
        setAuthStatus: fn()
      });
      const shopSearch = useShopSearchState();
      return (
        <QueryClientProvider client={queryClient}>
          <BackendAccessContext.Provider value={backendAccess}>
            <ShopSearchContext.Provider value={shopSearch}>
              <Story />
            </ShopSearchContext.Provider>
          </BackendAccessContext.Provider>
        </QueryClientProvider>
      );
    }
  ]
} satisfies Meta<typeof ShopOverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
