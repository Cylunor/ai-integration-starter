import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { messages, model } = await req.json();

  if (!messages?.length) {
    return Response.json({ error: "messages are required" }, { status: 400 });
  }

  const result = streamText({
    model: openai(model ?? process.env.OPENAI_MODEL ?? "gpt-4o"),
    messages
  });

  return result.toDataStreamResponse();
}
