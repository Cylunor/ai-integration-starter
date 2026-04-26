"use client";

import { useState } from "react";

export default function DocumentQAPage() {
  const [context, setContext] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!context.trim() || !question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/document-qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, question })
      });
      const data = await res.json();
      setAnswer(data.answer);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="text-xs text-cyan-400 uppercase tracking-widest mb-2">Anthropic</div>
        <h1 className="text-2xl font-bold text-white">Document Q&A</h1>
        <p className="text-sm text-slate-400 mt-1">Paste any text and ask questions about it</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs text-slate-400 uppercase tracking-widest block mb-2">
            Document / Context
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={6}
            placeholder="Paste your document or text here..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500 resize-none"
          />
        </div>

        <div>
          <label className="text-xs text-slate-400 uppercase tracking-widest block mb-2">
            Question
          </label>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like to know?"
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-slate-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !context.trim() || !question.trim()}
          className="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-medium hover:bg-slate-100 transition disabled:opacity-40"
        >
          {loading ? "Analyzing..." : "Get Answer"}
        </button>
      </form>

      {answer && (
        <div className="mt-6 p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-3">Answer</div>
          <p className="text-sm text-slate-200 leading-7 whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </main>
  );
}
