import { useEffect, useState } from "react";
import
{
  getRoleDisplayName,
  getAllowedRoles,
  isSuperAdmin,
} from "@/utils/auth.utils";
import useAuthStore from "../../store/auth.store";
import type { User, UserRole } from "@/types/auth.types";
import { userApi } from "@/service/api.auth";

export default function UserManager()
{
  const {
    user: currentUser,
    error,
    setError,
    users,
    setUsers,
    changingRole,
    setChangingRole,
  } = useAuthStore();

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() =>
  {
    const fetchUsers = async () => {
      try
      {
        setInitialLoading(true);
        const response = await userApi.getAllUsers();
        setUsers(response.data);
      }
      catch (err)
      {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      }
      finally
      {
        setInitialLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers, setError]);

  const handleRoleChange = async (
    userId: string,
    newRole: "client" | "admin"
  ) => {
    try
    {
      setChangingRole(userId);

      await userApi.changeUserRole(userId, newRole);

      setUsers(
        users?.map((user) =>
          user._id === userId
            ? { ...user, role: newRole as UserRole }
            : (user as User)
        ) ?? []
      );
    }
    catch (err)
    {
      setError(
        err instanceof Error ? err.message : "Failed to change user role"
      );
    }
    finally
    {
      setChangingRole("");
    }
  };

  if (initialLoading)
  {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-xl text-white/70 flex items-center gap-3">
          <svg className="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading users...
        </div>
      </div>
    );
  }

  if (error)
  {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-6 max-w-md">
          <div className="flex items-center gap-3 text-red-400">
            <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-bold text-lg mb-1">Error</h3>
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser || !isSuperAdmin(currentUser))
  {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 max-w-md text-center backdrop-blur-sm">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" fill="currentColor" className="text-red-400" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-400 mb-2">Access Denied</h2>
          <p className="text-white/70">Super admin privileges required.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen p-6 md:p-8 max-w-7xl flex flex-col gap-5">
      <div className="mb-8 flex flex-col gap-2 items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-space-age mb-3 text-indigo-400">
          User Management
        </h1>
        <p className="text-lg text-white/70">
          Manage user roles and permissions
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-md border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                  Current Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users?.map((user) => (
                <tr key={user._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                      <div className="font-medium text-white">{user.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white/70">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                        user.role === "super_admin"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : user.role === "admin"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : "bg-green-500/20 text-green-300 border border-green-500/30"
                      }`}
                    >
                      {getRoleDisplayName(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.role !== "super_admin" &&
                    user._id !== currentUser._id ? (
                      changingRole === user._id ? (
                        <div className="flex items-center gap-2 text-indigo-400">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-sm">Changing role...</span>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {getAllowedRoles().map((role) => (
                            <button
                              key={role.role}
                              onClick={() =>
                                handleRoleChange(
                                  user._id,
                                  role.role as "client" | "admin"
                                )
                              }
                              disabled={user.role === role.role}
                              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                                user.role === role.role
                                  ? "bg-white/5 text-white/30 cursor-not-allowed"
                                  : "bg-indigo-500 hover:bg-indigo-600 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
                              }`}
                            >
                              Make {role.label}
                            </button>
                          ))}
                        </div>
                      )
                    ) : (
                      <span className="text-sm text-white/40">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-indigo-500/10 backdrop-blur-lg border border-indigo-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-indigo-400 mb-1">Note</h4>
            <p className="text-sm text-white/70">
              Super admins cannot be modified. You cannot change your own role. Only clients and admins can be reassigned.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}