import styled from "@emotion/styled";

export function BackButton() {
  return <Button>&lt;</Button>;
}

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  font-size: 1.25rem;
  background-color: #fff;
  border: none;
  border-radius: 0.25rem;
  box-shadow: 0.125rem 0.125rem 0.25rem #888;
`;
