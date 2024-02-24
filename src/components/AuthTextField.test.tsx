import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { AuthTextField } from "./AuthTextField";

describe("AuthTextField with username", () => {
  test("renders input field", () => {
    render(<AuthTextField fieldType="name" />);
    const input = screen.getByLabelText("Username");
    expect(input).toBeInTheDocument();
  });

  test("filled class is added when input is filled", async () => {
    render(<AuthTextField fieldType="name" />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");
    await userEvent.tab();
    await waitFor(() => expect(input).toHaveClass("filled"));
  });

  test("filled class is removed when input is cleared", async () => {
    render(<AuthTextField fieldType="name" />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test");
    await userEvent.tab();
    await userEvent.clear(input);
    await userEvent.tab();
    await waitFor(() => expect(input).not.toHaveClass("filled"));
  });
});

describe("AuthTextField with email", () => {
  test("renders input field", () => {
    render(<AuthTextField fieldType="email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();
  });
});

describe("AuthTextField with password", () => {
  test("renders input field", () => {
    render(<AuthTextField fieldType="password" />);
    const input = screen.getByLabelText("Password");
    expect(input).toBeInTheDocument();
  });
});
