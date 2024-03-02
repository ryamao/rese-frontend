import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchForm } from "./SearchForm";
import {
  ShopSearchContext,
  ShopSearchContextProvider
} from "../contexts/ShopSearchContext";

function createMock() {
  const mockValue = {
    query: {
      search: ""
    },
    setArea: vi.fn(),
    setGenre: vi.fn(),
    setSearch: vi.fn()
  };
  const MockProvider = ({ children }: { children: React.ReactNode }) => (
    <ShopSearchContext.Provider value={mockValue}>
      {children}
    </ShopSearchContext.Provider>
  );
  return { mockValue, MockProvider };
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
      wrapper: ShopSearchContextProvider
    });

    const areaSelect = getByRole("combobox", { name: "Area" });
    const genreSelect = getByRole("combobox", { name: "Genre" });
    const searchField = getByRole("searchbox", { name: "Shop Name" });

    expect(areaSelect).toBeInTheDocument();
    expect(genreSelect).toBeInTheDocument();
    expect(searchField).toBeInTheDocument();
  });

  test("エリアセレクト", async () => {
    const { mockValue, MockProvider } = createMock();

    const { getByRole } = render(<SearchForm areas={areas} genres={genres} />, {
      wrapper: MockProvider
    });

    const areaSelect = getByRole("combobox", { name: "Area" });

    await userEvent.selectOptions(areaSelect, "Area1");

    await waitFor(() => {
      expect(areaSelect).toHaveValue("1");
      expect(mockValue.setArea).toHaveBeenCalled();
    });
  });

  test("ジャンルセレクト", async () => {
    const { mockValue, MockProvider } = createMock();

    const { getByRole } = render(<SearchForm areas={areas} genres={genres} />, {
      wrapper: MockProvider
    });

    const genreSelect = getByRole("combobox", { name: "Genre" });

    await userEvent.selectOptions(genreSelect, "Genre1");

    await waitFor(() => {
      expect(genreSelect).toHaveValue("1");
      expect(mockValue.setGenre).toHaveBeenCalled();
    });
  });

  test.skip("検索フォーム", async () => {
    const { mockValue, MockProvider } = createMock();

    const { getByRole } = render(<SearchForm areas={areas} genres={genres} />, {
      wrapper: MockProvider
    });

    const searchField = getByRole("searchbox", { name: "Shop Name" });

    await userEvent.type(searchField, "test");

    await waitFor(() => {
      expect(searchField).toHaveValue("test");
      expect(mockValue.setSearch).toHaveBeenCalled();
    });
  });
});
