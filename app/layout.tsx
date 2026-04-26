import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Integration Starter",
  description: "Production-ready Next.js starter kit for OpenAI and Anthropic Claude integration"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
