import { ChangeEventHandler } from "react";
import { useRef, useState } from "react";

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { FaUser } from "react-icons/fa";

export interface UsernameInputFieldProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: () => void;
  ref?: React.RefObject<HTMLInputElement>;
  name?: string;
}

const iconStyle = css`
  width: 1.5rem;
  height: 1.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: top;

  & > * + * {
    margin-left: 0.5rem;
  }
`;

const Layout = styled.div`
  position: relative;
  width: 100%;

  & input:focus + label,
  & input.filled + label {
    top: -1rem;
    font-size: 0.75rem;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  color: #888;
  font-size: 1rem;
  transition: 0.15s;
  pointer-events: none;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 1rem;

  &:focus-visible {
    outline: none;
  }
`;

export function UsernameInputField(props: UsernameInputFieldProps) {
  let ref = useRef<HTMLInputElement>(null);
  ref = props.ref || ref;

  const [filled, setFilled] = useState(false);

  const onBlur = () => {
    setFilled(!!ref.current?.value);
    props.onBlur?.();
  };

  return (
    <Wrapper>
      <FaUser className={iconStyle} />
      <Layout>
        <Input
          type="text"
          id={props.name}
          className={filled ? "filled" : ""}
          {...props}
          onBlur={onBlur}
          ref={ref}
        />
        <Label htmlFor={props.name}>Username</Label>
      </Layout>
    </Wrapper>
  );
}
