import { ReactNode } from 'react';

interface AuthenticationLayoutProps {
  children: ReactNode;
}

export function AuthenticationLayout({ children }: AuthenticationLayoutProps) {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-blue-300">
        {children}
      </div>
    </>
  );
}
