export interface EnhancerRequest {
  text: string;
  style: string;
  customization: {
    tone: string;
    formality: string;
    length: string;
    creativity: string;
  };
}

export interface EnhancerResponse {
  status: number;
  message: string;
  data: {
    originalText: string;
    style: string;
    customization: {
      tone: string;
      formality: string;
      length: string;
      creativity: string;
    };
    enhancedVersions: string[];
  };
}
