'use client';

import React, { useState } from 'react';
import { HoloCard } from '@/components/card/HoloCard';
import { ThemeSelector } from '@/components/card/ThemeSelector';
import { DownloadButton } from '@/components/export/DownloadButton';
import { ViralShare } from '@/components/share/ViralShare';
import { ReadmeEmbed } from '@/components/embed/ReadmeEmbed';
import type { DevStats, CardTheme } from '@/lib/engine/types';
import { ArrowLeft, Swords, Sparkles, Flame, Shield, Zap, Star } from 'lucide-react';
import Link from 'next/link';

interface ProfileClientProps {
  stats: DevStats;
}

export default function ProfileClient({ stats }: ProfileClientProps) {
  const [theme, setTheme] = useState<CardTheme>('cyberpunk');

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 bg-grid-pattern relative">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Generator
          </Link>
          <Link
            href={`/battle?p1=${stats.username}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-400 hover:to-amber-400 text-white font-mono text-xs font-bold rounded-lg shadow-lg hover:shadow-red-500/20 transition-all cursor-pointer"
          >
            <Swords className="w-3.5 h-3.5" /> Battle Arena
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: 3D CARD SHOWCASE & EXPORT ACTIONS */}
          <div className="md:col-span-5 flex flex-col items-center">
            {/* Card Holder */}
            <div className="w-full flex justify-center py-2">
              <div id="holo-card-profile" className="w-[360px] max-w-full">
                <HoloCard stats={stats} theme={theme} interactive />
              </div>
            </div>

            {/* Theme Picker */}
            <div className="w-full max-w-[360px] mt-6">
              <ThemeSelector currentTheme={theme} onSelectTheme={setTheme} />
            </div>

            {/* Export & Share Action Tray */}
            <div className="w-full max-w-[360px] mt-6 space-y-4">
              <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-4 space-y-3">
                <div className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                  Export & Share
                </div>
                <div className="flex flex-col gap-2.5">
                  <DownloadButton cardElementId="holo-card-profile" username={stats.username} />
                  <ViralShare stats={stats} />
                </div>
              </div>

              {/* README Embed Widget */}
              <ReadmeEmbed username={stats.username} theme={theme} />
            </div>
          </div>

          {/* RIGHT COLUMN: TELEMETRY, ARCHETYPE PROFILE, STAT BREAKDOWN */}
          <div className="md:col-span-7 space-y-6">
            {/* Developer Identity Card */}
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <img
                  src={stats.avatarUrl}
                  alt={stats.name}
                  className="w-16 h-16 rounded-xl border border-white/15 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-mono font-bold text-white truncate">
                      {stats.name}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {stats.rarity}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    @{stats.username} · {stats.archetypeTitle}
                  </p>
                </div>
              </div>
              {stats.bio && (
                <p className="text-sm text-zinc-300 mt-4 leading-relaxed font-sans">
                  {stats.bio}
                </p>
              )}
            </div>

            {/* Archetype & Ultimate Skill Dossier */}
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  <Sparkles className="w-4 h-4" /> ARCHETYPE DOSSIER
                </div>
                <div className="text-xs font-mono text-cyan-400 font-bold">
                  OVERALL POWER: {stats.rpgStats.overall}/99
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-950/20 via-zinc-900/50 to-transparent border border-amber-500/20 rounded-xl p-4 mb-4">
                <div className="text-sm font-mono font-bold text-amber-300">
                  {stats.archetype} — {stats.archetypeTitle}
                </div>
                <div className="text-xs text-zinc-300 mt-1 leading-relaxed">
                  {stats.archetypeDescription}
                </div>
              </div>

              {/* Ultimate Skill */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-3.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                  <span>ULTIMATE SKILL</span>
                  <span className="text-cyan-400">ACTIVATION: 100% STREAK</span>
                </div>
                <div className="text-sm font-mono font-bold text-white">
                  {stats.ultimateSkill}
                </div>
              </div>
            </div>

            {/* RPG Combat Stat Breakdown */}
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold mb-4">
                COMBAT ATTRIBUTES
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'atk', label: 'ATTACK (VELOCITY)', value: stats.rpgStats.atk, icon: Flame, color: 'text-red-400', bar: 'bg-red-500', desc: 'Commit frequency & PR volume' },
                  { key: 'def', label: 'DEFENSE (STABILITY)', value: stats.rpgStats.def, icon: Shield, color: 'text-blue-400', bar: 'bg-blue-500', desc: 'PR merge efficiency & issue health' },
                  { key: 'mana', label: 'MANA (DIVERSITY)', value: stats.rpgStats.mana, icon: Zap, color: 'text-purple-400', bar: 'bg-purple-500', desc: 'Polyglot language breadth' },
                  { key: 'luck', label: 'LUCK (MAGNETISM)', value: stats.rpgStats.luck, icon: Star, color: 'text-amber-400', bar: 'bg-amber-500', desc: 'Stars, forks, follower aura' },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.key} className="bg-black/40 border border-white/5 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="flex items-center gap-1.5 font-semibold text-zinc-300">
                          <Icon className={`w-3.5 h-3.5 ${s.color}`} /> {s.label}
                        </span>
                        <span className={`${s.color} font-bold`}>{s.value}/99</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${s.bar}`}
                          style={{ width: `${(s.value / 99) * 100}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono">{s.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Core Telemetry Metrics */}
            <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4">
                GITHUB TELEMETRY
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                {[
                  { label: 'TOTAL COMMITS', value: stats.totalCommits },
                  { label: 'STARS EARNED', value: stats.totalStars },
                  { label: 'PULL REQUESTS', value: stats.totalPRs },
                  { label: 'FOLLOWERS', value: stats.followers },
                  { label: 'REPOSITORIES', value: stats.publicRepos },
                  { label: 'STREAK DAYS', value: `${stats.streakDays}d` },
                ].map((m, i) => (
                  <div key={i} className="bg-black/40 border border-white/5 rounded-xl p-3">
                    <div className="text-[10px] text-zinc-500 uppercase">{m.label}</div>
                    <div className="text-lg font-bold text-cyan-400 mt-0.5">
                      {typeof m.value === 'number' ? m.value.toLocaleString() : m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Language Ecosystems */}
              {stats.topLanguages.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="text-[11px] font-mono text-zinc-400 mb-2.5">
                    LANGUAGE ARSENAL ({stats.topLanguages.length} ECOSYSTEMS)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stats.topLanguages.map((lang, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-black/50 border border-white/10 flex items-center gap-1.5"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        {lang.name} <span className="text-zinc-500 font-normal">({lang.percentage}%)</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
