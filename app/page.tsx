import Link from "next/link";

const examples = [
  {
    href: "/examples/chat",
    title: "Chat Interface",
    description: "Streaming chat with OpenAI GPT-4o. Drop-in component for any Next.js app.",
    provider: "OpenAI"
  },
  {
    href: "/examples/claude",
    title: "Claude Assistant",
    description: "Streaming chat with Anthropic Claude. System prompt support included.",
    provider: "Anthropic"
  },
  {
    href: "/examples/document-qa",
    title: "Document Q&A",
    description: "Upload text and ask questions. Powered by Claude with context injection.",
    provider: "Anthropic"
  },
  {
    href: "/examples/summarize",
    title: "Text Summarizer",
    description: "Summarize long documents with configurable output length.",
    provider: "OpenAI"
  }
];

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div className="text-sm text-cyan-400 uppercase tracking-widest mb-4">
          Cylunor Open Source
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          AI Integration Starter
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Production-ready Next.js 16 starter kit for integrating OpenAI and Anthropic Claude
          into business workflows. TypeScript, App Router, streaming responses.
        </p>
        <div className="flex gap-4 mt-6">
          <a
            href="https://github.com/Cylunor/ai-integration-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-100 transition"
          >
            View on GitHub
          </a>
          <a
            href="https://cylunor.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:border-slate-500 transition"
          >
            cylunor.com
          </a>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {examples.map((example) => (
          <Link
            key={example.href}
            href={example.href}
            className="block p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-600 transition"
          >
            <div className="text-xs text-cyan-400 uppercase tracking-widest mb-2">
              {example.provider}
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">{example.title}</h2>
            <p className="text-sm text-slate-400">{example.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl border border-slate-800 bg-slate-900/30">
        <h2 className="text-sm font-semibold text-white mb-3">Quick start</h2>
        <pre className="text-sm text-slate-300 overflow-x-auto">
          <code>{`git clone https://github.com/Cylunor/ai-integration-starter
cd ai-integration-starter
cp .env.example .env.local
# Add your API keys to .env.local
npm install && npm run dev`}</code>
        </pre>
      </div>

      <div className="mt-8 text-center text-sm text-slate-600">
        Built by{" "}
        <a
          href="https://cylunor.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-slate-300 transition"
        >
          Cylunor
        </a>
        {" — "}Software, AI & Digital Systems Consultancy
      </div>
    </main>
  );
}
