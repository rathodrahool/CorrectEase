import { User } from "./user";

export interface CreateChatDto {
  name: string;
  jobProfile: string;
  originalText?: string;
  enhancedTexts?: {
    text: string;
    type: string;
  }[];
}

export interface ChatResponse {
  id: string;
  name: string;
  jobProfile: string;
  createdAt: string;
}

export interface ChatListResponse {
  message: string;
  total: number;
  limit: number;
  offset: number;
  data: Chat[];
}

export interface EnhancedText {
  text: string;
  type: string;
}

export interface Chat {
  id: string;
  created_at: string;
  originalText: string;
  enhancedTexts: EnhancedText[];
  aiResponse: string | null;
  user: User;
}

export interface ChatListParams {
  limit?: number;
  offset?: number;
  search?: string;
  order?: {
    [key: string]: "ASC" | "DESC";
  };
}
