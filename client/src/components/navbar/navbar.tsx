import { Link, useLocation } from "react-router-dom";
import useAuthStore from "@/store/auth.store";
import Loading from "../ui/loading";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { User2 } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { user, isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <Loading />;
  }

  const isAdmin = user?.role === "admin" || user?.role === "super_admin";


  const navLinkClass = (path: string) => `
     py-2 font-medium transition-all duration-200 relative 
    after:content-[''] after:absolute after:bottom-0 after:left-0
    after:h-[2px] after:bg-indigo-500 after:transition-all after:duration-300
    ${
      isActive(path)
        ? "text-indigo-400 font-bold after:w-[30%]"
        : "text-white/80 after:w-0"
    }
    hover:after:w-full
  `;
  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-black/60 backdrop-blur border-b border-white/10">
      <div className="container mx-auto ">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="font-space-age text-2xl bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-wide">
              IntoTech
            </Link>
          </div>

          <ul className="hidden md:flex gap-10 items-center">
            <li>
              <Link to="/" className={navLinkClass("/")}> 
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={navLinkClass("/products")}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link to="/brand" className={navLinkClass("/brand")}>
                Brand
              </Link>
            </li>
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/products" className="hidden sm:inline-flex bg-indigo-600 hover:bg-indigo-500 rounded-md px-5 py-3 text-white cursor-pointer rounded-md">
              Build your setup
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer rounded-md p-2 hover:bg-white/5 border border-white/10">
                <User2 className="text-white"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900/95 border border-white/10 text-white">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem>
                        <Link to="/admin">Admin</Link>
                      </DropdownMenuItem>
                    )}
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link to="/auth/register">Register</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/auth/login">Login</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
