import { MouseEventHandler } from "react";

import styled from "@emotion/styled";

import * as styles from "./styles";

const Panel = styled.div`
  width: fit-content;
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * + * {
    margin-top: 2.5rem;
  }
`;

const Text = styled.p`
  font-size: 1.25rem;
  letter-spacing: 0.05rem;
  margin: 0;
`;

export interface ThanksPanelProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function ThanksPanel(props: ThanksPanelProps) {
  return (
    <Panel className={styles.whitePanel}>
      <Text>会員登録ありがとうございます</Text>
      <button type="button" className={styles.blueButton} {...props}>
        ログインする
      </button>
    </Panel>
  );
}
