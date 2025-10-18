import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MobileMenu from "./Organisms/MobileMenu";

export default function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <MobileMenu />
      <Outlet />
    </ProtectedRoute>
  );
}