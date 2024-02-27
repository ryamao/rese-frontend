import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LoginForm } from "./LoginForm";
import { Client, PostAuthLoginResult } from "../Client";

describe("LoginForm", () => {
  const client = new Client("http://localhost:12345");

  test("renders", () => {
    render(<LoginForm client={client} />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("ログイン")).toBeInTheDocument();
  });

  test("ログイン成功", async () => {
    const spy = spyPostAuthLogin({ data: undefined, error: undefined });
    const onLogin = vitest.fn();
    render(<LoginForm client={client} onLogin={onLogin} />);
    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByText("ログイン"));
    expect(spy).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password"
    });
    await waitFor(() => expect(onLogin).toHaveBeenCalled());
  });

  test("バリデーション失敗", async () => {
    const spy = spyPostAuthLogin({ data: undefined, error: undefined });
    render(<LoginForm client={client} />);
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
    expect(spy).not.toHaveBeenCalled();
  });

  test("ログイン失敗", async () => {
    const spy = spyPostAuthLogin({
      data: undefined,
      error: { message: "サンプルテキスト", errors: {} }
    });
    render(<LoginForm client={client} />);
    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByText("ログイン"));
    await waitFor(() =>
      expect(screen.getByText("サンプルテキスト")).toBeInTheDocument()
    );
    expect(spy).toHaveBeenCalled();
  });
});

function spyPostAuthLogin(response: PostAuthLoginResult) {
  return vitest
    .spyOn(Client.prototype, "postAuthLogin")
    .mockImplementation(() => Promise.resolve(response));
}
