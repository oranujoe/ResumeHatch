
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

const Auth = () => {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const mode = searchParams.get('mode');

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user && mode !== 'reset') {
      window.location.href = '/dashboard';
    }
  }, [user, mode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  if (user && mode !== 'reset') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSignupSuccess = () => {
    setIsLogin(true);
  };

  const handleResetSuccess = () => {
    window.location.href = '/dashboard';
  };

  if (mode === 'reset') {
    return (
      <AuthLayout
        title="Reset your password"
        subtitle="Enter your new password below"
      >
        <ResetPasswordForm onSuccess={handleResetSuccess} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={isLogin ? 'Sign in to your account' : 'Create your account'}
      subtitle={isLogin ? 'Welcome back!' : 'Join ResumeHatch today'}
    >
      {isLogin ? (
        <LoginForm onToggleMode={handleToggleMode} />
      ) : (
        <SignupForm 
          onToggleMode={handleToggleMode} 
          onSignupSuccess={handleSignupSuccess}
        />
      )}
    </AuthLayout>
  );
};

export default Auth;
