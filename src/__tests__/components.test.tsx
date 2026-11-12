import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ThemeSelector } from '@/components/card/ThemeSelector';
import { ReadmeEmbed } from '@/components/embed/ReadmeEmbed';
import type { CardTheme } from '@/lib/engine/types';

describe('ThemeSelector Component', () => {
  it('renders all 5 theme options', () => {
    let selectedTheme: CardTheme = 'cyberpunk';
    render(
      <ThemeSelector
        currentTheme={selectedTheme}
        onSelectTheme={(t) => {
          selectedTheme = t;
        }}
      />
    );

    expect(screen.getByText('Cyberpunk Neon')).toBeInTheDocument();
    expect(screen.getByText('Gold Foil')).toBeInTheDocument();
    expect(screen.getByText('Obsidian Matte')).toBeInTheDocument();
    expect(screen.getByText('Tokyo Dark')).toBeInTheDocument();
    expect(screen.getByText('Retro 90s Gameboy')).toBeInTheDocument();
  });
});

describe('ReadmeEmbed Component', () => {
  it('renders markdown snippet containing user and domain link', () => {
    render(<ReadmeEmbed username="ErBharatMalhotra" theme="cyberpunk" />);

    expect(screen.getByText('GitHub README Embed')).toBeInTheDocument();
    expect(screen.getByText(/githolo\.bharatdn\.com\/api\/og\/ErBharatMalhotra/)).toBeInTheDocument();
  });

  it('switches to HTML format when toggle clicked', () => {
    render(<ReadmeEmbed username="ErBharatMalhotra" theme="gold" />);

    const htmlBtn = screen.getByText('HTML');
    fireEvent.click(htmlBtn);

    expect(screen.getByText(/<a href="https:\/\/githolo\.bharatdn\.com\/ErBharatMalhotra">/)).toBeInTheDocument();
  });
});
