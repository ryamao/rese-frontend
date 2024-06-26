import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";

import { whitePanel } from "./styles";
import { useShopSearchContext } from "../contexts/ShopSearchContext";
import { AreaData, GenreData } from "../models";

export interface ShopSearchFormProps {
  areas: AreaData[];
  genres: GenreData[];
}

export function ShopSearchForm({ areas, genres }: ShopSearchFormProps) {
  const { params, setArea, setGenre, setSearch } = useShopSearchContext();

  return (
    <form className={whitePanel} onSubmit={(e) => e.preventDefault()}>
      <Inner>
        <Field>
          <ComboBox
            aria-label="Area"
            name="area"
            value={params.area ? String(params.area) : "All area"}
            onChange={(e) => setArea(stringToNumber(e.target.value))}
          >
            <option defaultChecked>All area</option>
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
            value={params.genre ? String(params.genre) : "All genre"}
            onChange={(e) => setGenre(stringToNumber(e.target.value))}
          >
            <option defaultChecked>All genre</option>
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

function stringToNumber(value: string) {
  const number = Number(value);
  return isNaN(number) ? null : number;
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
  padding: 0.375rem 1.25rem 0.375rem 0.25rem;
  appearance: none;
  background-color: transparent;
  border: none;
`;

const SearchBox = styled.input`
  width: 100%;
  padding: 0.375rem 0.5rem;
  background-color: transparent;
  border: none;
`;

const searchIconStyle = css`
  color: #eee;
`;
