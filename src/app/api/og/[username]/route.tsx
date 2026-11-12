import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { fetchDevData } from '@/lib/github';
import { enrichDevStats } from '@/lib/engine/archetype';
import React from 'react';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  let stats;
  try {
    const raw = await fetchDevData(username);
    stats = enrichDevStats({ ...raw, username });
  } catch {
    stats = enrichDevStats({ username });
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#090a0f',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '600px',
            height: '520px',
            backgroundColor: '#12131c',
            borderRadius: '24px',
            border: '2px solid rgba(6, 182, 212, 0.4)',
            padding: '28px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '12px',
            }}
          >
            <span style={{ fontSize: '20px', color: '#00f2fe', fontWeight: 'bold' }}>
              @{stats.username}
            </span>
            <span
              style={{
                backgroundColor: 'rgba(217, 70, 239, 0.2)',
                color: '#e879f9',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              {stats.rarity.toUpperCase()}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', alignItems: 'center' }}>
            <img
              src={stats.avatarUrl}
              alt={stats.username}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '16px',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {stats.name}
              </span>
              <span style={{ fontSize: '16px', color: '#00f2fe', marginTop: '4px' }}>
                {stats.archetype}
              </span>
              <span style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
                {stats.archetypeTitle}
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '30px',
              gap: '12px',
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '12px', color: '#f87171' }}>ATK</span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#f87171' }}>
                {stats.rpgStats.atk}
              </span>
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '12px', color: '#60a5fa' }}>DEF</span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#60a5fa' }}>
                {stats.rpgStats.def}
              </span>
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '12px', color: '#c084fc' }}>MANA</span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#c084fc' }}>
                {stats.rpgStats.mana}
              </span>
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '12px', color: '#fbbf24' }}>LUCK</span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#fbbf24' }}>
                {stats.rpgStats.luck}
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: 'auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '16px',
              fontSize: '12px',
              color: '#64748b',
            }}
          >
            <span>{stats.totalCommits} COMMITS · {stats.totalStars} STARS</span>
            <span style={{ color: '#00f2fe', letterSpacing: '2px' }}>GITHOLO.BHARATDN.COM</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
