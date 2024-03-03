import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ShopOverviewCard } from "./ShopOverviewCard";
import {
  ApiAccessContext,
  ApiAccessContextType
} from "../contexts/ApiAccessContext";
import { ShopSearchContext } from "../contexts/ShopSearchContext";

describe("ShopOverviewCard", () => {
  test("画像が表示されている", () => {
    const { getByRole } = renderCard();
    const image = getByRole("img", { name: "サンプルジャンル" });
    expect(image).toBeInTheDocument();
  });

  test("店名が表示されている", () => {
    const { getByText } = renderCard();
    const name = getByText("サンプルショップ");
    expect(name).toBeInTheDocument();
  });

  test("エリアが表示されている", () => {
    const { getByText } = renderCard();
    const area = getByText(/サンプルエリア/);
    expect(area).toBeInTheDocument();
  });

  test("ジャンルが表示されている", () => {
    const { getByText } = renderCard();
    const genre = getByText(/サンプルジャンル/);
    expect(genre).toBeInTheDocument();
  });

  test("お気に入りボタンが表示されている", () => {
    const { getByRole } = renderCard();
    const button = getByRole("button", { name: "お気に入り" });
    expect(button).toBeInTheDocument();
  });

  test("エリアボタンがクリックされた時", async () => {
    const { getByText, shopSearch } = renderCard();
    const areaButton = getByText(/サンプルエリア/);
    await userEvent.click(areaButton);
    await waitFor(() => expect(shopSearch.setArea).toHaveBeenCalledWith(333));
  });

  test("ジャンルボタンがクリックされた時", async () => {
    const { getByText, shopSearch } = renderCard();
    const genreButton = getByText(/サンプルジャンル/);
    await userEvent.click(genreButton);
    await waitFor(() => expect(shopSearch.setGenre).toHaveBeenCalledWith(444));
  });

  test("お気に入りボタンがクリックされた時", async () => {
    const { getByRole, apiAccess } = renderCard("unknown");
    const button = getByRole("button", { name: "お気に入り" });
    await userEvent.click(button);
    expect(apiAccess.addFavorite).not.toHaveBeenCalled();
    expect(apiAccess.removeFavorite).not.toHaveBeenCalled();
  });

  test("お気に入り登録ボタンがクリックされた時", async () => {
    const { getByRole, apiAccess } = renderCard("unmarked");
    const button = getByRole("button", { name: "お気に入り登録" });
    await userEvent.click(button);
    await waitFor(() =>
      expect(apiAccess.addFavorite).toHaveBeenCalledWith(111, 222)
    );
  });

  test("お気に入り解除ボタンがクリックされた時", async () => {
    const { getByRole, apiAccess } = renderCard("marked");
    const button = getByRole("button", { name: "お気に入り解除" });
    await userEvent.click(button);
    await waitFor(() =>
      expect(apiAccess.removeFavorite).toHaveBeenCalledWith(111, 222)
    );
  });
});

function renderCard(
  favoriteStatus: "unknown" | "marked" | "unmarked" = "unknown"
) {
  const authStatus: ApiAccessContextType["authStatus"] =
    favoriteStatus === "unknown"
      ? { status: "guest" }
      : { status: "customer", id: 111 };

  const apiAccess: ApiAccessContextType = {
    authStatus,
    getAreas: vi.fn(),
    getGenres: vi.fn(),
    addFavorite: vi.fn(),
    removeFavorite: vi.fn()
  };

  const shopSearch = {
    params: { area: null, genre: null, search: "" },
    setArea: vi.fn(),
    setGenre: vi.fn(),
    setSearch: vi.fn()
  };

  const result = render(
    <ApiAccessContext.Provider value={apiAccess}>
      <ShopSearchContext.Provider value={shopSearch}>
        <ShopOverviewCard
          id={222}
          imageUrl="https://via.placeholder.com/800x500"
          name="サンプルショップ"
          area={{ id: 333, name: "サンプルエリア" }}
          genre={{ id: 444, name: "サンプルジャンル" }}
          favoriteStatus={favoriteStatus}
        />
      </ShopSearchContext.Provider>
    </ApiAccessContext.Provider>
  );

  return { ...result, shopSearch, apiAccess };
}
