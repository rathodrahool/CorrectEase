import React from "react";
import Navigation from "../navigation/Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-gray-200 px-6 flex items-center bg-white">
          {/* Header content */}
        </header>
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
