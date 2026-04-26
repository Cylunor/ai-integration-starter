"use client";

import { useChat } from "ai/react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat"
  });

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="text-xs text-cyan-400 uppercase tracking-widest mb-2">OpenAI</div>
        <h1 className="text-2xl font-bold text-white">Chat Interface</h1>
        <p className="text-sm text-slate-400 mt-1">Streaming chat with GPT-4o</p>
      </div>

      <div className="space-y-4 mb-6 min-h-[300px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-xl text-sm ${
              message.role === "user"
                ? "bg-slate-800 text-white ml-8"
                : "bg-slate-900 border border-slate-800 text-slate-200 mr-8"
            }`}
          >
            <div className="text-xs text-slate-500 mb-1 uppercase tracking-widest">
              {message.role}
            </div>
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mr-8">
            <div className="text-xs text-slate-500 mb-1 uppercase tracking-widest">assistant</div>
            <span className="text-slate-400">Thinking...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-slate-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-3 bg-white text-slate-900 rounded-xl text-sm font-medium hover:bg-slate-100 transition disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </main>
  );
}
