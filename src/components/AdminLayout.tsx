import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Sparkles, 
  LogOut, 
  Menu, 
  X,
  Shield
} from 'lucide-react';
import { AdminAuthService } from '@/lib/adminAuth';
import { useToast } from '@/hooks/use-toast';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!AdminAuthService.isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    AdminAuthService.logout();
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of the admin dashboard.",
    });
    navigate('/admin');
  };

  const navItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/admin/dashboard',
      color: 'from-slate-500 to-slate-600'
    },
    {
      icon: Stethoscope,
      label: 'Dental Metrix',
      path: '/admin/dental',
      color: 'from-mudra-primary to-mudra-secondary'
    },
    {
      icon: Sparkles,
      label: 'Meditouch',
      path: '/admin/aesthetic',
      color: 'from-meditouch-primary to-meditouch-primary-dark'
    }
  ];

  const currentUser = AdminAuthService.getCurrentUser();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">Mudra Admin</h1>
              <p className="text-xs text-slate-500">Clinic Management</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-md transform scale-[1.02]`
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">{currentUser?.username}</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="h-16 bg-white shadow-sm border-b border-slate-200 flex items-center justify-between px-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu className="h-5 w-5 text-slate-600" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">Welcome back!</p>
              <p className="text-xs text-slate-500">
                {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;