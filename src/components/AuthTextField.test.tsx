import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { AuthTextField } from "./AuthTextField";

describe("AuthTextField", () => {
  test("renders input field", () => {
    render(<AuthTextField />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("renders input field with label", () => {
    render(<AuthTextField />);
    const label = screen.getByText("Username");
    expect(label).toBeInTheDocument();
  });

  test("filled class is added when input is filled", async () => {
    render(<AuthTextField />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");
    await userEvent.tab();
    await waitFor(() => expect(input).toHaveClass("filled"));
  });

  test("filled class is removed when input is cleared", async () => {
    render(<AuthTextField />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");
    await userEvent.tab();
    await userEvent.clear(input);
    await userEvent.tab();
    await waitFor(() => expect(input).not.toHaveClass("filled"));
  });

  test("calls onBlur when input is blurred", async () => {
    const onBlur = vitest.fn();
    render(<AuthTextField onBlur={onBlur} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
