import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";

import { LoginForm } from "./LoginForm";
import { handlers } from "../mocks/handlers";

describe("LoginForm", () => {
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("renders", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("ログイン")).toBeInTheDocument();
  });

  test("バリデーション成功時にonLoginが呼び出される", async () => {
    const onLogin = vitest.fn();
    render(<LoginForm onLogin={onLogin} />);
    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByText("ログイン"));
    await waitFor(() => expect(onLogin).toHaveBeenCalled());
  });

  test("未入力時にバリデーションエラーが発生する", async () => {
    render(<LoginForm />);
    await userEvent.click(screen.getByText("ログイン"));
    await waitFor(() =>
      expect(
        screen.getByText("メールアドレスを入力してください")
      ).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText("パスワードを入力してください")
      ).toBeInTheDocument()
    );
  });
});
