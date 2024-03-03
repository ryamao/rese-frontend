import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  test("renders", () => {
    render(<LoginForm onLogin={vi.fn()} />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("ログイン")).toBeInTheDocument();
  });

  test("ログイン成功", async () => {
    const onLogin = vitest
      .fn()
      .mockImplementation(() => Promise.resolve({ error: undefined }));

    render(<LoginForm onLogin={onLogin} />);

    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByText("ログイン"));
    await waitFor(() =>
      expect(onLogin).toHaveBeenCalledWith("test@example.com", "password")
    );
  });

  test("バリデーション失敗", async () => {
    render(<LoginForm onLogin={vi.fn()} />);

    await userEvent.click(screen.getByText("ログイン"));
    expect(
      await screen.findByText("メールアドレスを入力してください")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("パスワードを入力してください")
    ).toBeInTheDocument();
  });

  test("ログイン失敗", async () => {
    const onLogin = vi.fn().mockImplementation(() =>
      Promise.resolve({
        error: { message: "サンプルメッセージ", errors: {} }
      })
    );

    render(<LoginForm onLogin={onLogin} />);

    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByText("ログイン"));
    expect(await screen.findByText("サンプルメッセージ")).toBeInTheDocument();
  });
});
