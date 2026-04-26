import { anthropic } from "@/lib/ai/anthropic";
import { NextRequest } from "next/server";
import { AnthropicStream, StreamingTextResponse } from "ai";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { messages, system, model } = await req.json();

  const response = await anthropic.messages.create({
    model: model ?? process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6",
    max_tokens: 4096,
    stream: true,
    system,
    messages
  });

  const stream = AnthropicStream(response);
  return new StreamingTextResponse(stream);
}
