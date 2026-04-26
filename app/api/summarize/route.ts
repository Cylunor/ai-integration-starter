import { chat } from "@/lib/ai/openai";
import { buildSummaryPrompt } from "@/lib/ai/prompts";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { text, maxLength, model } = await req.json();

  if (!text?.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  try {
    const { system, messages } = buildSummaryPrompt(text, maxLength);
    const openaiMessages = [
      { role: "system" as const, content: system },
      ...messages
    ];
    const summary = await chat(openaiMessages, model);
    return NextResponse.json({ summary });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `AI request failed: ${message}` }, { status: 503 });
  }
}
