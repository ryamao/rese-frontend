import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test } from "vitest";

import { ThanksPanel } from "./ThanksPanel";

describe("ThanksPanel", () => {
  test("renders", () => {
    render(<ThanksPanel />);
    expect(
      screen.getByText("会員登録ありがとうございます")
    ).toBeInTheDocument();
  });

  test("renders with onConfirm", async () => {
    const onConfirm = vitest.fn();
    render(<ThanksPanel onConfirm={onConfirm} />);
    const button = screen.getByRole("button", { name: "ログインする" });
    await userEvent.click(button);
    await waitFor(() => expect(onConfirm).toHaveBeenCalled());
  });
});
