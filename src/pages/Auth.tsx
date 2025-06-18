
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Auth = () => {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      window.location.href = '/dashboard';
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSignupSuccess = () => {
    setIsLogin(true);
  };

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
