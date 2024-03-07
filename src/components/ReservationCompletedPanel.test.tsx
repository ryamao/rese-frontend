import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ReservationCompletedPanel } from "./ReservationCompletedPanel";

describe("ReservationCompletedPanel", () => {
  test("要素の描画", () => {
    const { getByText, getByRole } = render(<ReservationCompletedPanel />);
    expect(getByText("ご予約ありがとうございます")).toBeInTheDocument();
    expect(getByRole("button", { name: "戻る" })).toBeInTheDocument();
  });

  test("戻るボタンをクリック", async () => {
    const onConfirm = vi.fn();
    const { getByRole } = render(
      <ReservationCompletedPanel onConfirm={onConfirm} />
    );
    await userEvent.click(getByRole("button", { name: "戻る" }));
    await waitFor(() => expect(onConfirm).toHaveBeenCalled());
  });
});
