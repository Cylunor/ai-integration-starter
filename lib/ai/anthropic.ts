import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function chat(
  messages: ChatMessage[],
  systemPrompt?: string,
  model = DEFAULT_MODEL
) {
  const response = await anthropic.messages.create({
    model,
    max_tokens: 4096,
    system: systemPrompt,
    messages
  });
  const block = response.content[0];
  return block.type === "text" ? block.text : "";
}

export async function chatStream(
  messages: ChatMessage[],
  systemPrompt?: string,
  model = DEFAULT_MODEL
) {
  return anthropic.messages.stream({
    model,
    max_tokens: 4096,
    system: systemPrompt,
    messages
  });
}
