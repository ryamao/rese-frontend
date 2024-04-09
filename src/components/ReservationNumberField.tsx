import styled from "@emotion/styled";
import { UseFormRegister } from "react-hook-form";

import { ReservationForm } from "../types";

export interface ReservationNumberFieldProps {
  register: UseFormRegister<ReservationForm>;
}

export function ReservationNumberField({
  register
}: ReservationNumberFieldProps) {
  return (
    <Select
      {...register("number", {
        required: "人数を選択してください"
      })}
      aria-label="予約人数"
    >
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
  font-size: 1rem;
  appearance: none;
  border: none;
  border-radius: 0.25rem;
`;
