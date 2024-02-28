import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { Client } from "../Client";
import { LoginForm } from "../components/LoginForm";
import { AuthContext } from "../providers/AuthContextProvider";

export interface LoginPageProps {
  client: Client;
}

export function LoginPage({ client }: LoginPageProps) {
  const { setCustomer } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin() {
    const auth = await client.getAuthStatus();
    if (auth.status !== "customer") {
      throw new Error("ログインしていません");
    }
    setCustomer(auth.id);
    navigate("/mypage");
  }

  return <LoginForm client={client} onLogin={handleLogin} />;
}
