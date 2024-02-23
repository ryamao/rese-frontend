import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { UsernameInputField } from "./UsernameInputField";

describe("UsernameInputField", () => {
  test("renders input field", () => {
    render(<UsernameInputField />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("renders input field with label", () => {
    render(<UsernameInputField />);
    const label = screen.getByText("Username");
    expect(label).toBeInTheDocument();
  });

  test("filled class is added when input is filled", async () => {
    render(<UsernameInputField />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");
    await userEvent.tab();
    await waitFor(() => expect(input).toHaveClass("filled"));
  });

  test("filled class is removed when input is cleared", async () => {
    render(<UsernameInputField />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");
    await userEvent.tab();
    await userEvent.clear(input);
    await userEvent.tab();
    await waitFor(() => expect(input).not.toHaveClass("filled"));
  });

  test("calls onBlur when input is blurred", async () => {
    const onBlur = vitest.fn();
    render(<UsernameInputField onBlur={onBlur} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
