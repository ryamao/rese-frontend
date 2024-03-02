import { useContext } from "react";

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";

import { whitePanel } from "./styles";
import { ShopSearchContext } from "../contexts/ShopSearchContext";

export interface SearchFormProps {
  areas: { id: number; name: string }[];
  genres: { id: number; name: string }[];
}

export function SearchForm({ areas, genres }: SearchFormProps) {
  const { query, setArea, setGenre, setSearch } = useContext(ShopSearchContext);

  return (
    <form className={whitePanel} onSubmit={(e) => e.preventDefault()}>
      <Inner>
        <Field>
          <ComboBox
            aria-label="Area"
            name="area"
            value={query.area}
            onChange={(e) => setArea(e.target.value)}
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
            value={query.genre}
            onChange={(e) => setGenre(e.target.value)}
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
            value={query.search}
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
  border: none;
  padding: 0.375rem 0.25rem;
`;

const SearchBox = styled.input`
  border: none;
  padding: 0.375rem 0.5rem;
  width: 100%;
`;

const searchIconStyle = css`
  color: #eee;
`;
