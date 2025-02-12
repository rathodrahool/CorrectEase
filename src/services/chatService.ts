import api from "./api";
import { Chat } from "../types/chat";

export interface CreateChatDto {
  originalText: string;
  enhancedTexts?: {
    text: string;
    type: string;
  }[];
}

export interface ChatResponse {
  id: string;
  originalText: string;
  enhancedTexts: {
    text: string;
    type: string;
  }[];
  created_at: string;
  updated_at: string;
}

interface ChatListResponse {
  message: string;
  total: number;
  limit: number;
  offset: number;
  data: Chat[];
}

const chatService = {
  async createChat(userId: string, data: CreateChatDto): Promise<ChatResponse> {
    const response = await api.post<ChatResponse>(`/chat/user/${userId}`, data);
    return response.data;
  },

  async getUserChats(userId: string): Promise<ChatListResponse> {
    const response = await api.get<ChatListResponse>(`/chat/user/${userId}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch user chats");
    }
    return response.data;
  },

  async getChatById(userId: string, chatId: string): Promise<ChatResponse> {
    const response = await api.get<ChatResponse>(
      `/chat/user/${userId}/chat/${chatId}`
    );
    return response.data;
  },

  async updateChat(
    userId: string,
    chatId: string,
    data: Partial<CreateChatDto>
  ): Promise<ChatResponse> {
    const response = await api.patch<ChatResponse>(
      `/chat/user/${userId}/chat/${chatId}`,
      data
    );
    return response.data;
  },
};

export { chatService };
