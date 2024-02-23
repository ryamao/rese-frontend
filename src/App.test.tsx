import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import App from "./App";

describe("App", () => {
  test("has title", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: "Vite + React" });
    expect(heading).toBeInTheDocument();
  });

  test("button increments count", async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole("button", { name: "count is 0" });
    user.click(button);
    await waitFor(() => {
      expect(button).toHaveTextContent("count is 1");
    });
  });
});
