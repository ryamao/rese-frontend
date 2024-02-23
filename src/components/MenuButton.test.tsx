import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { MenuButton } from "./MenuButton";

describe("MenuButton", () => {
  test("click", async () => {
    const onClick = vitest.fn();
    render(<MenuButton onClick={onClick} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test("menu opened", async () => {
    const onClick = vitest.fn();
    render(<MenuButton isMenuOpened={true} onClick={onClick} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
