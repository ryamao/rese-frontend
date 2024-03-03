import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ShopOverviewCard } from "./ShopOverviewCard";
import { ShopSearchContext } from "../contexts/ShopSearchContext";

describe("ShopOverviewCard", () => {
  test("画像が表示されている", () => {
    const { getByRole } = renderCard();
    const image = getByRole("img", { name: "Genre1" });
    expect(image).toBeInTheDocument();
  });

  test("店名が表示されている", () => {
    const { getByText } = renderCard();
    const name = getByText("Shop1");
    expect(name).toBeInTheDocument();
  });

  test("エリアが表示されている", () => {
    const { getByText } = renderCard();
    const area = getByText(/Area1/);
    expect(area).toBeInTheDocument();
  });

  test("ジャンルが表示されている", () => {
    const { getByText } = renderCard();
    const genre = getByText(/Genre1/);
    expect(genre).toBeInTheDocument();
  });

  test("お気に入りボタンが表示されている", () => {
    const { getByRole } = renderCard();
    const button = getByRole("button", { name: "お気に入り" });
    expect(button).toBeInTheDocument();
  });

  test("エリアボタンがクリックされた時", async () => {
    const { getByText, value } = renderCard();
    const areaButton = getByText(/Area1/);
    await userEvent.click(areaButton);
    await waitFor(() => expect(value.setArea).toHaveBeenCalledWith(1));
  });

  test("ジャンルボタンがクリックされた時", async () => {
    const { getByText, value } = renderCard();
    const genreButton = getByText(/Genre1/);
    await userEvent.click(genreButton);
    await waitFor(() => expect(value.setGenre).toHaveBeenCalledWith(1));
  });
});

function renderCard() {
  const value = {
    params: { area: null, genre: null, search: "" },
    setArea: vi.fn(),
    setGenre: vi.fn(),
    setSearch: vi.fn()
  };

  const result = render(
    <ShopSearchContext.Provider value={value}>
      <ShopOverviewCard
        imageUrl="https://via.placeholder.com/800x500"
        name="Shop1"
        area={{ id: 1, name: "Area1" }}
        genre={{ id: 1, name: "Genre1" }}
        favoriteStatus="unknown"
      />
    </ShopSearchContext.Provider>
  );

  return { ...result, value };
}
