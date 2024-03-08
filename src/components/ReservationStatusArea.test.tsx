import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ReservationStatusArea } from "./ReservationStatusArea";
import { ReservationData } from "../models";

const sampleReservations = [
  {
    id: 1,
    shop: {
      name: "店舗1"
    },
    reserved_at: "2021-04-01T17:00:00+09:00",
    number_of_guests: 1
  },
  {
    id: 2,
    shop: {
      name: "店舗2"
    },
    reserved_at: "2021-04-11T18:00:00+09:00",
    number_of_guests: 2
  },
  {
    id: 3,
    shop: {
      name: "店舗3"
    },
    reserved_at: "2021-04-22T19:00:00+09:00",
    number_of_guests: 3
  }
] as ReservationData[];

describe("components/ReservationStatusArea", () => {
  test("予約状況が表示される", () => {
    const { getByRole, getAllByRole } = render(
      <ReservationStatusArea reservations={sampleReservations} />
    );

    expect(getByRole("heading", { name: "予約状況" })).toBeInTheDocument();
    expect(getAllByRole("listitem")).toHaveLength(3);
  });

  test("予約削除ボタンがクリックされた時にonRemoveが呼ばれる", async () => {
    const onRemove = vi.fn();
    const { getAllByRole } = render(
      <ReservationStatusArea
        reservations={sampleReservations}
        onRemove={onRemove}
      />
    );
    const removeButtons = getAllByRole("button", { name: "予約キャンセル" });

    Array.from({ length: 3 }).forEach(async (_, index) => {
      await userEvent.click(removeButtons[index]);
      await waitFor(() =>
        expect(onRemove).toHaveBeenCalledWith(sampleReservations[index])
      );
    });
  });
});
