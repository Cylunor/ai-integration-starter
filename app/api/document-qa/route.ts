import { chat } from "@/lib/ai/anthropic";
import { buildDocumentQAPrompt } from "@/lib/ai/prompts";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { context, question, model } = await req.json();

  if (!context || !question) {
    return NextResponse.json(
      { error: "context and question are required" },
      { status: 400 }
    );
  }

  const { system, messages } = buildDocumentQAPrompt(context, question);
  const answer = await chat(messages, system, model);

  return NextResponse.json({ answer });
}
