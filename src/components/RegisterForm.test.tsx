import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RegisterForm } from "./RegisterForm";

describe("RegisterForm", () => {
  test("renders", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("登録")).toBeInTheDocument();
  });

  test("calls onSubmit with form data", async () => {
    const onSubmit = vitest.fn();
    render(<RegisterForm onSubmit={onSubmit} />);
    const username = screen.getByLabelText("Username");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    await userEvent.type(username, "Test User");
    await userEvent.type(email, "test@example.com");
    await userEvent.type(password, "password");
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
        password: "password"
      })
    );
  });

  test("未入力時にバリデーションエラーが発生する", async () => {
    render(<RegisterForm />);
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
    render(<RegisterForm />);
    const username = screen.getByLabelText("Username");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    await userEvent.type(username, "a".repeat(101));
    await userEvent.type(
      email,
      "a".repeat(50) + "@" + "a".repeat(50 - 4) + ".com"
    );
    await userEvent.type(password, "a".repeat(101));
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
    render(<RegisterForm />);
    const email = screen.getByLabelText("Email");
    await userEvent.type(email, "test");
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() =>
      expect(
        screen.getByText("メールアドレスの形式が正しくありません")
      ).toBeInTheDocument()
    );
  });

  test("パスワードが8文字未満の場合にバリデーションエラーが発生する", async () => {
    render(<RegisterForm />);
    const password = screen.getByLabelText("Password");
    await userEvent.type(password, "pass");
    await userEvent.click(screen.getByText("登録"));
    await waitFor(() =>
      expect(
        screen.getByText("パスワードは8文字以上で入力してください")
      ).toBeInTheDocument()
    );
  });
});
