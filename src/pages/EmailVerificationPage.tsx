import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { blueButton, whitePanel } from "../components/styles";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";

export function EmailVerificationPage() {
  const { setAuthStatus, postResendEmail, logout } = useBackendAccessContext();
  const navigate = useNavigate();

  async function handleResend() {
    const response = await postResendEmail();
    if (response.success) {
      alert("メールを再送信しました");
    } else {
      alert(
        `メールの再送信に失敗しました\n${response.status}: ${response.message}`
      );
    }
  }

  function handleLogout() {
    logout();
    setAuthStatus(undefined);
    navigate("/login");
  }

  return (
    <PageBase>
      <Main>
        <Panel className={whitePanel}>
          <div>
            <Text>ご登録ありがとうございます</Text>
            <Text>
              ご入力いただいたメールアドレスに確認メールを送信しました。メール本文に記載されたURLをクリックして、メールアドレスの確認を完了してください。
            </Text>
            <Text>メールが届いていない場合は再度送信することができます。</Text>
          </div>
          <ButtonLayout>
            <ResendButton className={blueButton} onClick={handleResend}>
              メールを再送信する
            </ResendButton>
            <LogoutButton onClick={handleLogout}>ログアウト</LogoutButton>
          </ButtonLayout>
        </Panel>
      </Main>
    </PageBase>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding-top: 5rem;
`;

const Panel = styled.div`
  max-width: 29rem;
  padding: 3rem;
`;

const Text = styled.p`
  margin: 0;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ButtonLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3rem;
`;

const ResendButton = styled.button`
  font-size: 1rem;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  font-size: 1rem;
  color: #315dff;
  cursor: pointer;
  background: none;
  border: none;
`;
