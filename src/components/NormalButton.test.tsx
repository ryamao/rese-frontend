import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { NormalButton } from "./NormalButton";

describe("NormalButton", () => {
  test("click", async () => {
    const onClick = vitest.fn();
    render(<NormalButton text="ログイン" onClick={onClick} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
