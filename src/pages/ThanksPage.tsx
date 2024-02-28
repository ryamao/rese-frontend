import { useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { ThanksPanel } from "../components/ThanksPanel";

export function ThanksPage() {
  const navigate = useNavigate();

  function handleMenuButtonClick() {
    alert("TODO: メニューを開く");
  }

  function handleConfirm() {
    navigate("/mypage");
  }

  return (
    <PageBase onMenuButtonClick={handleMenuButtonClick}>
      <ThanksPanel onConfirm={handleConfirm} />
    </PageBase>
  );
}
