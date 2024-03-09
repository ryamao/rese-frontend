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
      navigate("/thanks");
    }
    return result;
  }

  return (
    <PageBase>
      <Main>
        <RegisterForm onRegister={handleRegister} />
      </Main>
    </PageBase>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 10rem;
`;
