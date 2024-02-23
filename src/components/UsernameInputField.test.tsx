import { render, screen } from "@testing-library/react";

import { UsernameInputField } from "./UsernameInputField";

describe("UsernameInputField", () => {
  test("renders an input field with a placeholder", () => {
    render(<UsernameInputField />);
    const input = screen.getByPlaceholderText("Username");
    expect(input).toBeInTheDocument();
  });
});
