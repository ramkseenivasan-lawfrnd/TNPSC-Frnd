
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants.ts";

export const getGeminiClient = () => {
  // Always use the direct process.env.API_KEY as per guidelines
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateExamContent = async (prompt: string, searchGrounding = true) => {
  const ai = getGeminiClient();
  const config: any = {
    systemInstruction: SYSTEM_INSTRUCTION,
    temperature: 0.7,
  };

  if (searchGrounding) {
    config.tools = [{ googleSearch: {} }];
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config,
  });

  return {
    text: response.text || "No response generated.",
    grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const streamExamChat = async (history: { role: string; parts: { text: string }[] }[]) => {
  const ai = getGeminiClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
    },
  });

  const lastMessage = history[history.length - 1].parts[0].text;
  return await chat.sendMessageStream({ message: lastMessage });
};
