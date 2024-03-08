import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ReservationStatusCard } from "./ReservationStatusCard";
import { ReservationData } from "../models";

const sampleReservation = {
  id: 1,
  shop: {
    name: "仙人"
  },
  reserved_at: "2021-04-01T17:00:00+09:00",
  number_of_guests: 2
} as ReservationData;

describe("components/ReservationStatusCard", () => {
  test("予約情報が表示される", () => {
    const { getByRole } = render(
      <ReservationStatusCard title="予約1" reservation={sampleReservation} />
    );

    expect(getByRole("heading", { name: "予約1" })).toBeInTheDocument();
    expect(getByRole("columnheader", { name: "Shop" })).toBeInTheDocument();
    expect(getByRole("cell", { name: "仙人" })).toBeInTheDocument();
    expect(getByRole("columnheader", { name: "Date" })).toBeInTheDocument();
    expect(getByRole("cell", { name: "2021-04-01" })).toBeInTheDocument();
    expect(getByRole("columnheader", { name: "Time" })).toBeInTheDocument();
    expect(getByRole("cell", { name: "17:00" })).toBeInTheDocument();
    expect(getByRole("columnheader", { name: "Number" })).toBeInTheDocument();
    expect(getByRole("cell", { name: "2人" })).toBeInTheDocument();
    expect(getByRole("button", { name: "予約キャンセル" })).toBeInTheDocument();
  });

  test("予約削除ボタンがクリックされた時にonRemoveが呼ばれる", async () => {
    const onRemove = vi.fn();
    const { getByRole } = render(
      <ReservationStatusCard
        title="予約1"
        reservation={sampleReservation}
        onRemove={onRemove}
      />
    );

    await userEvent.click(getByRole("button", { name: "予約キャンセル" }));

    await waitFor(() =>
      expect(onRemove).toHaveBeenCalledWith(sampleReservation)
    );
  });
});
