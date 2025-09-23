import { GoogleGenAI } from "@google/genai";

export default defineEventHandler(async (event) => {
  const { prompt } = await readBody(event);
  const { geminiAIKey } = useRuntimeConfig();
  const genAI = new GoogleGenAI({ apiKey: geminiAIKey });
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    config: {
      systemInstruction: "You are a financial adviser. Your name is Neko.",
    },
  });
  return {
    reply: response.text,
  };
});
