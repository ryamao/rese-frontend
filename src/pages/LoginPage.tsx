import { PageBase } from "./PageBase";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  function handleMenuButtonClick() {
    alert("TODO: メニューを開く");
  }

  function handleLogin() {
    alert("TODO: ログイン処理");
  }

  return (
    <PageBase onMenuButtonClick={handleMenuButtonClick}>
      <LoginForm onLogin={handleLogin} />
    </PageBase>
  );
}
