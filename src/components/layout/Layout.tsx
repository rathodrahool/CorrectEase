import React from "react";
import Navigation from "../navigation/Navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#FAFBFC]">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-[#DFE1E6] px-6 flex items-center bg-white sticky top-0 z-10">
          {/* Header content */}
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
