import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";

import { whitePanel } from "./styles";
import { useShopSearchContext } from "../contexts/ShopSearchContext";

export interface ShopSearchQuery {
  area: string;
  genre: string;
  search: string;
}

export interface SearchFormProps {
  areas: { id: number; name: string }[];
  genres: { id: number; name: string }[];
}

export function ShopSearchForm({ areas, genres }: SearchFormProps) {
  const { params, setArea, setGenre, setSearch } = useShopSearchContext();

  return (
    <form className={whitePanel} onSubmit={(e) => e.preventDefault()}>
      <Inner>
        <Field>
          <ComboBox
            aria-label="Area"
            name="area"
            value={params.area ? String(params.area) : ""}
            onChange={(e) =>
              setArea(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="" defaultChecked>
              All area
            </option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </ComboBox>
        </Field>

        <Field>
          <ComboBox
            aria-label="Genre"
            name="genre"
            value={params.genre ? String(params.genre) : ""}
            onChange={(e) =>
              setGenre(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="" defaultChecked>
              All genre
            </option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </ComboBox>
        </Field>

        <Field>
          <FaSearch className={searchIconStyle} />
          <SearchBox
            type="search"
            aria-label="Shop Name"
            name="search"
            placeholder="Search ..."
            value={params.search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Field>
      </Inner>
    </form>
  );
}

const Inner = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  padding: 0.625rem 0;

  & > * + * {
    border-left: 1px solid #ddd;
  }
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;

const ComboBox = styled.select`
  padding: 0.375rem 0.25rem;
  border: none;
`;

const SearchBox = styled.input`
  width: 100%;
  padding: 0.375rem 0.5rem;
  border: none;
`;

const searchIconStyle = css`
  color: #eee;
`;
