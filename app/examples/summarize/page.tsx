"use client";

import { useState } from "react";

export default function SummarizePage() {
  const [text, setText] = useState("");
  const [maxLength, setMaxLength] = useState(150);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setSummary("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, maxLength })
      });
      const data = await res.json();
      setSummary(data.summary);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="text-xs text-cyan-400 uppercase tracking-widest mb-2">OpenAI</div>
        <h1 className="text-2xl font-bold text-white">Text Summarizer</h1>
        <p className="text-sm text-slate-400 mt-1">Summarize long documents with configurable length</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs text-slate-400 uppercase tracking-widest block mb-2">
            Text to Summarize
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Paste the text you want to summarize..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500 resize-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-xs text-slate-400 uppercase tracking-widest whitespace-nowrap">
            Max words: {maxLength}
          </label>
          <input
            type="range"
            min={50}
            max={500}
            step={50}
            value={maxLength}
            onChange={(e) => setMaxLength(Number(e.target.value))}
            className="flex-1 accent-cyan-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-medium hover:bg-slate-100 transition disabled:opacity-40"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </form>

      {summary && (
        <div className="mt-6 p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-3">Summary</div>
          <p className="text-sm text-slate-200 leading-7 whitespace-pre-wrap">{summary}</p>
        </div>
      )}
    </main>
  );
}
