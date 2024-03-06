import styled from "@emotion/styled";
import dayjs from "dayjs";
import { UseFormRegister } from "react-hook-form";

import { ReservationForm } from "../types";

export interface ReservationDateFieldProps {
  register: UseFormRegister<ReservationForm>;
}

export function ReservationDateField({ register }: ReservationDateFieldProps) {
  const today = dayjs().format("YYYY-MM-DD");
  return (
    <Input
      type="date"
      min={today}
      {...register("date", {
        required: "日付を選択してください"
      })}
      aria-label="予約日"
    />
  );
}

const Input = styled.input`
  width: 100%;
  padding: 0.375rem 0.625rem;
  border: none;
  border-radius: 0.25rem;
`;
