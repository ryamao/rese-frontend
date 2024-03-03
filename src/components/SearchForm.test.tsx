import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchForm } from "./SearchForm";
import {
  ShopSearchContext,
  useShopSearchState
} from "../contexts/ShopSearchContext";

function Wrapper({ children }: { children: React.ReactNode }) {
  const value = useShopSearchState();
  return (
    <ShopSearchContext.Provider value={value}>
      {children}
    </ShopSearchContext.Provider>
  );
}

describe("SearchForm", () => {
  const areas = [
    { id: 1, name: "Area1" },
    { id: 2, name: "Area2" }
  ];
  const genres = [
    { id: 1, name: "Genre1" },
    { id: 2, name: "Genre2" }
  ];

  test("コンポーネント内に必要な要素が存在する", () => {
    const { getByRole } = render(<SearchForm areas={areas} genres={genres} />, {
      wrapper: Wrapper
    });

    const areaSelect = getByRole("combobox", { name: "Area" });
    const genreSelect = getByRole("combobox", { name: "Genre" });
    const searchField = getByRole("searchbox", { name: "Shop Name" });

    expect(areaSelect).toBeInTheDocument();
    expect(genreSelect).toBeInTheDocument();
    expect(searchField).toBeInTheDocument();
  });

  test("エリアセレクト", async () => {
    const value = {
      params: { area: null, genre: null, search: "" },
      setArea: vi.fn(),
      setGenre: vi.fn(),
      setSearch: vi.fn()
    };

    const { getByRole } = render(
      <ShopSearchContext.Provider value={value}>
        <SearchForm areas={areas} genres={genres} />
      </ShopSearchContext.Provider>
    );

    const areaSelect = getByRole("combobox", { name: "Area" });

    await userEvent.selectOptions(areaSelect, "Area1");

    await waitFor(() => {
      expect(value.setArea).toHaveBeenCalledWith(1);
    });
  });

  test("ジャンルセレクト", async () => {
    const value = {
      params: { area: null, genre: null, search: "" },
      setArea: vi.fn(),
      setGenre: vi.fn(),
      setSearch: vi.fn()
    };

    const { getByRole } = render(
      <ShopSearchContext.Provider value={value}>
        <SearchForm areas={areas} genres={genres} />
      </ShopSearchContext.Provider>
    );

    const genreSelect = getByRole("combobox", { name: "Genre" });

    await userEvent.selectOptions(genreSelect, "Genre2");

    await waitFor(() => {
      expect(value.setGenre).toHaveBeenCalledWith(2);
    });
  });

  test("検索フォーム", async () => {
    const value = {
      params: { area: null, genre: null, search: "" },
      setArea: vi.fn(),
      setGenre: vi.fn(),
      setSearch: vi.fn()
    };

    const { getByRole } = render(
      <ShopSearchContext.Provider value={value}>
        <SearchForm areas={areas} genres={genres} />
      </ShopSearchContext.Provider>
    );

    const searchField = getByRole("searchbox", { name: "Shop Name" });

    await userEvent.type(searchField, "abc");

    await waitFor(() => {
      expect(value.setSearch).toHaveBeenCalledWith("a");
      expect(value.setSearch).toHaveBeenCalledTimes(3);
    });
  });
});
