import { Meta, StoryObj } from "@storybook/react";

import { FavoriteButton } from "./FavoriteButton";

const meta = {
  title: "Components/Shop/FavoriteButton",
  component: FavoriteButton,
  tags: ["autodocs"],
  args: {
    isFavorite: false
  }
} satisfies Meta<typeof FavoriteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IsFavorite: Story = {
  args: {
    isFavorite: true
  }
};
