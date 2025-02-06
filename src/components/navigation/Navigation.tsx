import React from "react";
import {
  FiSearch,
  FiPlus,
  FiMessageSquare,
  FiCheckCircle,
  FiEdit3,
} from "react-icons/fi";
import CreateChatModal from "../modals/CreateChatModal";

export type ActiveTab = "editor" | "chat";

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  online: boolean;
  lastMessage?: string;
  timestamp?: string;
  savedTexts?: SavedText[];
  jobProfile?: string;
}

interface SavedText {
  id: string;
  originalText: string;
  enhancedText: string;
  style: string;
  timestamp: string;
}

const mockChats: ChatUser[] = [
  {
    id: "1",
    name: "Yagnik Gohil",
    online: true,
    lastMessage: "Last enhanced: 'Thanks for the help...'",
    timestamp: "2m",
    savedTexts: [
      {
        id: "t1",
        originalText: "thanks for the help with...",
        enhancedText: "Thank you for your assistance with...",
        style: "formal",
        timestamp: new Date().toISOString(),
      },
    ],
  },
  {
    id: "2",
    name: "Tushar Panchal",
    online: false,
    lastMessage: "Could you check this...",
    timestamp: "1h",
  },
  // Add more mock data as needed
];

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const [activeChat, setActiveChat] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [chats, setChats] = React.useState<ChatUser[]>(mockChats);

  const handleCreateChat = (data: { name: string; jobProfile: string }) => {
    const newChat: ChatUser = {
      id: Date.now().toString(),
      name: data.name,
      jobProfile: data.jobProfile,
      online: true,
      timestamp: "now",
    };

    setChats((prev) => [newChat, ...prev]);
  };

  return (
    <nav className="w-64 h-screen bg-[#FAFBFC] border-r border-[#DFE1E6] flex flex-col sticky top-0 z-30">
      <div className="p-4 border-b border-[#DFE1E6]">
        <div className="flex items-center space-x-2 mb-4">
          <button
            onClick={() => onTabChange("editor")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-sm text-sm font-medium transition-colors
              ${
                activeTab === "editor"
                  ? "bg-[#DEEBFF] text-[#0052CC]"
                  : "text-[#42526E] hover:bg-[#F4F5F7]"
              }`}
          >
            <FiEdit3 className="w-4 h-4" />
            <span>Editor</span>
          </button>
          <button
            onClick={() => onTabChange("chat")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-sm text-sm font-medium transition-colors
              ${
                activeTab === "chat"
                  ? "bg-[#DEEBFF] text-[#0052CC]"
                  : "text-[#42526E] hover:bg-[#F4F5F7]"
              }`}
          >
            <FiMessageSquare className="w-4 h-4" />
            <span>Chats</span>
          </button>
        </div>
        <div className="flex items-center bg-white rounded-sm border border-[#DFE1E6] hover:border-[#2684FF] focus-within:border-[#2684FF] focus-within:shadow-[0_0_0_2px_rgba(38,132,255,0.2)]">
          <FiSearch className="text-[#42526E] w-4 h-4 ml-2" />
          <input
            type="text"
            placeholder="Search chats"
            className="w-full py-2 px-2 text-sm text-[#172B4D] placeholder-[#7A869A] bg-transparent focus:outline-none"
          />
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-2 px-3 bg-[#0052CC] text-white rounded-sm text-sm 
            font-medium flex items-center gap-2 hover:bg-[#0065FF] transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          <span>Create Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <h3 className="flex items-center text-xs font-medium text-[#42526E] mb-3 uppercase tracking-wide">
            <FiMessageSquare className="w-4 h-4 mr-2" />
            <span>Recent Chats</span>
          </h3>
          <ul className="space-y-1">
            {chats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`flex items-center p-2 rounded-sm cursor-pointer transition-colors
                  ${
                    activeChat === chat.id
                      ? "bg-[#DEEBFF]"
                      : "hover:bg-[#F4F5F7]"
                  }`}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-[#DFE1E6] rounded-sm flex items-center justify-center text-[#42526E] font-medium text-sm">
                    {chat.avatar || chat.name.charAt(0)}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#2684FF] rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#172B4D] truncate">
                      {chat.name}
                    </span>
                    {chat.timestamp && (
                      <span className="text-xs text-[#7A869A]">
                        {chat.timestamp}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#7A869A] truncate">
                    {chat.jobProfile}
                  </p>
                  {chat.lastMessage && (
                    <p className="text-xs text-[#7A869A] truncate flex items-center gap-1">
                      {chat.savedTexts && chat.savedTexts.length > 0 && (
                        <FiCheckCircle className="w-3 h-3 text-[#0052CC]" />
                      )}
                      {chat.lastMessage}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CreateChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateChat}
      />
    </nav>
  );
};

export default Navigation;
