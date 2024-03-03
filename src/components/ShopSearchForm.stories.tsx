import { Meta, StoryObj } from "@storybook/react";

import { ShopSearchForm } from "./ShopSearchForm";
import { Client } from "../Client";
import {
  ApiAccessContext,
  useApiAccessState
} from "../contexts/ApiAccessContext";
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
      const apiAccess = useApiAccessState(new Client());
      const shopSearch = useShopSearchState();
      return (
        <ApiAccessContext.Provider value={apiAccess}>
          <ShopSearchContext.Provider value={shopSearch}>
            <Story />
          </ShopSearchContext.Provider>
        </ApiAccessContext.Provider>
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
