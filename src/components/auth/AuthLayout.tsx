import React from 'react';
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}
const AuthLayout = ({
  children,
  title,
  subtitle
}: AuthLayoutProps) => {
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img alt="ResumeHatch Logo" className="h-12 mx-auto mb-4" src="/lovable-uploads/5b8edaa9-fc41-4d1a-97ee-a125ae4371fa.png" />
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-2 text-gray-600">{subtitle}</p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          {children}
        </div>
      </div>
    </div>;
};
export default AuthLayout;