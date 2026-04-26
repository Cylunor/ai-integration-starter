# AI Integration Starter

Production-ready **Next.js 16** starter kit for integrating **OpenAI** and **Anthropic Claude** into business workflows.

Built by [Cylunor](https://cylunor.com) — Software, AI & Digital Systems Consultancy.

---

## What's included

| Feature | Provider | Route |
|---------|----------|-------|
| Streaming chat | OpenAI GPT-4o | `POST /api/chat` |
| Streaming chat | Anthropic Claude | `POST /api/claude` |
| Document Q&A | Anthropic Claude | `POST /api/document-qa` |
| Text summarization | OpenAI GPT-4o | `POST /api/summarize` |

- TypeScript throughout
- Next.js 16 App Router
- Vercel AI SDK v4 (streaming)
- Tailwind CSS v4
- System prompt support
- Configurable models via env vars

---

## Quick start

```bash
git clone https://github.com/Cylunor/ai-integration-starter
cd ai-integration-starter
cp .env.example .env.local
```

Add your API keys to `.env.local`:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## API Reference

### POST /api/chat
Streaming chat with OpenAI.

```ts
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [{ role: "user", content: "Hello" }],
    model: "gpt-4o" // optional
  })
});
```

### POST /api/claude
Streaming chat with Anthropic Claude.

```ts
const response = await fetch("/api/claude", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [{ role: "user", content: "Hello" }],
    system: "You are a helpful assistant.", // optional
    model: "claude-sonnet-4-6" // optional
  })
});
```

### POST /api/document-qa
Ask questions about a provided document.

```ts
const response = await fetch("/api/document-qa", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    context: "Your document text here...",
    question: "What are the key points?"
  })
});
const { answer } = await response.json();
```

### POST /api/summarize
Summarize text with configurable length.

```ts
const response = await fetch("/api/summarize", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    text: "Long text to summarize...",
    maxLength: 150 // words, optional
  })
});
const { summary } = await response.json();
```

---

## Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | Yes | — | OpenAI API key |
| `ANTHROPIC_API_KEY` | Yes | — | Anthropic API key |
| `OPENAI_MODEL` | No | `gpt-4o` | Default OpenAI model |
| `ANTHROPIC_MODEL` | No | `claude-sonnet-4-6` | Default Anthropic model |

---

## Project structure

```
app/
├── api/
│   ├── chat/route.ts          # OpenAI streaming
│   ├── claude/route.ts        # Anthropic streaming
│   ├── document-qa/route.ts   # Document Q&A
│   └── summarize/route.ts     # Text summarization
├── examples/
│   ├── chat/page.tsx          # Chat UI
│   ├── claude/page.tsx        # Claude UI
│   ├── document-qa/page.tsx   # Document Q&A UI
│   └── summarize/page.tsx     # Summarizer UI
└── page.tsx                   # Landing page

lib/
└── ai/
    ├── openai.ts              # OpenAI client + helpers
    ├── anthropic.ts           # Anthropic client + helpers
    └── prompts.ts             # Reusable system prompts
```

---

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Cylunor/ai-integration-starter)

Set `OPENAI_API_KEY` and `ANTHROPIC_API_KEY` in Vercel environment variables.

---

## License

MIT

---

Built by [Cylunor](https://cylunor.com) — a software engineering, AI integration, and digital systems consultancy based in Dubai. We help businesses integrate AI into real workflows.
