import styled from "@emotion/styled";

import * as styles from "./styles";

export interface ReservationCompletedPanelProps {
  onConfirm?: () => void;
}

export function ReservationCompletedPanel({
  onConfirm
}: ReservationCompletedPanelProps) {
  return (
    <Panel className={styles.whitePanel}>
      <Text>ご予約ありがとうございます</Text>
      <button type="button" className={styles.blueButton} onClick={onConfirm}>
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
  padding: 5.5rem 4rem;

  & > * + * {
    margin-top: 2.5rem;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 1.375rem;
`;
