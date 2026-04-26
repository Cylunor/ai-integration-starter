import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const DEFAULT_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o";

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function chat(messages: ChatMessage[], model = DEFAULT_MODEL) {
  const response = await openai.chat.completions.create({
    model,
    messages,
    stream: false
  });
  return response.choices[0].message.content ?? "";
}

export async function chatStream(messages: ChatMessage[], model = DEFAULT_MODEL) {
  return openai.chat.completions.create({
    model,
    messages,
    stream: true
  });
}
