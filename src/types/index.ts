export interface User {
  id: string;
  name: string;
  avatar?: string;
  jobProfile?: string;
}

export interface CorrectionEntry {
  id: string;
  userId: string;
  originalText: string;
  enhancedText: string;
  style: string;
  timestamp: string;
  source?: string;
}

export interface CorrectionStyle {
  id: string;
  name: string;
  description: string;
}
