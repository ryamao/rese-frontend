import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  useParams,
  Location
} from "react-router-dom";

import { ShopListPage } from "./ShopListPage";
import {
  BackendAccessContext,
  useBackendAccessState
} from "../contexts/BackendAccessContext";
import { HttpClient } from "../HttpClient";
import { handlers } from "../mocks/handlers";
import { ShopData } from "../models";

const meta = {
  title: "Pages/ShopListPage",
  component: ShopListPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers
    }
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      const backendAccess = useBackendAccessState(new HttpClient());
      return (
        <QueryClientProvider client={queryClient}>
          <BackendAccessContext.Provider value={backendAccess}>
            <MemoryRouter>
              <Routes>
                <Route path="/" element={<Story />} />
                <Route path="/detail/:shopId" element={<Detail />} />
              </Routes>
            </MemoryRouter>
          </BackendAccessContext.Provider>
        </QueryClientProvider>
      );
    }
  ]
} satisfies Meta<typeof ShopListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function Detail() {
  const { shopId } = useParams();
  const { state: shop } = useLocation() as Location<ShopData>;

  return (
    <table>
      <tbody>
        <tr>
          <th>Path parameter</th>
          <td>{shopId}</td>
        </tr>
        <tr>
          <th>Shop ID</th>
          <td>{shop.id}</td>
        </tr>
        <tr>
          <th>Shop name</th>
          <td>{shop.name}</td>
        </tr>
        <tr>
          <th>Shop area</th>
          <td>{shop.area.name}</td>
        </tr>
        <tr>
          <th>Shop genre</th>
          <td>{shop.genre.name}</td>
        </tr>
        <tr>
          <th>Shop image URL</th>
          <td>{shop.image_url}</td>
        </tr>
        <tr>
          <th>Shop description</th>
          <td>{shop.detail}</td>
        </tr>
        <tr>
          <th>Shop favorite status</th>
          <td>{shop.favorite_status}</td>
        </tr>
      </tbody>
    </table>
  );
}
