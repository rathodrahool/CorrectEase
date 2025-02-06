import React from "react";
import Navigation, { ActiveTab } from "../navigation/Navigation";
import Editor from "../editor/Editor";
import Chat from "../chat/Chat";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("editor");

  return (
    <div className="flex min-h-screen bg-[#FAFBFC] relative">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-[#DFE1E6] px-6 flex items-center bg-white sticky top-0 z-20">
          <h1 className="text-lg font-medium text-[#172B4D]">
            {activeTab === "editor" ? "Text Editor" : "Chat History"}
          </h1>
        </header>
        <main className="flex-1 overflow-auto relative z-10">
          {activeTab === "editor" ? <Editor /> : <Chat />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
