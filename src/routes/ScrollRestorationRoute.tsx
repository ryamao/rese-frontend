import { Outlet, ScrollRestoration } from "react-router-dom";

export function ScrollRestorationRoute() {
  return (
    <>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <Outlet />
    </>
  );
}
