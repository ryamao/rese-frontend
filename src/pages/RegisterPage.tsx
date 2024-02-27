import { useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { Client } from "../Client";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  const client = new Client(import.meta.env.VITE_API_URL);
  const navigate = useNavigate();

  function handleMenuButtonClick() {
    alert("TODO: メニューを開く");
  }

  function handleRegister() {
    navigate("/thanks");
  }

  return (
    <PageBase onMenuButtonClick={handleMenuButtonClick}>
      <RegisterForm client={client} onRegister={handleRegister} />
    </PageBase>
  );
}
