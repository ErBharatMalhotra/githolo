'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { HoloCard } from '@/components/card/HoloCard';
import type { DevStats } from '@/lib/engine/types';
import { Swords, Trophy, Loader2, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function BattleClient() {
  const searchParams = useSearchParams();
  const [p1Username, setP1Username] = useState(searchParams.get('p1') || 'torvalds');
  const [p2Username, setP2Username] = useState(searchParams.get('p2') || 'gaearon');

  const [p1Stats, setP1Stats] = useState<DevStats | null>(null);
  const [p2Stats, setP2Stats] = useState<DevStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFighters = async (user1: string, user2: string) => {
    if (!user1 || !user2) return;
    setLoading(true);
    setError(null);

    try {
      const [res1, res2] = await Promise.all([
        fetch(`/api/github/${user1}`),
        fetch(`/api/github/${user2}`),
      ]);

      if (!res1.ok || !res2.ok) {
        throw new Error('Failed to fetch one or both developer profiles.');
      }

      const data1 = await res1.json();
      const data2 = await res2.json();

      setP1Stats(data1);
      setP2Stats(data2);
    } catch (err: any) {
      setError(err.message || 'Battle arena matchmaking error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFighters(p1Username, p2Username);
  }, []);

  const handleBattleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFighters(p1Username, p2Username);
  };

  // Determine Winner
  const p1Power = p1Stats?.rpgStats.overall || 0;
  const p2Power = p2Stats?.rpgStats.overall || 0;
  const winner = p1Power > p2Power ? 1 : p1Power < p2Power ? 2 : 0;

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col items-center py-10 px-4 relative overflow-hidden">
      {/* Background Neon Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <Link
          href="/"
          className="text-xs font-mono text-zinc-500 hover:text-cyan-400 mb-4 inline-flex items-center gap-1 transition-colors"
        >
          ← Back to GitHolo Card Studio
        </Link>
        <div className="flex items-center justify-center gap-3">
          <Swords className="w-8 h-8 text-red-500 animate-pulse" />
          <h1 className="text-3xl sm:text-5xl font-mono font-black tracking-wider bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
            DEVELOPER CLASH
          </h1>
          <Swords className="w-8 h-8 text-cyan-500 animate-pulse" />
        </div>
        <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-2">
          Head-to-head 3D holographic card battle based on code velocity & commit hygiene.
        </p>
      </div>

      {/* Matchmaking Inputs */}
      <form
        onSubmit={handleBattleSubmit}
        className="relative z-10 flex flex-wrap items-center justify-center gap-2 mb-10 w-full max-w-xl"
      >
        <input
          type="text"
          value={p1Username}
          onChange={(e) => setP1Username(e.target.value)}
          placeholder="Player 1"
          className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 font-mono text-sm text-center text-red-400 focus:outline-none focus:border-red-500 w-36"
        />
        <span className="font-mono text-zinc-500 font-bold">VS</span>
        <input
          type="text"
          value={p2Username}
          onChange={(e) => setP2Username(e.target.value)}
          placeholder="Player 2"
          className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 font-mono text-sm text-center text-cyan-400 focus:outline-none focus:border-cyan-500 w-36"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-mono text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Swords className="w-4 h-4" />}
          <span>Fight!</span>
        </button>
      </form>

      {error && (
        <div className="relative z-10 flex items-center gap-2 px-4 py-2 bg-red-950/40 border border-red-500/30 rounded-xl text-red-300 font-mono text-xs mb-8">
          <ShieldAlert className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Fighter Cards Arena */}
      {p1Stats && p2Stats && !loading && (
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-5xl">
          {/* PLAYER 1 */}
          <div className="flex flex-col items-center">
            {winner === 1 && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold rounded-full mb-3 animate-bounce">
                <Trophy className="w-3.5 h-3.5" />
                <span>VICTORIOUS!</span>
              </div>
            )}
            <HoloCard stats={p1Stats} theme="cyberpunk" interactive />
            <div className="mt-4 text-center font-mono">
              <span className="text-xs text-zinc-400">OVERALL POWER: </span>
              <span className="text-sm font-bold text-red-400">{p1Stats.rpgStats.overall}/99</span>
            </div>
          </div>

          {/* VS Center Indicator */}
          <div className="flex flex-col items-center gap-2 font-mono">
            <div className="text-3xl font-black text-zinc-600">VS</div>
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 w-48 text-center text-xs">
              <div className="text-zinc-500 mb-2">STAT COMPARISON</div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-red-400 font-bold">{p1Stats.rpgStats.atk}</span>
                  <span className="text-zinc-500">ATK</span>
                  <span className="text-cyan-400 font-bold">{p2Stats.rpgStats.atk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-400 font-bold">{p1Stats.rpgStats.def}</span>
                  <span className="text-zinc-500">DEF</span>
                  <span className="text-cyan-400 font-bold">{p2Stats.rpgStats.def}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-400 font-bold">{p1Stats.rpgStats.mana}</span>
                  <span className="text-zinc-500">MANA</span>
                  <span className="text-cyan-400 font-bold">{p2Stats.rpgStats.mana}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-400 font-bold">{p1Stats.rpgStats.luck}</span>
                  <span className="text-zinc-500">LUCK</span>
                  <span className="text-cyan-400 font-bold">{p2Stats.rpgStats.luck}</span>
                </div>
              </div>
            </div>
          </div>

          {/* PLAYER 2 */}
          <div className="flex flex-col items-center">
            {winner === 2 && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold rounded-full mb-3 animate-bounce">
                <Trophy className="w-3.5 h-3.5" />
                <span>VICTORIOUS!</span>
              </div>
            )}
            <HoloCard stats={p2Stats} theme="tokyo" interactive />
            <div className="mt-4 text-center font-mono">
              <span className="text-xs text-zinc-400">OVERALL POWER: </span>
              <span className="text-sm font-bold text-cyan-400">{p2Stats.rpgStats.overall}/99</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
