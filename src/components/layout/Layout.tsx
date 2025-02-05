import React from "react";
import Navigation from "../navigation/Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-gray-200 px-8 flex items-center bg-white shadow-sm sticky top-0 z-10">
          {/* Header content */}
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
