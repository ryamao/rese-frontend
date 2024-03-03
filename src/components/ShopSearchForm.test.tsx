import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ShopSearchForm } from "./ShopSearchForm";
import { BackendAccessContext } from "../contexts/BackendAccessContext";
import { ShopSearchContext } from "../contexts/ShopSearchContext";
import { createMockBackendAccessState } from "../mocks/contexts";

describe("ShopSearchForm", () => {
  test("コンポーネント内に必要な要素が存在する", () => {
    const { getByRole } = renderForm();

    const areaSelect = getByRole("combobox", { name: "Area" });
    const genreSelect = getByRole("combobox", { name: "Genre" });
    const searchField = getByRole("searchbox", { name: "Shop Name" });

    expect(areaSelect).toBeInTheDocument();
    expect(genreSelect).toBeInTheDocument();
    expect(searchField).toBeInTheDocument();
  });

  test("エリアセレクト", async () => {
    const { getByRole, findByRole, shopSearch } = renderForm();

    const areaSelect = getByRole("combobox", { name: "Area" });

    await findByRole("option", { name: "サンプルエリア1" });
    await userEvent.selectOptions(areaSelect, "サンプルエリア1");
    await waitFor(() => {
      expect(shopSearch.setArea).toHaveBeenCalledWith(1);
    });
    shopSearch.setArea.mockClear();

    await userEvent.selectOptions(areaSelect, "All area");
    await waitFor(() => {
      expect(shopSearch.setArea).toHaveBeenCalledWith(null);
    });
  });

  test("ジャンルセレクト", async () => {
    const { getByRole, findByRole, shopSearch } = renderForm();

    const genreSelect = getByRole("combobox", { name: "Genre" });

    await findByRole("option", { name: "サンプルジャンル2" });
    await userEvent.selectOptions(genreSelect, "サンプルジャンル2");

    await waitFor(() => {
      expect(shopSearch.setGenre).toHaveBeenCalledWith(2);
    });
    shopSearch.setGenre.mockClear();

    await userEvent.selectOptions(genreSelect, "All genre");

    await waitFor(() => {
      expect(shopSearch.setGenre).toHaveBeenCalledWith(null);
    });
  });

  test("検索フォーム", async () => {
    const { getByRole, shopSearch } = renderForm();

    const searchField = getByRole("searchbox", { name: "Shop Name" });

    await userEvent.type(searchField, "abc");

    await waitFor(() => {
      expect(shopSearch.setSearch).toHaveBeenCalledWith("a");
      expect(shopSearch.setSearch).toHaveBeenCalledTimes(3);
    });
  });
});

function renderForm() {
  const backendAccess = createMockBackendAccessState({
    getAreas: () => Promise.resolve(sampleAreas),
    getGenres: () => Promise.resolve(sampleGenres)
  });

  const shopSearch = {
    params: { area: null, genre: null, search: "" },
    setArea: vi.fn(),
    setGenre: vi.fn(),
    setSearch: vi.fn()
  };

  const result = render(
    <BackendAccessContext.Provider value={backendAccess}>
      <ShopSearchContext.Provider value={shopSearch}>
        <ShopSearchForm />
      </ShopSearchContext.Provider>
    </BackendAccessContext.Provider>
  );

  return { ...result, shopSearch, backendAccess };
}

const sampleAreas = [
  { id: 1, name: "サンプルエリア1" },
  { id: 2, name: "サンプルエリア2" },
  { id: 3, name: "サンプルエリア3" }
];

const sampleGenres = [
  { id: 1, name: "サンプルジャンル1" },
  { id: 2, name: "サンプルジャンル2" },
  { id: 3, name: "サンプルジャンル3" },
  { id: 4, name: "サンプルジャンル4" },
  { id: 5, name: "サンプルジャンル5" }
];
