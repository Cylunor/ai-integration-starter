import { openai } from "@/lib/ai/openai";
import { NextRequest } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { messages, model } = await req.json();

  const response = await openai.chat.completions.create({
    model: model ?? process.env.OPENAI_MODEL ?? "gpt-4o",
    messages,
    stream: true
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
