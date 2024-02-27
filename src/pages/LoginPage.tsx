import { PageBase } from "./PageBase";
import { Client } from "../Client";
import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  function handleMenuButtonClick() {
    alert("TODO: メニューを開く");
  }

  function handleLogin() {
    alert("TODO: ログイン処理");
  }

  const client = new Client(import.meta.env.VITE_API_URL);

  return (
    <PageBase onMenuButtonClick={handleMenuButtonClick}>
      <LoginForm client={client} onLogin={handleLogin} />
    </PageBase>
  );
}
