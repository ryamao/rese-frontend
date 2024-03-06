import { Meta, StoryObj } from "@storybook/react";
import {
  fn,
  userEvent,
  waitFor,
  within,
  expect,
  fireEvent
} from "@storybook/test";
import dayjs from "dayjs";

import { ShopReservationArea } from "./ShopReservationArea";
import { ShopData } from "../models";

const meta = {
  title: "Components/Reservation/ShopReservationArea",
  component: ShopReservationArea,
  tags: ["autodocs"],
  args: {
    authStatus: { status: "customer", id: 1 },
    reservations: [],
    onSubmit: fn(),
    onClickLogin: fn()
  }
} satisfies Meta<typeof ShopReservationArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithReservations: Story = {
  args: {
    reservations: [
      {
        id: 1,
        shop: {
          name: "仙人"
        } as ShopData,
        reserved_at: "2021-12-31T12:00:00+09:00",
        number_of_guests: 2
      },
      {
        id: 2,
        shop: {
          name: "仙人"
        } as ShopData,
        reserved_at: "2021-12-31T12:00:00+09:00",
        number_of_guests: 2
      },
      {
        id: 3,
        shop: {
          name: "仙人"
        } as ShopData,
        reserved_at: "2021-12-31T12:00:00+09:00",
        number_of_guests: 2
      }
    ]
  }
};

export const WithError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "予約する" }));
    await waitFor(() =>
      expect(
        canvas.getByText("日付を選択してください", {
          exact: false
        })
      ).toBeInTheDocument()
    );
  }
};

export const WithSubmit: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const datetime = dayjs().add(1, "day").startOf("day").add(12, "hour");
    await fireEvent.change(canvas.getByLabelText("予約日"), {
      target: { value: datetime.format("YYYY-MM-DD") }
    });
    await userEvent.selectOptions(
      canvas.getByLabelText("予約時刻"),
      datetime.format("HH:mm")
    );
    await userEvent.selectOptions(canvas.getByLabelText("予約人数"), "2");
    await userEvent.click(canvas.getByRole("button", { name: "予約する" }));
    await waitFor(() =>
      expect(args.onSubmit).toHaveBeenCalledWith({
        reservedAt: datetime,
        numberOfGuests: 2
      })
    );
  }
};

export const WithLogin: Story = {
  args: {
    authStatus: { status: "guest" }
  }
};
