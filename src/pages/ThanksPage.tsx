import { PageBase } from "./PageBase";
import { ThanksPanel } from "../components/ThanksPanel";

export function ThanksPage() {
  function handleMenuButtonClick() {
    alert("TODO: メニューを開く");
  }

  function handleConfirm() {
    alert("TODO: 登録ページの遷移前に戻る");
  }

  return (
    <PageBase onMenuButtonClick={handleMenuButtonClick}>
      <ThanksPanel onConfirm={handleConfirm} />
    </PageBase>
  );
}
