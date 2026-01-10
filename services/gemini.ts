
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

// Fixed to strictly use process.env.API_KEY and named parameter initialization
export const getGeminiClient = () => {
  const apiKey = process.env.API_KEY || "";
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
  
  // The history needs to be passed to ensure the model has context.
  // We exclude the very last message from history because it will be sent via sendMessageStream.
  const chatHistory = history.slice(0, -1);
  const lastMessage = history[history.length - 1].parts[0].text;

  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    history: chatHistory,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
    },
  });

  return await chat.sendMessageStream({ message: lastMessage });
};
