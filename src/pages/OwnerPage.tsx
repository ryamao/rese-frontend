import { PageBase } from "./PageBase";
import { OwnerShopList } from "../components/OwnerShopList";
import { useOwnerShops } from "../hooks/queries";
import { useOwnerId } from "../routes/OwnersOnlyRoute";

export function OwnerPage() {
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

  return (
    <PageBase>
      <OwnerShopList shops={shops.data.data} />
    </PageBase>
  );
}
