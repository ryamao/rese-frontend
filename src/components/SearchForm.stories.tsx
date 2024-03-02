import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import { SearchForm } from "./SearchForm";
import { ShopSearchContextProvider } from "../contexts/ShopSearchContext";

const meta = {
  title: "Components/Shop/SearchForm",
  component: SearchForm,
  tags: ["autodocs"],
  args: {
    areas: [
      { id: 1, name: "Area1" },
      { id: 2, name: "Area2" },
      { id: 3, name: "Area3" }
    ],
    genres: [
      { id: 1, name: "Genre1" },
      { id: 2, name: "Genre2" },
      { id: 3, name: "Genre3" },
      { id: 4, name: "Genre4" },
      { id: 5, name: "Genre5" }
    ]
  },
  decorators: [
    (Story) => (
      <ShopSearchContextProvider>
        <Story />
      </ShopSearchContextProvider>
    )
  ]
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const areaSelect = canvas.getByRole("combobox", { name: "Area" });
    const genreSelect = canvas.getByRole("combobox", { name: "Genre" });
    const searchField = canvas.getByRole("searchbox", { name: "Shop Name" });

    await userEvent.selectOptions(areaSelect, "2");
    await userEvent.selectOptions(genreSelect, "3");
    await userEvent.type(searchField, "test");
  }
};
