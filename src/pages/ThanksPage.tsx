import { useNavigate } from "react-router-dom";

import { ThanksPanel } from "../components/ThanksPanel";

export function ThanksPage() {
  const navigate = useNavigate();

  function handleConfirm() {
    navigate("/mypage");
  }

  return <ThanksPanel onConfirm={handleConfirm} />;
}
