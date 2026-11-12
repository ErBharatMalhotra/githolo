'use client';

import React, { useState } from 'react';
import { toPng, toSvg } from 'html-to-image';
import { Download, Check, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';

interface DownloadButtonProps {
  cardElementId: string;
  filename?: string;
  username: string;
}

export function DownloadButton({
  cardElementId,
  filename = 'githolo-card',
  username,
}: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  const downloadImage = async (format: 'png' | 'svg' | '4k') => {
    const node = document.getElementById(cardElementId);
    if (!node) {
      console.error(`Element with id ${cardElementId} not found`);
      return;
    }

    try {
      setLoading(true);

      // Higher pixel ratio for 4K ultra-sharp renders
      const pixelRatio = format === '4k' ? 4 : 2;

      let dataUrl: string;

      if (format === 'svg') {
        dataUrl = await toSvg(node, {
          quality: 1,
          cacheBust: true,
        });
      } else {
        dataUrl = await toPng(node, {
          quality: 1,
          pixelRatio,
          cacheBust: true,
          style: {
            transform: 'none', // Reset 3D tilt during export for crisp flat capture
          },
        });
      }

      const link = document.createElement('a');
      link.download = `${username}-githolo-${format === '4k' ? '4k' : 'card'}.${format === 'svg' ? 'svg' : 'png'}`;
      link.href = dataUrl;
      link.click();

      setDownloadedFormat(format);
      setTimeout(() => setDownloadedFormat(null), 3000);
    } catch (err) {
      console.error('Failed to export image:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* 4K PNG Download */}
      <button
        onClick={() => downloadImage('4k')}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 disabled:opacity-50 cursor-pointer"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : downloadedFormat === '4k' ? (
          <Check className="w-4 h-4 text-emerald-300" />
        ) : (
          <Sparkles className="w-4 h-4" />
        )}
        <span>{downloadedFormat === '4k' ? 'Downloaded 4K!' : 'Export 4K PNG'}</span>
      </button>

      {/* Standard PNG */}
      <button
        onClick={() => downloadImage('png')}
        disabled={loading}
        className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs rounded-lg border border-white/10 transition-all duration-200 disabled:opacity-50 cursor-pointer"
      >
        <ImageIcon className="w-3.5 h-3.5" />
        <span>PNG</span>
      </button>

      {/* SVG Export */}
      <button
        onClick={() => downloadImage('svg')}
        disabled={loading}
        className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs rounded-lg border border-white/10 transition-all duration-200 disabled:opacity-50 cursor-pointer"
      >
        <Download className="w-3.5 h-3.5" />
        <span>SVG</span>
      </button>
    </div>
  );
}
