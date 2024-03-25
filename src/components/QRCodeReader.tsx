import { useZxing } from "react-zxing";

export interface QRCodeReaderProps {
  onRead(text: string): void;
}

export function QRCodeReader({ onRead }: QRCodeReaderProps) {
  const { ref } = useZxing({
    constraints: {
      video: {
        frameRate: 10,
        width: 400,
        height: 400
      }
    },
    onDecodeResult(result) {
      onRead(result.getText());
    }
  });

  return <video muted ref={ref} />;
}
