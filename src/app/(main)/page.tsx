'use client';

import React, { useState, useEffect } from 'react';
import { HoloCard } from '@/components/card/HoloCard';
import { ThemeSelector } from '@/components/card/ThemeSelector';
import { DownloadButton } from '@/components/export/DownloadButton';
import { ViralShare } from '@/components/share/ViralShare';
import { ReadmeEmbed } from '@/components/embed/ReadmeEmbed';
import { enrichDevStats } from '@/lib/engine/archetype';
import type { DevStats, CardTheme } from '@/lib/engine/types';
import { Loader2, Search, AlertCircle, X, Sparkles } from 'lucide-react';

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
        throw new Error(err.error || 'Failed to fetch');
      }
      const data = await res.json();
      setStats(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch if username in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const u = params.get('u');
    if (u && u !== username) {
      setUsername(u);
      fetchData(new Event('submit') as unknown as React.FormEvent);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 text-zinc-100">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-1/2 -left-1/2 w-screen h-screen bg-gradient-to-tr from-cyan-500/5 via-transparent to-fuchsia-500/5 blur-[200px]" />
        <div className="absolute -bottom-1/2 -right-1/2 w-screen h-screen bg-gradient-to-bl from-amber-500/5 via-transparent to-purple-500/5 blur-[200px]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/10 mb-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400">BETA</span>
            <span className="text-[10px] font-mono text-zinc-400">v0.1.0</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black tracking-tight mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent">
              GitHolo
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto font-mono">
            Turn any GitHub profile into a 3D Holographic Developer Trading Card.
            <br /> Interactive · 4K Export · Viral Share · Zero Watermarks
          </p>
        </header>

        {/* Search Form */}
        <div className="flex justify-center mb-8">
          <form onSubmit={fetchData} className="w-full max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username..."
                className="w-full px-6 py-4 pl-14 bg-black/50 border border-white/10 rounded-xl text-zinc-100 placeholder-zinc-500 font-mono text-base focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                autoComplete="off"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <button
                type="submit"
                disabled={loading || !username.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-xs font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </button>
            </div>
            {error && (
              <div className="mt-3 flex items-center gap-2 px-4 py-2 bg-red-950/30 border border-red-500/20 rounded-lg text-red-300 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
                <button onClick={() => setError(null)} className="ml-auto text-zinc-500 hover:text-zinc-300">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Card Display */}
        {stats && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Card Column */}
            <div className="flex-1 lg:w-[380px] flex flex-col items-center gap-6">
              <div id={cardId} className="w-full max-w-xs">
                <HoloCard stats={stats} theme={theme} interactive />
              </div>

              {/* Theme Selector */}
              <div className="w-full max-w-xs">
                <ThemeSelector currentTheme={theme} onSelectTheme={setTheme} />
              </div>

              {/* Action Buttons */}
              <div className="w-full max-w-xs flex flex-col gap-3">
                <DownloadButton cardElementId={cardId} username={stats.username} />
                <ViralShare stats={stats} currentUrl={window.location.href} />
                <ReadmeEmbed username={stats.username} theme={theme} />
              </div>

              {/* Shareable Link */}
              <div className="w-full max-w-xs bg-black/40 border border-white/10 rounded-xl p-3">
                <div className="text-xs font-mono text-zinc-400 mb-1">SHAREABLE LINK</div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="flex-1 bg-black/60 border border-white/5 rounded-lg px-3 py-2 text-[11px] font-mono text-zinc-300 focus:outline-none"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    title="Copy link"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Detail Sidebar */}
            <aside className="flex-1 lg:w-[320px] space-y-4 w-full">
              <div className="bg-black/40 border border-white/10 rounded-xl p-5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> CORE METRICS
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <MetricBadge label="TOTAL COMMITS" value={stats.totalCommits} icon="git-commit" />
                    <MetricBadge label="PULL REQUESTS" value={stats.totalPRs} icon="git-pull-request" />
                    <MetricBadge label="STARS EARNED" value={stats.totalStars} icon="star" />
                    <MetricBadge label="FOLLOWERS" value={stats.followers} icon="users" />
                  </div>
                  <div className="border-t border-white/5 pt-3">
                    <div className="text-xs font-mono text-zinc-400 mb-2 flex items-center justify-between">
                      <span>LANGUAGE DIVERSITY</span>
                      <span className="text-cyan-400 font-bold">{stats.topLanguages.length} ECOSYSTEMS</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {stats.topLanguages.slice(0, 6).map((lang, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-[10px] font-mono rounded bg-black/60 border border-white/10 flex items-center gap-1"
                          style={{ borderColor: lang.color + '80' }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: lang.color }}
                          />
                          {lang.name} <span className="text-zinc-500">({lang.percentage}%)</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Archetype Detail */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> ARCHETYPE PROFILE
                </h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-amber-950/30 to-orange-950/30 border border-amber-500/30 rounded-lg p-3">
                    <div className="text-xs font-mono text-amber-300 mb-1">{stats.archetype}</div>
                    <div className="text-sm font-semibold text-amber-100">{stats.archetypeTitle}</div>
                    <div className="text-[11px] text-zinc-300 mt-1">{stats.archetypeDescription}</div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">RARITY TIER</span>
                    <span className="text-amber-400 font-bold font-mono">{stats.rarity} ({stats.rarityPercentile})</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">POWER LEVEL</span>
                    <span className="text-cyan-400 font-bold font-mono">{stats.rpgStats.overall}/99</span>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <div className="text-xs font-mono text-zinc-400 mb-1">ULTIMATE SKILL</div>
                    <div className="text-sm font-bold text-zinc-100 bg-black/50 px-2 py-1 rounded font-mono">
                      {stats.ultimateSkill}
                    </div>
                  </div>
                </div>
              </div>

              {/* RPG Stat Breakdown */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> RPG STAT BREAKDOWN
                </h3>
                <div className="space-y-2">
                  {[
                    { key: 'atk', label: 'ATTACK (VELOCITY)', desc: 'Commit frequency & PR throughput', color: 'text-red-400', icon: '⚔️' },
                    { key: 'def', label: 'DEFENSE (STABILITY)', desc: 'PR merge rate & issue hygiene', color: 'text-blue-400', icon: '🛡️' },
                    { key: 'mana', label: 'MANA (DIVERSITY)', desc: 'Language ecosystem breadth', color: 'text-purple-400', icon: '⚡' },
                    { key: 'luck', label: 'LUCK (AURA)', desc: 'Stars, forks, followers pull', color: 'text-amber-400', icon: '✨' },
                  ].map((s) => (
                    <div key={s.key} className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="flex items-center gap-1.5">
                          <span className="text-[12px]">{s.icon}</span>
                          <span className="font-semibold">{s.label}</span>
                        </span>
                        <span className={`${s.color} font-bold`}>{stats.rpgStats[s.key as keyof typeof stats.rpgStats]}/99</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(stats.rpgStats[s.key as keyof typeof stats.rpgStats] / 99) * 100}%`,
                            background: `linear-gradient(90deg, ${s.color.replace('text-', '')})`,
                          }}
                        />
                      </div>
                      <div className="text-[9px] text-zinc-500">{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-zinc-600 text-sm font-mono">
          <p>Built with <span className="text-red-500">♥</span> by <a href="https://bharatdn.com" className="text-cyan-400 hover:underline">ErBharatMalhotra</a></p>
          <p className="mt-1">Open Source · MIT License · No Watermarks · <a href="https://github.com/ErBharatMalhotra/GitHolo" className="text-cyan-400 hover:underline">Source Code</a></p>
        </footer>
      </main>
    </div>
  );
}

// Simple metric badge component
function MetricBadge({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-lg p-3">
      <div className="text-[9px] font-mono text-zinc-500 mb-0.5">{label}</div>
      <div className="text-xl font-bold font-mono text-cyan-400">{value.toLocaleString()}</div>
    </div>
  );
}