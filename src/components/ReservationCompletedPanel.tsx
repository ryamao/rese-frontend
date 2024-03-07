import styled from "@emotion/styled";

import * as styles from "./styles";

export function ReservationCompletedPanel() {
  return (
    <Panel className={styles.whitePanel}>
      <Text>ご予約ありがとうございます</Text>
      <button type="button" className={styles.blueButton}>
        戻る
      </button>
    </Panel>
  );
}

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 5rem 4rem;

  & > * + * {
    margin-top: 2.5rem;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 1.375rem;
`;
