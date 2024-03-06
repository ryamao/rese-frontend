import { PageBase } from "./PageBase";

export interface NotFoundPageProps {
  message?: string;
}

export function NotFoundPage({ message }: NotFoundPageProps) {
  return <PageBase>{message || "ページが見つかりません"}</PageBase>;
}
