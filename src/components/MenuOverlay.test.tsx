import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MenuOverlay } from "./MenuOverlay";

describe("MenuOverlay", () => {
  test("ゲスト状態での表示", () => {
    const props = createOverlayProps("guest");

    const { getByText } = render(<MenuOverlay {...props} />);

    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Registration")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
  });

  test("ログイン状態での表示", () => {
    const props = createOverlayProps("customer");

    const { getByText } = render(<MenuOverlay {...props} />);

    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Logout")).toBeInTheDocument();
    expect(getByText("Mypage")).toBeInTheDocument();
  });

  test("ゲスト状態でHomeボタンをクリック", async () => {
    const props = createOverlayProps("guest");

    const { getByText } = render(<MenuOverlay {...props} />);

    await userEvent.click(getByText("Home"));

    expect(props.onClickMenuButton).toHaveBeenCalledWith("home");
  });

  test("Registrationボタンをクリック", async () => {
    const props = createOverlayProps("guest");

    const { getByText } = render(<MenuOverlay {...props} />);

    await userEvent.click(getByText("Registration"));

    expect(props.onClickMenuButton).toHaveBeenCalledWith("register");
  });

  test("Loginボタンをクリック", async () => {
    const props = createOverlayProps("guest");

    const { getByText } = render(<MenuOverlay {...props} />);

    await userEvent.click(getByText("Login"));

    expect(props.onClickMenuButton).toHaveBeenCalledWith("login");
  });

  test("ログイン状態でHomeボタンをクリック", async () => {
    const props = createOverlayProps("customer");

    const { getByText } = render(<MenuOverlay {...props} />);

    await userEvent.click(getByText("Home"));

    expect(props.onClickMenuButton).toHaveBeenCalledWith("home");
  });

  test("Logoutボタンをクリック", async () => {
    const props = createOverlayProps("customer");

    const { getByText } = render(<MenuOverlay {...props} />);

    await userEvent.click(getByText("Logout"));

    expect(props.onClickMenuButton).toHaveBeenCalledWith("logout");
  });

  test("Mypageボタンをクリック", async () => {
    const props = createOverlayProps("customer");

    const { getByText } = render(<MenuOverlay {...props} />);

    await userEvent.click(getByText("Mypage"));

    expect(props.onClickMenuButton).toHaveBeenCalledWith("mypage");
  });

  test("MenuButtonをクリック", async () => {
    const props = createOverlayProps("guest");

    const { getByRole } = render(<MenuOverlay {...props} />);

    await userEvent.click(getByRole("button", { name: "メニューを閉じる" }));
    expect(props.onClickMenuButton).toHaveBeenCalledWith("close");
  });
});

function createOverlayProps(authStatus: "guest" | "customer") {
  return {
    authStatus,
    onClickMenuButton: vi.fn()
  };
}
