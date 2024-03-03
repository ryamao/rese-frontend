import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RegisterForm } from "./RegisterForm";

describe("RegisterForm", () => {
  test("renders", () => {
    render(<RegisterForm onRegister={vi.fn()} />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("登録")).toBeInTheDocument();
  });

  test("登録成功", async () => {
    const onRegister = vitest
      .fn()
      .mockImplementation(() => Promise.resolve({ error: undefined }));

    render(<RegisterForm onRegister={onRegister} />);

    await userEvent.type(screen.getByLabelText("Username"), "test");
    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() =>
      expect(onRegister).toHaveBeenCalledWith(
        "test",
        "test@example.com",
        "password"
      )
    );
  });

  test("登録失敗", async () => {
    const onRegister = vitest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ error: { message: "サンプルテキスト", errors: {} } })
      );

    render(<RegisterForm onRegister={onRegister} />);

    await userEvent.type(screen.getByLabelText("Username"), "test");
    await userEvent.type(screen.getByLabelText("Email"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() =>
      expect(screen.getByText("サンプルテキスト")).toBeInTheDocument()
    );
  });

  test("未入力時にバリデーションエラーが発生する", async () => {
    render(<RegisterForm onRegister={vi.fn()} />);

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
    render(<RegisterForm onRegister={vi.fn()} />);

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
    render(<RegisterForm onRegister={vi.fn()} />);

    await userEvent.type(screen.getByLabelText("Email"), "test");
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() =>
      expect(
        screen.getByText("メールアドレスの形式が正しくありません")
      ).toBeInTheDocument()
    );
  });

  test("パスワードが8文字未満の場合にバリデーションエラーが発生する", async () => {
    render(<RegisterForm onRegister={vi.fn()} />);
    await userEvent.type(screen.getByLabelText("Password"), "pass");
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() =>
      expect(
        screen.getByText("パスワードは8文字以上で入力してください")
      ).toBeInTheDocument()
    );
  });
});
