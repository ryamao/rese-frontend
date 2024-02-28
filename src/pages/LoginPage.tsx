import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { Client } from "../Client";
import { LoginForm } from "../components/LoginForm";
import { AuthContext } from "../providers/AuthContextProvider";

export interface LoginPageProps {
  client: Client;
}

export function LoginPage({ client }: LoginPageProps) {
  const { setCustomer } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleMenuButtonClick() {
    alert("TODO: メニューを開く");
  }

  async function handleLogin() {
    const auth = await client.getAuthStatus();
    if (auth.status !== "customer") {
      throw new Error("ログインしていません");
    }
    setCustomer(auth.id);
    navigate("/mypage");
  }

  return (
    <PageBase onMenuButtonClick={handleMenuButtonClick}>
      <LoginForm client={client} onLogin={handleLogin} />
    </PageBase>
  );
}
