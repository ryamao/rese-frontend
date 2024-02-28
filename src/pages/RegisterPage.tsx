import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { Client } from "../Client";
import { RegisterForm } from "../components/RegisterForm";
import { AuthContext } from "../providers/AuthContextProvider";

export interface RegisterPageProps {
  client: Client;
}

export function RegisterPage({ client }: RegisterPageProps) {
  const { setCustomer } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleRegister() {
    const auth = await client.getAuthStatus();
    if (auth.status !== "customer") {
      throw new Error("ログインしていません");
    }
    setCustomer(auth.id);
    navigate("/thanks");
  }

  return <RegisterForm client={client} onRegister={handleRegister} />;
}
