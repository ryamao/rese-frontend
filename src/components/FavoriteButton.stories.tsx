import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { FavoriteButton } from "./FavoriteButton";

const meta = {
  title: "Components/Shop/FavoriteButton",
  component: FavoriteButton,
  tags: ["autodocs"],
  args: {
    onClick: fn()
  }
} satisfies Meta<typeof FavoriteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unknown: Story = {
  args: {
    favoriteStatus: "unknown"
  }
};

export const Marked: Story = {
  args: {
    favoriteStatus: "marked"
  }
};

export const Unmarked: Story = {
  args: {
    favoriteStatus: "unmarked"
  }
};
