import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Lock, User } from 'lucide-react';
import { AdminAuthService } from '@/lib/adminAuth';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isSuccess = AdminAuthService.login(credentials.username, credentials.password);
      
      if (isSuccess) {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard.",
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full mb-3 shadow-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 mb-1">
            Mudra Admin
          </h1>
          <p className="text-sm text-slate-600">
            Clinic management dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors text-sm"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full pl-9 pr-10 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors text-sm"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-2.5 px-4 rounded-lg font-medium hover:from-slate-700 hover:to-slate-800 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="text-xs font-medium text-slate-700 mb-1">Demo Credentials</h3>
            <div className="text-xs text-slate-600 space-y-0.5">
              <div><span className="font-medium">Username:</span> admin</div>
              <div><span className="font-medium">Password:</span> mudra2024</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-xs text-slate-500">
            Mudra Dental & Aesthetic Clinic
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;