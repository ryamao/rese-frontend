import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";

import App from "./App";
import { handlers } from "./mocks/handlers";

describe("App", () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("has title", () => {
    render(<App />, { wrapper: MemoryRouter });
    const heading = screen.getByRole("heading", { name: "Rese" });
    expect(heading).toBeInTheDocument();
  });

  test("has register form", () => {
    render(<App />, { wrapper: MemoryRouter });
    expect(
      screen.getByRole("heading", { name: "Registration" })
    ).toBeInTheDocument();
  });

  test.skip("transitions to thanks page", async () => {
    render(<App />, { wrapper: MemoryRouter });
    await userEvent.type(screen.getByLabelText("Username"), "Test User");
    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() => {
      expect(
        screen.getByText("会員登録ありがとうございます")
      ).toBeInTheDocument();
    });
  });
});
