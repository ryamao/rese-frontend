import styled from "@emotion/styled";

export function ReservationRemovalButton() {
  return (
    <Button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        stroke="#fff"
      >
        <circle cx="50" cy="50" r="45" fill="none" strokeWidth="9" />
        <line x1="33" y1="33" x2="67" y2="67" strokeWidth="9" />
        <line x1="33" y1="67" x2="67" y2="33" strokeWidth="9" />
      </svg>
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
`;
