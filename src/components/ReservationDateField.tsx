import styled from "@emotion/styled";

export function ReservationDateField() {
  return <Input type="date" />;
}

const Input = styled.input`
  width: 10rem;
  padding: 0.375rem 0.625rem;
  border: none;
  border-radius: 0.25rem;
`;
