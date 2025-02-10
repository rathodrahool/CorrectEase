import api from "./api";
import {
  CreateChatDto,
  ChatResponse,
  ChatListResponse,
  ChatListParams,
} from "../types/chat";

export const chatService = {
  createChat: async (data: CreateChatDto): Promise<ChatResponse> => {
    const response = await api.post<ChatResponse>("/chat", data);
    return response.data;
  },

  getChats: async (params: ChatListParams = {}): Promise<ChatListResponse> => {
    const response = await api.get<ChatListResponse>("/chat", { params });
    return response.data;
  },
};
