import React from "react";
import Navigation, { ActiveTab } from "../navigation/Navigation";
import Editor from "../editor/Editor";
import CorrectionHistory from "../history/CorrectionHistory";
import Settings from "../settings/Settings";
import { FiSettings, FiUser } from "react-icons/fi";

const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("editor");
  const [activeUserId, setActiveUserId] = React.useState<string>("");
  const [showSettings, setShowSettings] = React.useState(false);

  const handleUserSelect = (userId: string) => {
    setActiveUserId(userId);
    setActiveTab("history");
    setShowSettings(false);
  };

  const renderMainContent = () => {
    if (showSettings) {
      return <Settings />;
    }
    return activeTab === "editor" ? (
      <Editor activeUserId={activeUserId} />
    ) : (
      <CorrectionHistory userId={activeUserId} />
    );
  };

  return (
    <div className="flex min-h-screen bg-[#FAFBFC] relative">
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setShowSettings(false);
        }}
        activeUserId={activeUserId}
        onUserSelect={handleUserSelect}
      />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-[#DFE1E6] px-6 flex items-center justify-between bg-white sticky top-0 z-20">
          <h1 className="text-lg font-medium text-[#172B4D]">
            {showSettings
              ? "Settings"
              : activeTab === "editor"
              ? "CorrectEase Editor"
              : `CorrectEase History ${activeUserId ? "- Corrections" : ""}`}
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 text-[#42526E] hover:bg-[#F4F5F7] rounded-sm transition-colors group relative
                ${showSettings ? "bg-[#DEEBFF] text-[#0052CC]" : ""}`}
              aria-label="Settings"
            >
              <FiSettings className="w-5 h-5" />
              <span
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                bg-[#172B4D] text-white text-xs py-1 px-2 rounded opacity-0 
                group-hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                Settings
              </span>
            </button>
            <button
              className="p-2 text-[#42526E] hover:bg-[#F4F5F7] rounded-sm transition-colors group relative"
              aria-label="Profile"
            >
              <FiUser className="w-5 h-5" />
              <span
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                bg-[#172B4D] text-white text-xs py-1 px-2 rounded opacity-0 
                group-hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                Profile
              </span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto relative z-10">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;
