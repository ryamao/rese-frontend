import { PageBase } from "./PageBase";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  function handleMenuButtonClick() {
    alert("TODO: メニューを開く");
  }

  return (
    <PageBase onMenuButtonClick={handleMenuButtonClick}>
      <RegisterForm
        onSubmit={(data) => {
          alert(JSON.stringify(data, null, 2));
        }}
      />
    </PageBase>
  );
}
