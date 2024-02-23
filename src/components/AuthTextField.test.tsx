import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { AuthTextField } from "./AuthTextField";

describe("AuthTextField with username", () => {
  test("renders input field", () => {
    render(<AuthTextField type="username" />);
    const input = screen.getByLabelText("Username");
    expect(input).toBeInTheDocument();
  });

  test("filled class is added when input is filled", async () => {
    render(<AuthTextField type="username" />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");
    await userEvent.tab();
    await waitFor(() => expect(input).toHaveClass("filled"));
  });

  test("filled class is removed when input is cleared", async () => {
    render(<AuthTextField type="username" />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");
    await userEvent.tab();
    await userEvent.clear(input);
    await userEvent.tab();
    await waitFor(() => expect(input).not.toHaveClass("filled"));
  });

  test("calls onBlur when input is blurred", async () => {
    const onBlur = vitest.fn();
    render(<AuthTextField type="username" onBlur={onBlur} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});

describe("AuthTextField with email", () => {
  test("renders input field", () => {
    render(<AuthTextField type="email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();
  });
});

describe("AuthTextField with password", () => {
  test("renders input field", () => {
    render(<AuthTextField type="password" />);
    const input = screen.getByLabelText("Password");
    expect(input).toBeInTheDocument();
  });
});
