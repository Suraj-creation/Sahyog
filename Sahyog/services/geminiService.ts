
import { GoogleGenAI, Type } from "@google/genai";
import { SATHI_SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async processInput(text: string, screenShot?: string, context?: any) {
    const modelName = 'gemini-3-flash-preview';
    
    const parts: any[] = [
      { text: `CONTEXT: ${JSON.stringify(context)}\nUSER MESSAGE: ${text}` }
    ];

    if (screenShot) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: screenShot.split(',')[1] // Remove prefix
        }
      });
    }

    try {
      const result = await this.ai.models.generateContent({
        model: modelName,
        contents: { parts },
        config: {
          systemInstruction: SATHI_SYSTEM_PROMPT,
          responseMimeType: "application/json",
          temperature: 0.7,
        }
      });

      const responseText = result.text || '{}';
      return JSON.parse(responseText);
    } catch (error) {
      console.error("Gemini API Error:", error);
      return {
        spokenResponse: "Maaf kijiye, mujhe thoda samay dijiye. (Sorry, give me a moment.)",
        intent: "error",
        emotion: "confused",
        actions: []
      };
    }
  }
}

export const geminiService = new GeminiService();
