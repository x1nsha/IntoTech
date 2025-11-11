import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/auth.store";
import Loading from "../ui/loading";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen pt-24 bg-linear-to-b from-gray-950 via-gray-900 to-black">
      <Outlet />
      {children}
    </div>
  );
}