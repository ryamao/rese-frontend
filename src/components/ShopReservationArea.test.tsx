import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";

import { ShopReservationArea } from "./ShopReservationArea";
import { ReservationData } from "../models";

describe("ShopReservationArea", () => {
  test("必要な要素が表示されている", () => {
    const reservations = [
      {
        id: 1,
        shop: { name: "Shop 1" },
        reserved_at: "2021-07-01T18:00:00",
        number_of_guests: 2
      },
      {
        id: 2,
        shop: { name: "Shop 2" },
        reserved_at: "2021-07-01T19:00:00",
        number_of_guests: 3
      }
    ] as ReservationData[];
    const { getByRole, getByLabelText, getByText } = render(
      <ShopReservationArea reservations={reservations} />
    );

    expect(getByRole("heading")).toHaveTextContent("予約");
    expect(getByLabelText("予約日")).toBeInTheDocument();
    expect(getByLabelText("予約時刻")).toBeInTheDocument();
    expect(getByLabelText("予約人数")).toBeInTheDocument();
    expect(getByRole("button", { name: "予約する" })).toBeInTheDocument();
    expect(getByText("Shop 1")).toBeInTheDocument();
    expect(getByText("Shop 2")).toBeInTheDocument();
  });

  test("予約ボタンがクリックされたときに onSubmit が呼ばれる", async () => {
    const datetime = dayjs().add(1, "day").startOf("day").add(18, "hour");
    const onSubmit = vi.fn();
    const { getByRole, getByLabelText } = render(
      <ShopReservationArea reservations={[]} onSubmit={onSubmit} />
    );

    fireEvent.change(getByLabelText("予約日"), {
      target: { value: datetime.format("YYYY-MM-DD") }
    });
    await userEvent.selectOptions(
      getByLabelText("予約時刻"),
      datetime.format("HH:mm")
    );
    await userEvent.selectOptions(getByLabelText("予約人数"), "2");
    await userEvent.click(getByRole("button", { name: "予約する" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  });

  test("予約エラーが表示される", async () => {
    const { getByRole, findByText } = render(
      <ShopReservationArea reservations={[]} />
    );

    await userEvent.click(getByRole("button", { name: "予約する" }));

    expect(
      await findByText("日付を選択してください", { exact: false })
    ).toBeInTheDocument();
  });
});
