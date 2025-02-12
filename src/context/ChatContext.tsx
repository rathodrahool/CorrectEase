import React, { createContext, useContext, useState, useCallback } from "react";
import { chatService, ChatResponse } from "../services/chatService";

interface ChatContextType {
  chats: ChatResponse[];
  setChats: React.Dispatch<React.SetStateAction<ChatResponse[]>>;
  isLoading: boolean;
  error: string | null;
  fetchUserChats: (userId: string) => Promise<void>;
  currentUserId: string | null;
  setCurrentUserId: (userId: string | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chats, setChats] = useState<ChatResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const fetchUserChats = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await chatService.getUserChats(userId);
      setChats(response);
    } catch (err) {
      setError("Failed to load chats");
      console.error("Error fetching chats:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        isLoading,
        error,
        fetchUserChats,
        currentUserId,
        setCurrentUserId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
