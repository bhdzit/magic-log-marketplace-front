import { Routes, Route } from "react-router";
import { LandingPage } from "./pages/landing.page";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}
