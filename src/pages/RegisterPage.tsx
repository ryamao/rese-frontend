import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { RegisterForm } from "../components/RegisterForm";
import { useBackendAccessContext } from "../contexts/BackendAccessContext";

export function RegisterPage() {
  const { register, setAuthStatus } = useBackendAccessContext();
  const navigate = useNavigate();

  async function handleRegister(name: string, email: string, password: string) {
    const result = await register({ name, email, password });
    if (!result.error) {
      setAuthStatus(undefined);
      navigate("/verify-email");
    }
    return result;
  }

  return (
    <PageBase>
      <Main>
        <Panel>
          <RegisterForm onRegister={handleRegister} />
        </Panel>
      </Main>
    </PageBase>
  );
}

const Main = styled.main`
  margin-top: 10rem;

  @media (width <= 768px) {
    margin-top: 5rem;
  }
`;

const Panel = styled.div`
  max-width: 24rem;
  margin: 0 auto;
`;
