'use client';

import React, { useState } from 'react';
import type { DevStats } from '@/lib/engine/types';
import { Copy, Check } from 'lucide-react';

interface ViralShareProps {
  stats: DevStats;
  currentUrl?: string;
}

export function ViralShare({ stats, currentUrl }: ViralShareProps) {
  const [copied, setCopied] = useState(false);

  // Construct viral tweet text
  const tweetText = `I just drew my Developer Trading Card on @GitHolo! 🎴✨\n\nClass: ${stats.archetype}\nRarity: ${stats.rarity} (${stats.rarityPercentile})\nPower: ${stats.rpgStats.overall}/99 ⚡\n\nCheck yours:`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : (currentUrl || `https://githolo.bharatdn.com/${stats.username}`);
  
  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`;

  const copyProfileLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Twitter Viral Flex */}
      <a
        href={twitterIntentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-mono text-xs font-semibold rounded-lg shadow-md hover:shadow-cyan-500/20 transition-all cursor-pointer"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>Flex on X</span>
      </a>

      {/* Copy Direct Link */}
      <button
        onClick={copyProfileLink}
        className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs rounded-lg border border-white/10 transition-all cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
