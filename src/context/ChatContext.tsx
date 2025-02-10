import React, { createContext, useContext, useState, useCallback } from "react";
import { Chat, ChatListParams } from "../types/chat";
import { chatService } from "../services/chatService";

interface ChatContextType {
  chats: Chat[];
  isLoading: boolean;
  error: string | null;
  fetchChats: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChats = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await chatService.getChats({
        limit: 10,
        offset: 0,
        order: { created_at: "DESC" },
      });
      setChats(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load chats");
      console.error("Error fetching chats:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ChatContext.Provider value={{ chats, isLoading, error, fetchChats }}>
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
