import styled from "@emotion/styled";

export function ReservationTimeField() {
  return <Input type="time" />;
}

const Input = styled.input`
  width: 100%;
  padding: 0.375rem 0.625rem;
  border: none;
  border-radius: 0.25rem;
`;
