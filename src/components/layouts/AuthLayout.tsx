import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 border border-red-600">
      <h2 className="text-lg font-semibold text-black">Expensify</h2>
      {children}
    </div>
  );
};

export default AuthLayout;
