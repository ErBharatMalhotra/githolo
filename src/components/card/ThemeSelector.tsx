'use client';

import React, { useState } from 'react';
import type { CardTheme } from '@/lib/engine/types';
import { Palette, Sparkles } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: CardTheme;
  onSelectTheme: (theme: CardTheme) => void;
}

export function ThemeSelector({ currentTheme, onSelectTheme }: ThemeSelectorProps) {
  const themes: Array<{ id: CardTheme; name: string; color: string; desc: string }> = [
    { id: 'cyberpunk', name: 'Cyberpunk', color: 'from-cyan-400 to-fuchsia-500', desc: 'Electric blue and neon magenta foil' },
    { id: 'gold', name: 'Gold Foil', color: 'from-amber-300 to-yellow-600', desc: 'Prestige 24K metallic sheen' },
    { id: 'obsidian', name: 'Obsidian', color: 'from-zinc-700 to-purple-900', desc: 'Stealth dark finish with violet accents' },
    { id: 'tokyo', name: 'Tokyo Dark', color: 'from-pink-500 to-indigo-600', desc: 'Akihabara midnight aesthetic' },
    { id: 'retro90s', name: 'Gameboy 90s', color: 'from-[#8bac0f] to-[#0f380f]', desc: 'Vintage 8-bit dot matrix green' },
    { id: 'matrix', name: 'Matrix Code', color: 'from-[#00ff66] to-[#032b0c]', desc: 'Digital rain terminal phosphor glow' },
    { id: 'vaporwave', name: 'Vaporwave', color: 'from-fuchsia-400 to-cyan-300', desc: '80s synthwave neon magenta sunset' },
    { id: 'nordic', name: 'Nordic Frost', color: 'from-cyan-300 to-blue-600', desc: 'Sub-zero arctic glacial shimmer' },
    { id: 'cosmic', name: 'Cosmic Holo', color: 'from-purple-400 to-fuchsia-600', desc: 'Deep nebula starlight refraction' },
    { id: 'secretrare', name: 'Secret Rare', color: 'from-yellow-300 via-pink-400 to-cyan-300', desc: 'Prismatic platinum etched luxury' },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
        <Palette className="w-3.5 h-3.5 text-cyan-400" />
        <span>SELECT COLLECTIBLE THEME</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {themes.map((t) => {
          const isActive = currentTheme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTheme(t.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'border-white/10 bg-zinc-900/60 hover:border-white/20 hover:bg-zinc-800/60'
              }`}
            >
              <span className={`w-3 h-3 rounded-full flex-shrink-0 bg-gradient-to-br ${t.color} shadow-sm ring-1 ring-white/20`} />
              <span className={`text-xs font-mono font-medium truncate ${
                isActive ? 'text-cyan-300 font-bold' : 'text-zinc-200'
              }`}>
                {t.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
