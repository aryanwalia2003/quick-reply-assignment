import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/shared/utils/cn.util';
import { LayoutDashboard, Library, BookOpen, LogOut } from 'lucide-react';
import { useAuth } from '@/app/AuthProvider';
import { useLogout } from '@/features/auth/application/useLogout.hook';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate('/login'),
    });
  };

  const navItems = [
    { label: 'Paper Library', path: '/', icon: Library },
    { label: 'Analytics Dashboard', path: '/analytics', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex-shrink-0 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <BookOpen className="w-6 h-6 text-indigo-400" />
          <h1 className="text-xl font-bold tracking-tight">ResearchTrack</h1>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-indigo-600 text-white shadow-lg" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info + Logout */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-4 space-y-3">
            <div className="text-xs">
              <p className="font-semibold text-slate-200 mb-1">Signed in as</p>
              <p className="text-slate-400 truncate">{user?.email ?? 'Unknown'}</p>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};