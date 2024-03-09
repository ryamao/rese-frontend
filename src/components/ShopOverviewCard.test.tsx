import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ShopOverviewCard } from "./ShopOverviewCard";
import {
  BackendAccessContext,
  BackendAccessContextType
} from "../contexts/BackendAccessContext";
import { ShopSearchContext } from "../contexts/ShopSearchContext";
import { createMockBackendAccessState } from "../mocks/contexts";
import { ShopData } from "../models";

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

  test("詳細ボタンがクリックされた時", async () => {
    const { getByRole, onClickDetailButton } = renderCard();
    const button = getByRole("button", { name: "詳しくみる" });
    await userEvent.click(button);
    await waitFor(() =>
      expect(onClickDetailButton).toHaveBeenCalledWith(
        expect.objectContaining({ id: 222 })
      )
    );
  });

  test("お気に入りボタンがクリックされた時", async () => {
    const { getByRole, backendAccess } = renderCard("unknown");
    const button = getByRole("button", { name: "お気に入り" });
    await userEvent.click(button);
    expect(backendAccess.addFavorite).not.toHaveBeenCalled();
    expect(backendAccess.removeFavorite).not.toHaveBeenCalled();
  });

  test("お気に入り登録ボタンがクリックされた時", async () => {
    const { getByRole, backendAccess } = renderCard("unmarked");
    const button = getByRole("button", { name: "お気に入り登録" });
    await userEvent.click(button);
    await waitFor(() =>
      expect(backendAccess.addFavorite).toHaveBeenCalledWith(111, 222)
    );
  });

  test("お気に入り解除ボタンがクリックされた時", async () => {
    const { getByRole, backendAccess } = renderCard("marked");
    const button = getByRole("button", { name: "お気に入り解除" });
    await userEvent.click(button);
    await waitFor(() =>
      expect(backendAccess.removeFavorite).toHaveBeenCalledWith(111, 222)
    );
  });
});

function renderCard(
  favoriteStatus: "unknown" | "marked" | "unmarked" = "unknown"
) {
  const authStatus: BackendAccessContextType["authStatus"] =
    favoriteStatus === "unknown"
      ? { status: "guest" }
      : { status: "customer", id: 111 };
  const customerId =
    authStatus.status === "customer" ? authStatus.id : undefined;

  const backendAccess = createMockBackendAccessState({ authStatus });

  const shopSearch = {
    params: { area: null, genre: null, search: "" },
    setArea: vi.fn(),
    setGenre: vi.fn(),
    setSearch: vi.fn()
  };

  const sampleShop = {
    id: 222,
    image_url: "https://via.placeholder.com/800x500",
    name: "サンプルショップ",
    area: { id: 333, name: "サンプルエリア" },
    genre: { id: 444, name: "サンプルジャンル" },
    favorite_status: favoriteStatus
  } as ShopData;

  const onClickDetailButton = vi.fn();

  const Node = () => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <BackendAccessContext.Provider value={backendAccess}>
          <ShopSearchContext.Provider value={shopSearch}>
            <ShopOverviewCard
              customerId={customerId}
              shop={sampleShop}
              onClickDetailButton={onClickDetailButton}
            />
          </ShopSearchContext.Provider>
        </BackendAccessContext.Provider>
      </QueryClientProvider>
    );
  };

  const result = render(<Node />);

  return { ...result, shopSearch, backendAccess, onClickDetailButton };
}
