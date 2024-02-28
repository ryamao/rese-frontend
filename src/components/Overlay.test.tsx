import { render } from "@testing-library/react";

import { Overlay } from "./Overlay";

describe("components/Overlay", () => {
  test("renders links for guest", () => {
    const props = createOverlayProps("guest");

    const { getByText } = render(<Overlay {...props} />);

    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Registration")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
  });

  test("renders links for customer", () => {
    const props = createOverlayProps("customer");

    const { getByText } = render(<Overlay {...props} />);

    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Logout")).toBeInTheDocument();
    expect(getByText("Mypage")).toBeInTheDocument();
  });
});

function createOverlayProps(authStatus: "guest" | "customer") {
  return {
    authStatus,
    onMenuClose: vi.fn(),
    onHome: vi.fn(),
    onRegister: vi.fn(),
    onLogin: vi.fn(),
    onLogout: vi.fn(),
    onMypage: vi.fn()
  };
}
