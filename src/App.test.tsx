import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

describe("App", () => {
  test("has title", () => {
    render(<App />, { wrapper: BrowserRouter });
    const heading = screen.getByRole("heading", { name: "Rese" });
    expect(heading).toBeInTheDocument();
  });
});
