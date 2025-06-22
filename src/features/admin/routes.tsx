import { Routes, Route, Outlet, Navigate } from "react-router";
import { AdminPage } from "./pages/admin.page";
import { useAuth } from "@/hooks/use-auth";

export function AdminRoutes() {
  const { userData } = useAuth();

  function validateAccess() {
    return userData != null ? <Outlet /> : <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route element={validateAccess()}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}
