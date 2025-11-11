import Home from "../pages/home";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import Profile from "../pages/profile/profile";
import ProtectedLayout from "@/components/layout/protected.layout";
import AuthLayout from "@/components/layout/auth.layout";
import Products from "@/pages/products/product";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import UserManager from "@/pages/admin/user-managment";
import MainLayout from "@/components/layout/main.layout";
import Brand from "@/pages/brand/brand";
import ProductAdmin from "@/pages/products/product-admin";
import ProductPage from "@/pages/products/product-page";

export const Routes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
      },
      {
        path: "/brand",
        element: <Brand />,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <ProtectedLayout>
        <Profile />
      </ProtectedLayout>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedLayout requiredRoles={["admin", "super_admin"]}>
        <AdminDashboard />
      </ProtectedLayout>
      
    ),
  },
  {
    path: "/admin/products",
    element: (
      <ProtectedLayout requiredRoles={["admin", "super_admin"]}>
        <ProductAdmin />
      </ProtectedLayout>
      
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedLayout requiredRoles={["super_admin"]}>
        <UserManager />
      </ProtectedLayout>
    ),
  },
];
