import { PageBase } from "./PageBase";

export interface NotFoundPageProps {
  message?: string;
}

export function ErrorPage({ message }: NotFoundPageProps) {
  return <PageBase>{message || "エラーが発生しました"}</PageBase>;
}
