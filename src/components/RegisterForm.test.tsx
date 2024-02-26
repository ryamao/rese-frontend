import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";

import { RegisterForm } from "./RegisterForm";

describe("RegisterForm", () => {
  const server = setupServer(
    http.get("*/sanctum/csrf-cookie", async () => {
      return HttpResponse.json(null, {
        status: 204,
        headers: { "Set-Cookie": "XSRF-TOKEN=123" }
      });
    }),
    http.post("*/auth/register", async () => {
      return HttpResponse.json(null, { status: 201 });
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("renders", () => {
    render(<RegisterForm />, { wrapper: BrowserRouter });
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("登録")).toBeInTheDocument();
  });

  test("未入力時にバリデーションエラーが発生する", async () => {
    render(<RegisterForm />, { wrapper: BrowserRouter });
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
    render(<RegisterForm />, { wrapper: BrowserRouter });
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
    render(<RegisterForm />, { wrapper: BrowserRouter });
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
    render(<RegisterForm />, { wrapper: BrowserRouter });
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
