import { useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  const navigate = useNavigate();

  function handleMenuButtonClick() {
    alert("TODO: メニューを開く");
  }

  function handleSubmit() {
    navigate("/thanks");
  }

  return (
    <PageBase onMenuButtonClick={handleMenuButtonClick}>
      <RegisterForm onSubmit={handleSubmit} />
    </PageBase>
  );
}
