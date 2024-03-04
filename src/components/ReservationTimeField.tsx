import styled from "@emotion/styled";

export function ReservationTimeField() {
  return (
    <Select>
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
  border: none;
  border-radius: 0.25rem;
`;
