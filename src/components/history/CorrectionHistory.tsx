import React from "react";
import {
  FiCopy,
  FiCheck,
  FiCalendar,
  FiClock,
  FiFilter,
  FiSearch,
  FiGrid,
  FiList,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { format, formatDistanceToNow } from "date-fns";
import { Chat } from "../../types/chat";
import { chatService } from "../../services/chatService";

interface CorrectionHistoryProps {
  userId: string;
}

const CorrectionHistory: React.FC<CorrectionHistoryProps> = ({ userId }) => {
  const [chats, setChats] = React.useState<Chat[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const filterRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Fetch chats
  React.useEffect(() => {
    const fetchChats = async () => {
      if (!userId) return;

      setIsLoading(true);
      setError(null);
      try {
        const result = await chatService.getUserChats(userId);
        setChats(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch chats");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, [userId]);

  // Filter chats based on search and type
  const filteredChats = React.useMemo(() => {
    return chats.filter((chat) => {
      const matchesSearch =
        searchTerm.toLowerCase() === "" ||
        chat.originalText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.enhancedTexts.some((et) =>
          et.text.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType =
        selectedType === "all" ||
        chat.enhancedTexts.some((et) => et.type === selectedType);

      return matchesSearch && matchesType;
    });
  }, [chats, searchTerm, selectedType]);

  // Get unique enhancement types
  const enhancementTypes = React.useMemo(() => {
    const types = new Set<string>();
    chats.forEach((chat) => {
      chat.enhancedTexts.forEach((et) => types.add(et.type));
    });
    return ["all", ...Array.from(types)];
  }, [chats]);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Add click outside handler for filter dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // CMD/CTRL + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // ESC to clear search
      if (e.key === "Escape") {
        setSearchTerm("");
        searchInputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-[#42526E] space-y-4">
        <FiSearch className="w-12 h-12 text-[#DFE1E6]" />
        <span>Select a user to view their correction history</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-6 w-6 border-2 border-[#0052CC] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-600">
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col h-full">
      {/* Enhanced Toolbar */}
      <div className="p-4 border-b border-[#DFE1E6] bg-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search and Filter Group */}
          <div className="flex-1 flex items-center gap-3 max-w-2xl">
            {/* Enhanced Search Input */}
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FiSearch className="w-4 h-4 text-[#7A869A] group-focus-within:text-[#0052CC]" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search corrections... (⌘K)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-12 py-2.5 border border-[#DFE1E6] rounded-md
                  text-[#172B4D] placeholder-[#7A869A] text-sm
                  focus:outline-none focus:border-[#2684FF] focus:ring-2 
                  focus:ring-[#2684FF] focus:ring-opacity-25 transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                    p-1 hover:bg-[#F4F5F7] rounded-full transition-colors"
                >
                  <FiX className="w-4 h-4 text-[#42526E]" />
                </button>
              )}
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none
                text-xs text-[#7A869A] hidden md:block"
              >
                {searchTerm ? "" : "⌘K"}
              </div>
            </div>

            {/* Enhanced Filter Dropdown */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-3 py-2.5 border rounded-md
                  transition-all text-sm font-medium
                  ${
                    selectedType !== "all"
                      ? "border-[#2684FF] text-[#0052CC] bg-[#DEEBFF]"
                      : "border-[#DFE1E6] text-[#42526E] hover:bg-[#F4F5F7]"
                  }`}
              >
                <FiFilter
                  className={`w-4 h-4 ${
                    selectedType !== "all" ? "text-[#0052CC]" : "text-[#7A869A]"
                  }`}
                />
                <span>
                  {selectedType === "all"
                    ? "All Types"
                    : selectedType.charAt(0).toUpperCase() +
                      selectedType.slice(1)}
                </span>
                <FiChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isFilterOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-48 bg-white border
                  border-[#DFE1E6] rounded-md shadow-lg z-50 py-1"
                >
                  {enhancementTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm
                        flex items-center justify-between
                        ${
                          type === selectedType
                            ? "bg-[#DEEBFF] text-[#0052CC]"
                            : "text-[#172B4D] hover:bg-[#F4F5F7]"
                        }`}
                    >
                      {type === "all"
                        ? "All Types"
                        : type.charAt(0).toUpperCase() + type.slice(1)}
                      {type === selectedType && <FiCheck className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* View Toggle only (removed Export button) */}
          <div className="flex items-center border border-[#DFE1E6] rounded-md">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${
                viewMode === "list"
                  ? "bg-[#DEEBFF] text-[#0052CC]"
                  : "text-[#42526E] hover:bg-[#F4F5F7]"
              }`}
              title="List view"
            >
              <FiList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${
                viewMode === "grid"
                  ? "bg-[#DEEBFF] text-[#0052CC]"
                  : "text-[#42526E] hover:bg-[#F4F5F7]"
              }`}
              title="Grid view"
            >
              <FiGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredChats.length === 0 ? (
          <div className="text-center text-[#42526E] py-8">
            {searchTerm
              ? "No corrections match your search"
              : "No correction history available"}
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                : "space-y-4"
            }
          >
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className="bg-white border border-[#DFE1E6] rounded-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#7A869A]">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      <span>
                        {format(new Date(chat.created_at), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="w-4 h-4" />
                      <span>
                        {formatDistanceToNow(new Date(chat.created_at))} ago
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-[#7A869A]">
                      Original Text
                    </label>
                    <p className="text-sm text-[#172B4D] p-2 bg-[#F4F5F7] rounded-sm">
                      {chat.originalText}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs text-[#7A869A]">
                      Enhanced Versions
                    </label>
                    {chat.enhancedTexts.map((enhanced, index) => (
                      <div key={index} className="relative group">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-[#0052CC] bg-[#DEEBFF] px-2 py-0.5 rounded-sm">
                            {enhanced.type.charAt(0).toUpperCase() +
                              enhanced.type.slice(1)}
                          </span>
                          <button
                            onClick={() =>
                              handleCopy(enhanced.text, `${chat.id}-${index}`)
                            }
                            className="text-[#42526E] hover:bg-[#F4F5F7] p-1.5 rounded-sm transition-colors"
                          >
                            {copiedId === `${chat.id}-${index}` ? (
                              <FiCheck className="w-4 h-4 text-[#0052CC]" />
                            ) : (
                              <FiCopy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-sm text-[#172B4D] p-2 bg-[#DEEBFF] rounded-sm">
                          {enhanced.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CorrectionHistory;
