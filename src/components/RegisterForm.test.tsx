import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RegisterForm } from "./RegisterForm";
import { Client, PostAuthRegisterResult } from "../Client";

describe("RegisterForm", () => {
  const client = new Client("http://localhost:12345");

  test("renders", () => {
    render(<RegisterForm client={client} />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("登録")).toBeInTheDocument();
  });

  test("登録成功", async () => {
    const spy = spyPostAuthRegister({ data: undefined, error: undefined });
    const onRegister = vitest.fn();
    render(<RegisterForm client={client} onRegister={onRegister} />);
    await userEvent.type(screen.getByLabelText("Username"), "test");
    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByText("登録"));
    expect(spy).toHaveBeenCalledWith({
      name: "test",
      email: "test@example.com",
      password: "password"
    });
    await waitFor(() => expect(onRegister).toHaveBeenCalled());
  });

  test("登録失敗", async () => {
    const spy = spyPostAuthRegister({
      data: undefined,
      error: { message: "サンプルテキスト", errors: {} }
    });
    const onRegister = vitest.fn();
    render(<RegisterForm client={client} onRegister={onRegister} />);
    await userEvent.type(screen.getByLabelText("Username"), "test");
    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByText("登録"));
    expect(spy).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.getByText("サンプルテキスト")).toBeInTheDocument()
    );
  });

  test("未入力時にバリデーションエラーが発生する", async () => {
    render(<RegisterForm client={client} />);
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() =>
      expect(screen.getByText("名前を入力してください")).toBeInTheDocument()
    );
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

  test("100文字より多い場合にバリデーションエラーが発生する", async () => {
    render(<RegisterForm client={client} />);
    await userEvent.type(screen.getByLabelText("Username"), "a".repeat(101));
    await userEvent.type(
      screen.getByLabelText("Email"),
      "a".repeat(50) + "@" + "a".repeat(50 - 4) + ".com"
    );
    await userEvent.type(screen.getByLabelText("Password"), "a".repeat(101));
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() =>
      expect(
        screen.getByText("名前は100文字以内で入力してください")
      ).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText("メールアドレスは100文字以内で入力してください")
      ).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText("パスワードは100文字以内で入力してください")
      ).toBeInTheDocument()
    );
  });

  test("メールアドレスの形式が正しくない場合にバリデーションエラーが発生する", async () => {
    render(<RegisterForm client={client} />);
    await userEvent.type(screen.getByLabelText("Email"), "test");
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() =>
      expect(
        screen.getByText("メールアドレスの形式が正しくありません")
      ).toBeInTheDocument()
    );
  });

  test("パスワードが8文字未満の場合にバリデーションエラーが発生する", async () => {
    render(<RegisterForm client={client} />);
    await userEvent.type(screen.getByLabelText("Password"), "pass");
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() =>
      expect(
        screen.getByText("パスワードは8文字以上で入力してください")
      ).toBeInTheDocument()
    );
  });
});

function spyPostAuthRegister(response: PostAuthRegisterResult) {
  return vitest
    .spyOn(Client.prototype, "postAuthRegister")
    .mockImplementation(() => Promise.resolve(response));
}
