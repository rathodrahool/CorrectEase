import React from "react";
import {
  FiSearch,
  FiPlus,
  FiMessageSquare,
  FiEdit3,
  FiTrash2,
  FiClock,
  FiCalendar,
  FiBriefcase,
} from "react-icons/fi";
import CreateChatModal from "../modals/CreateChatModal";
import ConfirmationModal from "../modals/ConfirmationModal";
import { chatService } from "../../services/chatService";
import type { Chat } from "../../types/chat";
import { useChat } from "../../context/ChatContext";

export type ActiveTab = "editor" | "history";

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  activeUserId: string;
  onUserSelect: (userId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  activeUserId,
  onUserSelect,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [deletingChatId, setDeletingChatId] = React.useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = React.useState(false);

  const { chats, isLoading, error, fetchChats } = useChat();

  React.useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const timeoutId = setTimeout(() => {
      fetchChats();
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleChatCreated = async () => {
    await fetchChats(); // Just refetch the chats after creation
  };

  const handleDeleteChat = async () => {
    if (!deletingChatId) return;

    setIsDeleting(true);
    try {
      await chatService.deleteChat(deletingChatId);
      setChats((prevChats) =>
        prevChats.filter((chat) => chat.id !== deletingChatId)
      );
      if (activeUserId === deletingChatId) {
        onUserSelect(""); // Clear selected user if deleted
      }
    } catch (err) {
      console.error("Error deleting chat:", err);
      // Could add toast notification here
    } finally {
      setIsDeleting(false);
      setDeletingChatId(null);
    }
  };

  return (
    <nav className="w-64 h-screen bg-[#FAFBFC] border-r border-[#DFE1E6] flex flex-col sticky top-0 z-30">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#DFE1E6] bg-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-[#0052CC] rounded-sm flex items-center justify-center text-white font-bold text-lg">
            CE
          </div>
          <span className="text-lg font-semibold text-[#172B4D]">
            CorrectEase
          </span>
        </div>

        {/* Tab Navigation */}
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
            onClick={() => onTabChange("history")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-sm text-sm font-medium transition-colors
              ${
                activeTab === "history"
                  ? "bg-[#DEEBFF] text-[#0052CC]"
                  : "text-[#42526E] hover:bg-[#F4F5F7]"
              }`}
          >
            <FiMessageSquare className="w-4 h-4" />
            <span>History</span>
          </button>
        </div>

        {/* Search Bar with Icon */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-[#42526E] w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search chats"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full py-2 pl-9 pr-3 text-sm text-[#172B4D] 
              placeholder-[#7A869A] bg-white border border-[#DFE1E6] 
              rounded-sm focus:outline-none focus:border-[#2684FF] 
              focus:ring-2 focus:ring-[#2684FF] focus:ring-opacity-25
              transition-all duration-200"
          />
        </div>
      </div>

      {/* Create Chat Button */}
      <div className="p-4 bg-white border-b border-[#DFE1E6]">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-2 px-3 bg-[#0052CC] text-white rounded-sm text-sm 
            font-medium flex items-center gap-2 hover:bg-[#0065FF] transition-colors
            shadow-sm hover:shadow-md"
        >
          <FiPlus className="w-4 h-4" />
          <span>Create New Chat</span>
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto bg-[#FAFBFC]">
        <div className="p-4">
          <h3 className="flex items-center text-xs font-medium text-[#42526E] mb-2 uppercase tracking-wide">
            <FiMessageSquare className="w-4 h-4 mr-2" />
            <span>Recent Chats</span>
          </h3>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-6 px-4">
              <div className="animate-spin h-6 w-6 border-2 border-[#0052CC] border-t-transparent" />
              <p className="text-sm text-[#42526E] mt-2">Loading chats...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-3 text-sm text-center">
              {error}
            </div>
          ) : chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
              <div className="w-10 h-10 bg-[#DEEBFF] flex items-center justify-center mb-2">
                <FiMessageSquare className="w-5 h-5 text-[#0052CC]" />
              </div>
              <p className="text-sm text-[#42526E]">No chats found</p>
              <p className="text-xs text-[#7A869A] mt-1">
                Create a new chat to get started
              </p>
            </div>
          ) : (
            <ul className="space-y-1">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className={`group transition-all duration-200
                    ${
                      activeUserId === chat.id
                        ? "bg-[#DEEBFF]"
                        : "hover:bg-[#F4F5F7]"
                    }`}
                >
                  <div className="flex items-center p-2">
                    <div
                      className="flex-1 flex items-center min-w-0 cursor-pointer"
                      onClick={() => onUserSelect(chat.id)}
                    >
                      <div className="relative">
                        <div
                          className={`w-8 h-8 flex items-center justify-center text-sm font-medium
                            transition-colors duration-200
                            ${
                              activeUserId === chat.id
                                ? "bg-[#0052CC] text-white"
                                : "bg-[#DFE1E6] text-[#42526E] group-hover:bg-[#0052CC] group-hover:text-white"
                            }`}
                        >
                          {chat.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#172B4D] truncate">
                            {chat.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#7A869A]">
                          <span className="truncate">{chat.jobProfile}</span>
                          <span className="text-[#DFE1E6]">•</span>
                          <span className="whitespace-nowrap">
                            {new Date(chat.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingChatId(chat.id);
                      }}
                      className="p-1.5 text-[#42526E] hover:bg-[#FF563014] hover:text-[#FF5630] 
                        transition-colors opacity-0 group-hover:opacity-100
                        focus:opacity-100 focus:outline-none"
                      title="Delete chat"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChatCreated={handleChatCreated}
      />

      <ConfirmationModal
        isOpen={!!deletingChatId}
        onClose={() => setDeletingChatId(null)}
        onConfirm={handleDeleteChat}
        title="Delete Chat"
        message="Are you sure you want to delete this chat? This action cannot be undone."
        isLoading={isDeleting}
      />
    </nav>
  );
};

export default Navigation;
