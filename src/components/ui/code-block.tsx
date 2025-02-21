"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  language = "typescript",
  title,
  className,
}: Readonly<CodeBlockProps>) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split("\n");

  return (
    <div
      className={cn(
        "rounded-2xl border backdrop-blur-sm",
        "bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10",
        "dark:from-pink-500/5 dark:via-purple-500/5 dark:to-blue-500/5",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b bg-gradient-to-r from-pink-500/80 via-purple-500/80 to-blue-500/80 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-white" />
          {title ? (
            <span className="text-sm font-medium text-white">{title}</span>
          ) : (
            <span className="text-sm font-medium text-white">{language}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center justify-center rounded-md w-8 h-8 transition-colors hover:bg-white/10"
          title="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-white" />
          ) : (
            <Copy className="h-4 w-4 text-white" />
          )}
          <span className="sr-only">Copy code</span>
        </button>
      </div>

      <div className="relative">
        <div className="overflow-x-auto">
          <pre className="p-4">
            <code className="grid gap-0.5 font-mono text-sm">
              {lines.map((line, i) => (
                <div key={i} className="flex group">
                  <span className="inline-flex w-8 select-none opacity-50 text-pink-500/70 dark:text-pink-400/50 group-hover:text-purple-500/70 transition-colors">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-slate-900 dark:text-slate-100">
                    {line}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>

        <div className="absolute inset-0 pointer-events-none  border-t  border-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20" />
      </div>
    </div>
  );
}
