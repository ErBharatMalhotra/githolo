'use client';

import React, { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';

interface ReadmeEmbedProps {
  username: string;
  theme?: string;
}

export function ReadmeEmbed({ username, theme = 'cyberpunk' }: ReadmeEmbedProps) {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'markdown' | 'html'>('markdown');

  const cardImageUrl = `https://githolo.bharatdn.com/api/og/${username}?theme=${theme}`;
  const targetUrl = `https://githolo.bharatdn.com/${username}`;

  const markdownSnippet = `[![${username}'s GitHolo Card](${cardImageUrl})](${targetUrl})`;
  const htmlSnippet = `<a href="${targetUrl}"><img src="${cardImageUrl}" alt="${username}'s GitHolo Card" width="380" /></a>`;

  const snippet = format === 'markdown' ? markdownSnippet : htmlSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-semibold text-zinc-200">
            GitHub README Embed
          </span>
        </div>
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setFormat('markdown')}
            className={`px-2 py-0.5 text-[10px] font-mono rounded cursor-pointer ${
              format === 'markdown' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Markdown
          </button>
          <button
            onClick={() => setFormat('html')}
            className={`px-2 py-0.5 text-[10px] font-mono rounded cursor-pointer ${
              format === 'html' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            HTML
          </button>
        </div>
      </div>

      <div className="relative bg-black/60 rounded-lg p-2.5 font-mono text-[11px] text-zinc-300 border border-white/5 overflow-x-auto break-all">
        <code>{snippet}</code>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs rounded-lg border border-white/10 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
