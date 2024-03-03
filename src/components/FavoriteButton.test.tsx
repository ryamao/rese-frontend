import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FavoriteButton } from "./FavoriteButton";

describe("FavoriteButton", () => {
  test("お気に入り状態が不明の場合", () => {
    const { getByRole } = render(<FavoriteButton favoriteStatus="unknown" />);
    const button = getByRole("button", { name: "お気に入り" });
    expect(button).toBeInTheDocument();
  });

  test("お気に入りされている場合", () => {
    const { getByRole } = render(<FavoriteButton favoriteStatus="marked" />);
    const button = getByRole("button", { name: "お気に入り解除" });
    expect(button).toBeInTheDocument();
  });

  test("お気に入りされていない場合", () => {
    const { getByRole } = render(<FavoriteButton favoriteStatus="unmarked" />);
    const button = getByRole("button", { name: "お気に入り登録" });
    expect(button).toBeInTheDocument();
  });

  test("お気に入りボタンがクリックされた時", async () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <FavoriteButton favoriteStatus="unmarked" onClick={onClick} />
    );
    const button = getByRole("button", { name: "お気に入り登録" });
    await userEvent.click(button);
    await waitFor(() => expect(onClick).toHaveBeenCalledWith("unmarked"));
  });
});
