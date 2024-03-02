import { useReducer } from "react";

import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";

import { whitePanel } from "./styles";

export interface ShopSearchQuery {
  area: string;
  genre: string;
  search: string;
}

export interface SearchFormProps {
  areas: { id: number; name: string }[];
  genres: { id: number; name: string }[];
  onChange: (query: ShopSearchQuery) => void;
}

export function SearchForm({ areas, genres, onChange }: SearchFormProps) {
  function reducer(state: ShopSearchQuery, action: Action): ShopSearchQuery {
    const newState = update(state, action);
    if (newState !== state) {
      onChange(newState);
    }
    return newState;
  }

  const [state, dispatch] = useReducer(reducer, {
    area: "",
    genre: "",
    search: ""
  });

  return (
    <form className={whitePanel} onSubmit={(e) => e.preventDefault()}>
      <Inner>
        <Field>
          <ComboBox
            aria-label="Area"
            name="area"
            value={state.area}
            onChange={(e) =>
              dispatch({ type: "SET_AREA", payload: e.target.value })
            }
          >
            <option value="" defaultChecked>
              All area
            </option>
            {areas.map((area) => (
              <option key={area.id} value={area.name}>
                {area.name}
              </option>
            ))}
          </ComboBox>
        </Field>

        <Field>
          <ComboBox
            aria-label="Genre"
            name="genre"
            value={state.genre}
            onChange={(e) =>
              dispatch({ type: "SET_GENRE", payload: e.target.value })
            }
          >
            <option value="" defaultChecked>
              All genre
            </option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
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
            value={state.search}
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH", payload: e.target.value })
            }
          />
        </Field>
      </Inner>
    </form>
  );
}

type Action =
  | { type: "SET_AREA"; payload: string }
  | { type: "SET_GENRE"; payload: string }
  | { type: "SET_SEARCH"; payload: string };

function update(state: ShopSearchQuery, action: Action): ShopSearchQuery {
  switch (action.type) {
    case "SET_AREA":
      return { ...state, area: action.payload };
    case "SET_GENRE":
      return { ...state, genre: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
  }
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
