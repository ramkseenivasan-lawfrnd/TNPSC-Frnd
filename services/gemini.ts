
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants.ts";

/**
 * Utility to strip common Markdown symbols that often clutter 
 * the UI if not rendered by a dedicated Markdown component.
 */
export const cleanMarkdown = (text: string): string => {
  return text
    .replace(/\*\*/g, '')      // Strip bold
    .replace(/###\s+/g, '')    // Strip H3
    .replace(/##\s+/g, '')     // Strip H2
    .replace(/#\s+/g, '')      // Strip H1
    .replace(/__+/g, '')       // Strip underlines
    .replace(/`+/g, '')        // Strip backticks
    .trim();
};

export const getGeminiClient = () => {
  const apiKey = (process.env as any).API_KEY || 
                 (process.env as any).VITE_API_KEY || 
                 (import.meta as any).env?.VITE_API_KEY || 
                 "";
                 
  return new GoogleGenAI({ apiKey });
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
    text: cleanMarkdown(response.text || "No response generated."),
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
