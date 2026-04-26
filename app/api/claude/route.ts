import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { messages, system, model } = await req.json();

  if (!messages?.length) {
    return Response.json({ error: "messages are required" }, { status: 400 });
  }

  const result = streamText({
    model: anthropic(model ?? process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6"),
    system,
    messages
  });

  return result.toDataStreamResponse();
}
