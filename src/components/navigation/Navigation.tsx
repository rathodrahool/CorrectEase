import React from "react";
import {
  FiSearch,
  FiPlus,
  FiMessageSquare,
  FiEdit3,
  FiTrash2,
} from "react-icons/fi";
import CreateChatModal from "../modals/CreateChatModal";
import ConfirmationModal from "../modals/ConfirmationModal";
import { chatService } from "../../services/chatService";
import type { Chat } from "../../types/chat";

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
  const [chats, setChats] = React.useState<Chat[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [deletingChatId, setDeletingChatId] = React.useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = React.useState(false);

  const fetchChats = async () => {
    try {
      setIsLoading(true);
      const response = await chatService.getChats({
        limit: 10,
        offset: 0,
        search: searchTerm || undefined,
        order: { created_at: "DESC" },
      });
      setChats(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load chats");
      console.error("Error loading chats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchChats();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const timeoutId = setTimeout(() => {
      fetchChats();
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleChatCreated = (newChats: Chat[]) => {
    setChats(newChats);
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
      <div className="p-4 border-b border-[#DFE1E6]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-[#0052CC] rounded-sm flex items-center justify-center text-white font-bold text-lg">
            CE
          </div>
          <span className="text-lg font-semibold text-[#172B4D]">
            CorrectEase
          </span>
        </div>
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
        <div className="flex items-center bg-white rounded-sm border border-[#DFE1E6] hover:border-[#2684FF] focus-within:border-[#2684FF] focus-within:shadow-[0_0_0_2px_rgba(38,132,255,0.2)]">
          <FiSearch className="text-[#42526E] w-4 h-4 ml-2" />
          <input
            type="text"
            placeholder="Search chats"
            value={searchTerm}
            onChange={handleSearch}
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
            <span>Recent Corrections</span>
          </h3>

          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0052CC]" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm text-center py-4">{error}</div>
          ) : (
            <ul className="space-y-1">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className={`flex items-center p-2 rounded-sm cursor-pointer transition-colors group
                    ${
                      activeUserId === chat.id
                        ? "bg-[#DEEBFF]"
                        : "hover:bg-[#F4F5F7]"
                    }`}
                >
                  <div
                    className="flex-1 flex items-center min-w-0"
                    onClick={() => onUserSelect(chat.id)}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-[#DFE1E6] rounded-sm flex items-center justify-center text-[#42526E] font-medium text-sm">
                        {chat.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#172B4D] truncate">
                          {chat.name}
                        </span>
                        <span className="text-xs text-[#7A869A]">
                          {new Date(chat.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-[#7A869A] truncate">
                        {chat.jobProfile}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletingChatId(chat.id);
                    }}
                    className="p-1.5 text-[#42526E] hover:bg-[#FF563014] hover:text-[#FF5630] 
                      rounded-sm transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete chat"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

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
