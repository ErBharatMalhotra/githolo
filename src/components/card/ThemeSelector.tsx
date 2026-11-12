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
    { id: 'cyberpunk', name: 'Cyberpunk Neon', color: 'from-cyan-400 to-fuchsia-500', desc: 'Electric blue and neon magenta foil' },
    { id: 'gold', name: 'Gold Foil', color: 'from-amber-300 to-yellow-600', desc: 'Prestige 24K metallic sheen' },
    { id: 'obsidian', name: 'Obsidian Matte', color: 'from-zinc-700 to-purple-900', desc: 'Stealth dark finish with violet accents' },
    { id: 'tokyo', name: 'Tokyo Dark', color: 'from-pink-500 to-indigo-600', desc: 'Akihabara midnight aesthetic' },
    { id: 'retro90s', name: 'Retro 90s Gameboy', color: 'from-[#8bac0f] to-[#0f380f]', desc: 'Vintage 8-bit dot matrix green' },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
        <Palette className="w-3.5 h-3.5 text-cyan-400" />
        <span>SELECT COLLECTIBLE THEME</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {themes.map((t) => {
          const isActive = currentTheme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTheme(t.id)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'border-white/10 bg-zinc-900/60 hover:border-white/20 hover:bg-zinc-800/50'
              }`}
            >
              <div className={`w-full h-2 rounded-full bg-gradient-to-r ${t.color} mb-1.5`} />
              <span className={`text-[11px] font-mono font-medium truncate w-full text-center ${
                isActive ? 'text-cyan-300 font-bold' : 'text-zinc-300'
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
