import React from "react";
import Navigation, { ActiveTab } from "../navigation/Navigation";
import Editor from "../editor/Editor";
import CorrectionHistory from "../history/CorrectionHistory";

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("editor");
  const [activeUserId, setActiveUserId] = React.useState<string>("");

  const handleUserSelect = (userId: string) => {
    setActiveUserId(userId);
    setActiveTab("history");
  };

  return (
    <div className="flex min-h-screen bg-[#FAFBFC] relative">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeUserId={activeUserId}
        onUserSelect={handleUserSelect}
      />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-[#DFE1E6] px-6 flex items-center bg-white sticky top-0 z-20">
          <h1 className="text-lg font-medium text-[#172B4D]">
            {activeTab === "editor"
              ? "Text Editor"
              : `Text Corrections ${activeUserId ? "- History" : ""}`}
          </h1>
        </header>
        <main className="flex-1 overflow-auto relative z-10">
          {activeTab === "editor" ? (
            <Editor activeUserId={activeUserId} />
          ) : (
            <CorrectionHistory userId={activeUserId} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
