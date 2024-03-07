export interface ReservationStatusIconProps {
  hour: number;
  minute: number;
}

export function ReservationStatusIcon({
  hour,
  minute
}: ReservationStatusIconProps) {
  const hourHandPoint = computeHourHandPoint(hour, minute);
  const minuteHandPoint = computeMinuteHandPoint(minute);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#fff" />
      {dialPoints.map(({ x, y }, i) => (
        <circle
          key={i}
          cx={50 + x * 42.5}
          cy={50 + y * 42.5}
          r="3"
          fill="#315dff"
        />
      ))}
      <line
        x1="50"
        y1="50"
        x2={50 + hourHandPoint.x * 22}
        y2={50 + hourHandPoint.y * 22}
        stroke="#315dff"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="50"
        x2={50 + minuteHandPoint.x * 32}
        y2={50 + minuteHandPoint.y * 32}
        stroke="#315dff"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const dialPoints = Array.from({ length: 12 }, (_, i) => {
  const x = Math.cos((i * Math.PI) / 6);
  const y = Math.sin((i * Math.PI) / 6);
  return { x, y };
});

function computeHourHandPoint(hour: number, minute: number) {
  const angle = (hour + minute / 60) * 30 - 90;
  return {
    x: Math.cos((angle * Math.PI) / 180),
    y: Math.sin((angle * Math.PI) / 180)
  };
}

function computeMinuteHandPoint(minute: number) {
  const angle = (minute / 60) * 360 - 90;
  return {
    x: Math.cos((angle * Math.PI) / 180),
    y: Math.sin((angle * Math.PI) / 180)
  };
}
