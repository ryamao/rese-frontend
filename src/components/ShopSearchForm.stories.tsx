import { Meta, StoryObj } from "@storybook/react";

import { ShopSearchForm } from "./ShopSearchForm";
import { Client } from "../Client";
import {
  BackendAccessContext,
  useBackendAccessState
} from "../contexts/BackendAccessContext";
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
  ],
  parameters: {
    msw: {
      handlers
    }
  }
} satisfies Meta<typeof ShopSearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
