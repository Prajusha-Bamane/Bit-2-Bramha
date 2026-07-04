import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes.config';
import AuthLayout from '../components/AuthLayout';
import AuthIllustration from '../components/AuthIllustration';
import LoginCard from '../components/LoginCard';

const Login = () => {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated based on role
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'Admin' || user.role === 'Manager') {
        navigate(ROUTES.ADMIN.DASHBOARD, { replace: true });
      } else if (user.role === 'Employee') {
        navigate(ROUTES.EMPLOYEE.DASHBOARD, { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = async (data) => {
    setApiError(null);
    setIsLoading(true);
    try {
      const userData = await login(data.email, data.password);
      // Explicitly check role from response data as required: "Do not rely only on frontend state."
      if (userData.role === 'Admin' || userData.role === 'Manager') {
        navigate(ROUTES.ADMIN.DASHBOARD, { replace: true });
      } else if (userData.role === 'Employee') {
        navigate(ROUTES.EMPLOYEE.DASHBOARD, { replace: true });
      }
    } catch (err) {
      setApiError(err.message || 'Login failed. Please inspect database configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout illustration={<AuthIllustration />}>
      <LoginCard
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        onSubmit={onSubmit}
        isLoading={isLoading}
        apiError={apiError}
      />

      {/* Developer credentials helper */}
      <div className="mt-8 bg-slate-900/20 border border-slate-800/40 rounded-2xl p-4 backdrop-blur-sm">
        <h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide font-sans">
          Corporate Sandbox Credentials
        </h4>
        <div className="space-y-1 text-xs text-slate-500 font-mono">
          <p>🔑 <strong className="text-slate-300">Admin:</strong> admin@hrms.com / password123</p>
          <p>🔑 <strong className="text-slate-300">Employee:</strong> jane@hrms.com / password123</p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
