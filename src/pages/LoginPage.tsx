import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { LoginForm } from "../components/LoginForm";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";

export function LoginPage() {
  const { login, setAuthStatus } = useBackendAccessContext();
  const navigate = useNavigate();

  async function handleLogin(email: string, password: string) {
    const result = await login({ email, password });
    if (!result.error) {
      setAuthStatus(undefined);
      navigate("/mypage");
    }
    return result;
  }

  return (
    <PageBase>
      <Main>
        <LoginForm onLogin={handleLogin} />
      </Main>
    </PageBase>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 10rem;
`;
