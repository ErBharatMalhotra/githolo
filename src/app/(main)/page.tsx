'use client';

import React, { useState, useEffect } from 'react';
import { HoloCard } from '@/components/card/HoloCard';
import { ThemeSelector } from '@/components/card/ThemeSelector';
import { DownloadButton } from '@/components/export/DownloadButton';
import { ViralShare } from '@/components/share/ViralShare';
import { ReadmeEmbed } from '@/components/embed/ReadmeEmbed';
import type { DevStats, CardTheme } from '@/lib/engine/types';
import { Loader2, Search, AlertCircle, X, Sparkles, Flame, Shield, Zap, Star, Swords } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState<DevStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<CardTheme>('cyberpunk');
  const [cardId] = useState('holo-card');

  const fetchData = async (e: React.FormEvent) => {
    e.preventDefault();
    const u = username.trim();
    if (!u) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/github/${u}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to fetch developer stats');
      }
      const data = await res.json();
      setStats(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const u = params.get('u');
    if (u && u !== username) {
      setUsername(u);
      fetchData(new Event('submit') as unknown as React.FormEvent);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 bg-grid-pattern relative">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[140px]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/80 border border-white/10 mb-4 backdrop-blur-sm">
            <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold">BETA</span>
            <span className="text-[10px] font-mono text-zinc-400">v0.1.0</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black tracking-tight mb-3">
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent">
              GitHolo
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-mono">
            Turn any GitHub profile into a 3D Holographic Developer Trading Card.
            <br className="hidden sm:inline" /> Interactive · 4K Export · Viral Share · Zero Watermarks
          </p>
        </header>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <form onSubmit={fetchData} className="w-full max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username (e.g. torvalds, gaearon)..."
                className="w-full px-5 py-3.5 pl-12 bg-zinc-900/80 border border-white/10 rounded-xl text-zinc-100 placeholder-zinc-500 font-mono text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all backdrop-blur-sm"
                autoComplete="off"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <button
                type="submit"
                disabled={loading || !username.trim()}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span className="flex items-center gap-1.5">
                    Generate <Sparkles className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            </div>
            {error && (
              <div className="mt-3 flex items-center gap-2 px-4 py-2.5 bg-red-950/40 border border-red-500/20 rounded-xl text-red-300 text-xs font-mono">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{error}</span>
                <button type="button" onClick={() => setError(null)} className="text-zinc-500 hover:text-zinc-300">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Card Stage & Developer Dossier */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: 3D CARD + THEMES + EXPORTS */}
            <div className="md:col-span-5 flex flex-col items-center">
              {/* 3D HoloCard */}
              <div className="w-full flex justify-center py-2">
                <div id={cardId} className="w-[360px] max-w-full">
                  <HoloCard stats={stats} theme={theme} interactive />
                </div>
              </div>

              {/* Theme Picker */}
              <div className="w-full max-w-[360px] mt-6">
                <ThemeSelector currentTheme={theme} onSelectTheme={setTheme} />
              </div>

              {/* Actions & Sharing Tray */}
              <div className="w-full max-w-[360px] mt-6 space-y-4">
                <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                    Export & Share
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <DownloadButton cardElementId={cardId} username={stats.username} />
                    <ViralShare stats={stats} currentUrl={`https://githolo.bharatdn.com/${stats.username}`} />
                  </div>
                </div>

                {/* README Embed */}
                <ReadmeEmbed username={stats.username} theme={theme} />
              </div>
            </div>

            {/* RIGHT COLUMN: ARCHETYPE, STATS, TELEMETRY */}
            <div className="md:col-span-7 space-y-6">
              {/* Developer Dossier Header */}
              <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={stats.avatarUrl}
                    alt={stats.name}
                    className="w-16 h-16 rounded-xl border border-white/15 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-mono font-bold text-white truncate">
                        {stats.name}
                      </h2>
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

              {/* Archetype Profile */}
              <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    <Sparkles className="w-4 h-4" /> ARCHETYPE PROFILE
                  </div>
                  <div className="text-xs font-mono text-cyan-400 font-bold">
                    POWER LEVEL: {stats.rpgStats.overall}/99
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

              {/* Combat Attributes (RPG Stats) */}
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

                {/* Language Arsenal */}
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

              {/* Challenge in Battle CTA */}
              <div className="bg-gradient-to-r from-red-950/30 via-zinc-900/60 to-amber-950/30 border border-red-500/20 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-mono text-sm font-bold text-red-300">CHALLENGE ANOTHER DEV</h3>
                  <p className="text-xs text-zinc-400 mt-0.5 font-mono">Head-to-head trading card combat arena</p>
                </div>
                <Link
                  href={`/battle?p1=${stats.username}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-400 hover:to-amber-400 text-white font-mono text-xs font-bold rounded-lg shadow-lg hover:shadow-red-500/20 transition-all cursor-pointer"
                >
                  <Swords className="w-3.5 h-3.5" /> BATTLE
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-zinc-600 text-xs font-mono">
          <p>Built with <span className="text-red-500">♥</span> by <a href="https://bharatdn.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">ErBharatMalhotra</a></p>
          <p className="mt-1">Open Source · MIT License · No Watermarks · <a href="https://github.com/ErBharatMalhotra/GitHolo" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Source Code</a></p>
        </footer>
      </main>
    </div>
  );
}
