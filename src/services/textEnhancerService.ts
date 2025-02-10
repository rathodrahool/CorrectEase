import api from "./api";
import { EnhancerRequest, EnhancerResponse } from "./types/textEnhancer";

export class TextEnhancerService {
  private static endpoint = "/text-enhancer";

  static async enhanceText(
    request: EnhancerRequest
  ): Promise<EnhancerResponse> {
    const { data } = await api.post<EnhancerResponse>(
      `${this.endpoint}/enhance`,
      request
    );
    return data;
  }

  static mapCustomizationToApi(settings: {
    tone: number;
    formality: number;
    length: number;
    creativity: number;
  }) {
    return {
      tone:
        settings.tone >= 75
          ? "friendly"
          : settings.tone <= 25
          ? "formal"
          : "semi-formal",
      formality:
        settings.formality >= 75
          ? "formal"
          : settings.formality <= 25
          ? "casual"
          : "semi-formal",
      length:
        settings.length >= 75
          ? "longer"
          : settings.length <= 25
          ? "shorter"
          : "similar",
      creativity:
        settings.creativity >= 75
          ? "high"
          : settings.creativity <= 25
          ? "low"
          : "moderate",
    };
  }
}
