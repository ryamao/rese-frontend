import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { RatingStars } from "./RatingStars";

const meta = {
  title: "Components/Shop/RatingStars",
  component: RatingStars,
  tags: ["autodocs"],
  args: {
    rating: 3,
    onClick: fn()
  }
} satisfies Meta<typeof RatingStars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
