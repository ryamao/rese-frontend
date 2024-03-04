import styled from "@emotion/styled";

export function ReservationNumberField() {
  return (
    <Select>
      {[...Array(100)].map((_, i) => (
        <option key={i} value={i + 1}>
          {i + 1}人
        </option>
      ))}
    </Select>
  );
}

const Select = styled.select`
  width: 100%;
  padding: 0.375rem 0.625rem;
  border: none;
  border-radius: 0.25rem;
`;
