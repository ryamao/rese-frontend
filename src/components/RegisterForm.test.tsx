import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RegisterForm } from "./RegisterForm";

describe("RegisterForm", () => {
  test("renders", () => {
    render(<RegisterForm onSubmit={() => {}} onError={() => {}} />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("登録")).toBeInTheDocument();
  });

  test("calls onSubmit with form data", async () => {
    const onSubmit = vitest.fn();
    render(<RegisterForm onSubmit={onSubmit} onError={() => {}} />);
    const username = screen.getByLabelText("Username");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    await userEvent.type(username, "Test User");
    await userEvent.type(email, "test@example.com");
    await userEvent.type(password, "password");
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        password: "password"
      })
    );
  });

  test("calls onError with form errors", async () => {
    const onError = vitest.fn();
    render(<RegisterForm onSubmit={() => {}} onError={onError} />);
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() => expect(onError).toHaveBeenCalled());
  });
});
