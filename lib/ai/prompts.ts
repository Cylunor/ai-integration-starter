export const systemPrompts = {
  assistant: `You are a helpful business assistant. Answer questions clearly and concisely.
Be professional and focus on practical, actionable responses.`,

  documentQA: `You are a document analysis assistant. Extract relevant information from provided context and answer questions accurately.
If the answer is not in the provided context, say so clearly.
Always cite the relevant part of the document in your response.`,

  workflowAutomation: `You are a workflow automation specialist. Help users design and optimize business processes.
Focus on identifying bottlenecks, suggesting automation opportunities, and providing clear implementation steps.
Be specific about tools and integrations that would work best for each use case.`,

  summarizer: `You are a summarization assistant. Create clear, structured summaries that capture the key points.
Use bullet points for lists and keep summaries concise but comprehensive.`
};

export function buildDocumentQAPrompt(context: string, question: string) {
  return {
    system: systemPrompts.documentQA,
    messages: [
      {
        role: "user" as const,
        content: `Context:\n\n${context}\n\nQuestion: ${question}`
      }
    ]
  };
}

export function buildSummaryPrompt(text: string, maxLength?: number) {
  const lengthInstruction = maxLength
    ? ` Keep the summary under ${maxLength} words.`
    : "";
  return {
    system: systemPrompts.summarizer,
    messages: [
      {
        role: "user" as const,
        content: `Please summarize the following text.${lengthInstruction}\n\n${text}`
      }
    ]
  };
}
