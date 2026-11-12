'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { DevStats, CardTheme } from '@/lib/engine/types';
import { Sparkles, Star, Shield, Zap, Flame, Trophy, Code2, Cpu } from 'lucide-react';

interface HoloCardProps {
  stats: DevStats;
  theme?: CardTheme;
  className?: string;
  interactive?: boolean;
}

export function HoloCard({
  stats,
  theme = 'cyberpunk',
  className = '',
  interactive = true,
}: HoloCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [glareOpacity, setGlareOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Gyroscope state for mobile
  useEffect(() => {
    if (!interactive) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      // beta: front/back tilt (-180 to 180)
      // gamma: left/right tilt (-90 to 90)
      const rX = Math.max(-20, Math.min(20, (e.beta - 45) / 2));
      const rY = Math.max(-20, Math.min(20, e.gamma / 2));
      setRotateX(-rX);
      setRotateY(rY);
      setGlareX(50 + rY * 2.5);
      setGlareY(50 + rX * 2.5);
      setGlareOpacity(0.6);
    };

    if (window.DeviceOrientationEvent && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      // iOS 13+ permission can be requested on click if desired
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [interactive]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-15deg to 15deg)
    const rX = -((mouseY / height) * 30 - 15);
    const rY = (mouseX / width) * 30 - 15;

    setRotateX(rX);
    setRotateY(rY);
    setGlareX((mouseX / width) * 100);
    setGlareY((mouseY / height) * 100);
    setGlareOpacity(0.85);
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovered(true);
    setGlareOpacity(0.85);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlareX(50);
    setGlareY(50);
    setGlareOpacity(0);
  };

  // Theme styling configurations
  const themeStyles: Record<CardTheme, {
    bg: string;
    border: string;
    accent: string;
    text: string;
    foil: string;
    badgeBg: string;
  }> = {
    cyberpunk: {
      bg: 'bg-gradient-to-br from-gray-950 via-zinc-900 to-black',
      border: 'border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.25)]',
      accent: 'text-cyan-400',
      text: 'text-zinc-100',
      foil: 'linear-gradient(135deg, rgba(255,0,128,0.3), rgba(0,242,254,0.3), rgba(255,230,0,0.3))',
      badgeBg: 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300',
    },
    gold: {
      bg: 'bg-gradient-to-br from-zinc-950 via-stone-900 to-amber-950/40',
      border: 'border-amber-400/60 shadow-[0_0_35px_rgba(251,191,36,0.3)]',
      accent: 'text-amber-400',
      text: 'text-amber-100',
      foil: 'linear-gradient(135deg, rgba(251,191,36,0.4), rgba(245,158,11,0.2), rgba(254,243,199,0.5))',
      badgeBg: 'bg-amber-950/80 border-amber-500/40 text-amber-300',
    },
    obsidian: {
      bg: 'bg-gradient-to-br from-zinc-950 via-black to-zinc-900',
      border: 'border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.2)]',
      accent: 'text-purple-400',
      text: 'text-zinc-200',
      foil: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(59,130,246,0.25), rgba(236,72,153,0.25))',
      badgeBg: 'bg-purple-950/80 border-purple-500/40 text-purple-300',
    },
    tokyo: {
      bg: 'bg-gradient-to-br from-[#1a1b26] via-[#16161e] to-[#09090b]',
      border: 'border-pink-500/50 shadow-[0_0_35px_rgba(236,72,153,0.25)]',
      accent: 'text-pink-400',
      text: 'text-[#c0caf5]',
      foil: 'linear-gradient(135deg, rgba(247,118,142,0.35), rgba(122,162,247,0.35), rgba(187,154,247,0.35))',
      badgeBg: 'bg-pink-950/80 border-pink-500/40 text-pink-300',
    },
    retro90s: {
      bg: 'bg-gradient-to-br from-[#0f380f] via-[#306230] to-[#0f380f]',
      border: 'border-[#8bac0f] shadow-[0_0_25px_rgba(139,172,15,0.4)]',
      accent: 'text-[#9bbc0f]',
      text: 'text-[#8bac0f]',
      foil: 'linear-gradient(135deg, rgba(155,188,15,0.3), rgba(48,98,48,0.4), rgba(139,172,15,0.3))',
      badgeBg: 'bg-[#0f380f] border-[#8bac0f] text-[#9bbc0f]',
    },
  };

  const currentTheme = themeStyles[theme] || themeStyles.cyberpunk;

  const rarityColors: Record<string, string> = {
    Mythic: 'from-fuchsia-500 via-purple-500 to-cyan-400 text-white border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.5)]',
    Legendary: 'from-amber-400 via-yellow-500 to-orange-500 text-black font-semibold border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]',
    Epic: 'from-purple-600 via-indigo-600 to-blue-500 text-white border-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.5)]',
    Rare: 'from-cyan-500 via-blue-500 to-teal-400 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]',
    Standard: 'from-zinc-700 via-zinc-800 to-zinc-900 text-zinc-300 border-zinc-600',
  };

  return (
    <div
      className={`perspective-[1200px] select-none ${className}`}
      style={{ width: '380px', height: '580px', maxWidth: '100%' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full h-full rounded-2xl border-2 ${currentTheme.border} ${currentTheme.bg} p-5 flex flex-col justify-between transition-transform duration-100 ease-out overflow-hidden shadow-2xl`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic Rainbow Foil Layer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20 mix-blend-color-dodge rounded-2xl"
          style={{
            opacity: glareOpacity,
            background: currentTheme.foil,
            backgroundPosition: `${glareX}% ${glareY}%`,
            filter: 'brightness(1.3) contrast(1.4)',
          }}
        />

        {/* Gloss Diagonal Specular Shimmer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30 rounded-2xl"
          style={{
            opacity: glareOpacity * 0.7,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 50%, transparent 80%)`,
          }}
        />

        {/* CARD HEADER */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              {stats.username}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${rarityColors[stats.rarity] || rarityColors.Standard}`}>
              {stats.rarity}
            </span>
            <div className="flex items-center space-x-1 bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
              <span className="text-[10px] font-mono text-zinc-400">LVL</span>
              <span className={`text-xs font-bold font-mono ${currentTheme.accent}`}>
                {Math.floor(stats.rpgStats.overall / 10) + 10}
              </span>
            </div>
          </div>
        </div>

        {/* CARD ART / AVATAR FRAME */}
        <div className="relative z-10 my-2 flex flex-col items-center">
          <div className={`relative w-full h-44 rounded-xl overflow-hidden border border-white/20 bg-black/50 shadow-inner group`}>
            <img
              src={stats.avatarUrl}
              alt={stats.name}
              className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Archetype Badge on Image */}
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
              <div className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
                <div className={`text-[10px] font-mono uppercase ${currentTheme.accent} font-semibold`}>
                  {stats.archetype}
                </div>
                <div className="text-[9px] text-zinc-300 font-sans truncate max-w-[180px]">
                  {stats.archetypeTitle}
                </div>
              </div>
              <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded-md border border-white/15 text-right font-mono">
                <div className="text-[10px] text-zinc-400">POWER</div>
                <div className={`text-xs font-bold ${currentTheme.accent}`}>{stats.rpgStats.overall}</div>
              </div>
            </div>
          </div>
        </div>

        {/* RPG STATS GRID */}
        <div className="relative z-10 grid grid-cols-4 gap-1.5 my-1 text-center font-mono">
          <div className="bg-black/40 border border-white/10 rounded-lg p-1.5">
            <div className="text-[9px] text-zinc-400 flex items-center justify-center gap-0.5">
              <Flame className="w-2.5 h-2.5 text-red-400" /> ATK
            </div>
            <div className="text-xs font-bold text-red-400 mt-0.5">{stats.rpgStats.atk}</div>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-lg p-1.5">
            <div className="text-[9px] text-zinc-400 flex items-center justify-center gap-0.5">
              <Shield className="w-2.5 h-2.5 text-blue-400" /> DEF
            </div>
            <div className="text-xs font-bold text-blue-400 mt-0.5">{stats.rpgStats.def}</div>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-lg p-1.5">
            <div className="text-[9px] text-zinc-400 flex items-center justify-center gap-0.5">
              <Zap className="w-2.5 h-2.5 text-purple-400" /> MANA
            </div>
            <div className="text-xs font-bold text-purple-400 mt-0.5">{stats.rpgStats.mana}</div>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-lg p-1.5">
            <div className="text-[9px] text-zinc-400 flex items-center justify-center gap-0.5">
              <Star className="w-2.5 h-2.5 text-amber-400" /> LUCK
            </div>
            <div className="text-xs font-bold text-amber-400 mt-0.5">{stats.rpgStats.luck}</div>
          </div>
        </div>

        {/* ULTIMATE SKILL */}
        <div className="relative z-10 bg-black/50 border border-white/10 rounded-lg p-2 my-1">
          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 mb-0.5">
            <span className="flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" /> ULTIMATE SKILL
            </span>
            <span className="text-cyan-400">COST: 100% STREAK</span>
          </div>
          <div className="text-[11px] font-mono font-bold tracking-tight text-zinc-100 truncate">
            {stats.ultimateSkill}
          </div>
        </div>

        {/* CARD FOOTER METRICS */}
        <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-zinc-500">COMMITS:</span> <span className="text-zinc-200 font-bold">{stats.totalCommits}</span>
            </div>
            <div>
              <span className="text-zinc-500">STARS:</span> <span className="text-zinc-200 font-bold">{stats.totalStars}</span>
            </div>
          </div>
          <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
            GITHOLO.BHARATDN.COM
          </div>
        </div>
      </div>
    </div>
  );
}
