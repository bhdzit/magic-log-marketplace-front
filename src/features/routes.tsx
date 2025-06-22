import { AdminRoutes } from "./admin/routes";
import { PublicRoutes } from "./public/routes";

export function FeaturesRoutes() {
  return (
    <div>
      <PublicRoutes></PublicRoutes>
      <AdminRoutes></AdminRoutes>
    </div>
  );
}
