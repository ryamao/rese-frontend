import { useNavigate } from "react-router-dom";

import { PageBase } from "./PageBase";
import { OwnerShopList } from "../components/OwnerShopList";
import { useOwnerShops } from "../hooks/queries";
import { OwnerShopData } from "../models";
import { useOwnerId } from "../routes/OwnersOnlyRoute";

export function OwnerPage() {
  const navigate = useNavigate();
  const { ownerId } = useOwnerId();
  const shops = useOwnerShops(ownerId);

  if (shops.isError) {
    return <PageBase>Error: {shops.error.message}</PageBase>;
  }
  if (shops.isPending) {
    return <PageBase>Loading...</PageBase>;
  }
  if (!shops.data.success) {
    return (
      <PageBase>
        {shops.data.status}: {shops.data.message}
      </PageBase>
    );
  }

  function handleCreateShop() {
    navigate("/owner/shop");
  }

  function handleUpdateShop(shop: OwnerShopData) {
    navigate(`/owner/shop`, { state: shop });
  }

  function handleViewReservations(shop: OwnerShopData) {
    navigate(`/owner/reservations`, { state: shop });
  }

  return (
    <PageBase>
      <OwnerShopList
        shops={shops.data.data}
        onCreateShop={handleCreateShop}
        onUpdateShop={handleUpdateShop}
        onViewReservations={handleViewReservations}
      />
    </PageBase>
  );
}
