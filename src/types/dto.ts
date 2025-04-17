export interface CreateChatDto {
  originalText: string;
  enhancedTexts: Array<{
    text: string;
    style: string;
  }>;
  userId: string;
} 