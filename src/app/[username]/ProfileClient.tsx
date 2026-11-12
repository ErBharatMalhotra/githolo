'use client';

import React, { useState } from 'react';
import { HoloCard } from '@/components/card/HoloCard';
import { ThemeSelector } from '@/components/card/ThemeSelector';
import { DownloadButton } from '@/components/export/DownloadButton';
import { ViralShare } from '@/components/share/ViralShare';
import { ReadmeEmbed } from '@/components/embed/ReadmeEmbed';
import type { DevStats, CardTheme } from '@/lib/engine/types';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProfileClientProps {
  stats: DevStats;
}

export default function ProfileClient({ stats }: ProfileClientProps) {
  const [theme, setTheme] = useState<CardTheme>('cyberpunk');

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-cyan-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to GitHolo
        </Link>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Card */}
          <div className="flex-shrink-0 flex flex-col items-center gap-5">
            <div id="holo-card-profile">
              <HoloCard stats={stats} theme={theme} interactive />
            </div>
            <ThemeSelector currentTheme={theme} onSelectTheme={setTheme} />
            <DownloadButton cardElementId="holo-card-profile" username={stats.username} />
            <ViralShare stats={stats} />
            <ReadmeEmbed username={stats.username} theme={theme} />
          </div>

          {/* Profile Detail Panel */}
          <div className="flex-1 space-y-5">
            <div className="flex items-center gap-4">
              <img
                src={stats.avatarUrl}
                alt={stats.name}
                className="w-16 h-16 rounded-xl border border-white/20"
              />
              <div>
                <h1 className="text-2xl font-mono font-bold text-white">{stats.name}</h1>
                <p className="text-sm font-mono text-zinc-400">@{stats.username} · {stats.archetypeTitle}</p>
              </div>
            </div>

            <p className="text-sm text-zinc-300 max-w-xl">{stats.bio}</p>

            {/* Rarity & Power */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> ARCHETYPE PROFILE
              </h3>
              <div className="bg-gradient-to-r from-amber-950/30 to-orange-950/30 border border-amber-500/30 rounded-lg p-3 mb-3">
                <div className="text-xs font-mono text-amber-300 mb-1">{stats.archetype}</div>
                <div className="text-sm font-semibold text-amber-100">{stats.archetypeTitle}</div>
                <div className="text-[11px] text-zinc-300 mt-1">{stats.archetypeDescription}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm font-mono">
                <div className="bg-black/30 rounded-lg p-2">
                  <div className="text-zinc-500 text-xs">RARITY</div>
                  <div className="text-amber-400 font-bold">{stats.rarity}</div>
                </div>
                <div className="bg-black/30 rounded-lg p-2">
                  <div className="text-zinc-500 text-xs">POWER LEVEL</div>
                  <div className="text-cyan-400 font-bold">{stats.rpgStats.overall}/99</div>
                </div>
                <div className="bg-black/30 rounded-lg p-2 col-span-2">
                  <div className="text-zinc-500 text-xs mb-1">ULTIMATE SKILL</div>
                  <div className="text-xs font-mono text-zinc-100">{stats.ultimateSkill}</div>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-4">CORE METRICS</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center font-mono">
                {[
                  { label: 'COMMITS', value: stats.totalCommits },
                  { label: 'STARS', value: stats.totalStars },
                  { label: 'PRs', value: stats.totalPRs },
                  { label: 'FOLLOWERS', value: stats.followers },
                  { label: 'REPOS', value: stats.publicRepos },
                  { label: 'STREAK', value: `${stats.streakDays}d` },
                ].map((m, i) => (
                  <div key={i} className="bg-black/40 border border-white/5 rounded-lg p-3">
                    <div className="text-[9px] text-zinc-500 uppercase mb-0.5">{m.label}</div>
                    <div className="text-lg font-bold text-cyan-400">{typeof m.value === 'number' ? m.value.toLocaleString() : m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-4">LANGUAGE ARSENAL</h3>
              <div className="space-y-2">
                {stats.topLanguages.slice(0, 6).map((lang, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                        {lang.name}
                      </span>
                      <span className="text-zinc-400">{lang.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Battle Link */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-center justify-between">
              <div className="font-mono">
                <div className="text-xs text-zinc-500">CHALLENGE ANOTHER DEV</div>
                <div className="text-sm text-zinc-200">Head-to-head card battle</div>
              </div>
              <Link
                href={`/battle?p1=${stats.username}`}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold rounded-lg transition-all"
              >
                ⚔️ BATTLE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
