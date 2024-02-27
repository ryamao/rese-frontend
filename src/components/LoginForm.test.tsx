import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LoginForm } from "./LoginForm";
import { Client } from "../Client";

describe("LoginForm", () => {
  test("renders", () => {
    render(<LoginForm client={new Client("http://localhost:12345")} />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("ログイン")).toBeInTheDocument();
  });

  test("ログイン成功", async () => {
    const spy = vitest
      .spyOn(Client.prototype, "postAuthLogin")
      .mockImplementation(() => Promise.resolve({ status: 200 }));
    const onLogin = vitest.fn();
    render(
      <LoginForm
        client={new Client("http://localhost:12345")}
        onLogin={onLogin}
      />
    );
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
    const spy = vitest.spyOn(Client.prototype, "postAuthLogin");
    render(<LoginForm client={new Client("http://localhost:12345")} />);
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

  test("ログイン失敗 (認証失敗)", async () => {
    const spy = vitest
      .spyOn(Client.prototype, "postAuthLogin")
      .mockImplementation(() =>
        Promise.resolve({
          status: 422,
          json: {
            message: "サンプルテキスト1",
            errors: {
              email: ["サンプルテキスト2"],
              password: ["サンプルテキスト3"]
            }
          }
        })
      );
    render(<LoginForm client={new Client("http://localhost:12345")} />);
    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByText("ログイン"));
    await waitFor(() =>
      expect(screen.getByText("サンプルテキスト2")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("サンプルテキスト3")).toBeInTheDocument()
    );
    expect(spy).toHaveBeenCalled();
  });

  test("ログイン失敗（その他のエラー）", async () => {
    const spy = vitest
      .spyOn(Client.prototype, "postAuthLogin")
      .mockImplementation(() =>
        Promise.resolve({ status: 500, error: "error" })
      );
    render(<LoginForm client={new Client("http://localhost:12345")} />);
    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByText("ログイン"));
    await waitFor(() => expect(screen.getByText("error")).toBeInTheDocument());
    expect(spy).toHaveBeenCalled();
  });
});
