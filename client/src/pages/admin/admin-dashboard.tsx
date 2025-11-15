import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/auth.store';
import { isAdmin, isSuperAdmin, getRoleDisplayName } from '../../utils/auth.utils';

export default function AdminDashboard()
{
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user || !isAdmin(user))
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
          <p className="text-white/70">Administrator privileges required.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-8 max-w-7xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-lg text-white/70">
          Welcome, <span className="text-indigo-400 font-semibold">{user.username}</span>! 
          <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {getRoleDisplayName(user.role)}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {isSuperAdmin(user) && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/30">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <svg width="28" height="28" fill="currentColor" className="text-white" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white/60 font-medium uppercase tracking-wide mb-1">
                    User Management
                  </div>
                  <div className="text-lg font-semibold text-white">
                    Manage user roles
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-white/5 border-t border-white/10">
              <Link to="/admin/users" className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors inline-flex items-center group">
                View all users
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/30">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg width="28" height="28" fill="currentColor" className="text-white" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm text-white/60 font-medium uppercase tracking-wide mb-1">
                  Product Management
                </div>
                <div className="text-lg font-semibold text-white">
                  Manage products
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-white/5 border-t border-white/10">
            <Link to="/admin/products" className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors inline-flex items-center group">
              View products
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/20 hover:border-green-500/30">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg shadow-green-500/30">
                <svg width="28" height="28" fill="currentColor" className="text-white" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm text-white/60 font-medium uppercase tracking-wide mb-1">
                  System Statistics
                </div>
                <div className="text-lg font-semibold text-white">
                  View analytics
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-white/5 border-t border-white/10">
            <span className="text-gray-500 font-medium text-sm cursor-default">
              Coming soon
            </span>
          </div>
        </div>
      </div>

      <div className="bg-indigo-500/10 backdrop-blur-lg border border-indigo-500/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
          </svg>
          Your Permissions
        </h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-3 text-white/80">
            <span className="shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            Access admin dashboard
          </li>
          <li className="flex items-center gap-3 text-white/80">
            <span className="shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            Manage products
          </li>
          {isSuperAdmin(user) && (
            <>
              <li className="flex items-center gap-3 text-white/80">
                <span className="shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Manage user roles
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <span className="shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                View all users
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <span className="shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Promote clients to admin
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};