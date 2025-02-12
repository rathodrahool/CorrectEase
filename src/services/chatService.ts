import api from "./api";

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

export const chatService = {
  createChat: async (
    userId: string,
    data: CreateChatDto
  ): Promise<ChatResponse> => {
    const response = await api.post<ChatResponse>(`/chat/user/${userId}`, data);
    return response.data;
  },

  getUserChats: async (userId: string): Promise<ChatResponse[]> => {
    const response = await api.get<ChatResponse[]>(`/chat/user/${userId}`);
    return response.data;
  },

  getChatById: async (
    userId: string,
    chatId: string
  ): Promise<ChatResponse> => {
    const response = await api.get<ChatResponse>(
      `/chat/user/${userId}/chat/${chatId}`
    );
    return response.data;
  },

  updateChat: async (
    userId: string,
    chatId: string,
    data: Partial<CreateChatDto>
  ): Promise<ChatResponse> => {
    const response = await api.patch<ChatResponse>(
      `/chat/user/${userId}/chat/${chatId}`,
      data
    );
    return response.data;
  },
};
