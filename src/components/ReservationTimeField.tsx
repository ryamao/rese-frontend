import styled from "@emotion/styled";
import { UseFormRegister } from "react-hook-form";

import { ReservationForm } from "../types";

export interface ReservationTimeFieldProps {
  register: UseFormRegister<ReservationForm>;
}

export function ReservationTimeField({ register }: ReservationTimeFieldProps) {
  return (
    <Select
      {...register("time", {
        required: "時間を選択してください"
      })}
      aria-label="予約時刻"
    >
      {times.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </Select>
  );
}

const partialTimes = Array.from(range(10, 23)).flatMap((hour) => [
  `${hour}:00`,
  `${hour}:30`
]);

const times = [...partialTimes, "24:00"];

function* range(start: number, end: number) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const Select = styled.select`
  width: 100%;
  padding: 0.375rem 0.625rem;
  font-size: 1rem;
  appearance: none;
  border: none;
  border-radius: 0.25rem;
`;
