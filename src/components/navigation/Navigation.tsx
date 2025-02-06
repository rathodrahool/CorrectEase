import React from "react";
import { FiSearch, FiPlus, FiMessageSquare } from "react-icons/fi";

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  online: boolean;
  lastMessage?: string;
  timestamp?: string;
}

const mockChats: ChatUser[] = [
  {
    id: "1",
    name: "Yagnik Gohil",
    online: true,
    lastMessage: "Thanks for the help with...",
    timestamp: "2m",
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

const Navigation: React.FC = () => {
  const [activeChat, setActiveChat] = React.useState<string>("");

  return (
    <nav className="w-64 h-screen bg-[#FAFBFC] border-r border-[#DFE1E6] flex flex-col sticky top-0">
      <div className="p-4 border-b border-[#DFE1E6]">
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
        <button className="w-full py-2 px-3 bg-[#0052CC] text-white rounded-sm text-sm font-medium flex items-center gap-2 hover:bg-[#0065FF] transition-colors">
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
            {mockChats.map((chat) => (
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
                  {chat.lastMessage && (
                    <p className="text-xs text-[#7A869A] truncate">
                      {chat.lastMessage}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
