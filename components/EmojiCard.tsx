'use client'

import { useState } from 'react'
import type { TextEmoji } from '@/types'

interface Props {
  emoji: TextEmoji
  isFavorite: boolean
  isCopied: boolean
  copyHint: string
  onCopy: (emoji: TextEmoji) => void
  onToggleFavorite: (id: string) => void
}

function estimateFontSize(content: string): number {
  const len = content.length
  if (len <= 10) return 18
  if (len <= 16) return 15
  if (len <= 24) return 12
  if (len <= 34) return 10
  return 8.5
}

export function EmojiCard({ emoji, isFavorite, isCopied, copyHint, onCopy, onToggleFavorite }: Props) {
  const [hovered, setHovered] = useState(false)
  const fontSize = estimateFontSize(emoji.content)

  return (
    <div
      style={{
        position: 'relative', borderRadius: '12px',
        border: isCopied
          ? '1px solid var(--color-border2)'
          : hovered ? '1px solid var(--color-border2)' : '1px solid var(--color-border)',
        background: isCopied
          ? 'var(--color-item-active)'
          : hovered ? 'var(--color-surface2)' : 'var(--color-surface)',
        transition: 'border-color 0.15s, background 0.15s, transform 0.15s, box-shadow 0.15s',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
        cursor: 'pointer',
        contentVisibility: 'auto',
        containIntrinsicSize: '0 100px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={() => onCopy(emoji)}
        title={copyHint}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          width: '100%', minHeight: '100px', padding: '20px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <span className="emoji-text" style={{
          fontSize: `${fontSize}px`, lineHeight: 1.5,
          color: 'var(--color-text-primary)',
          whiteSpace: 'nowrap', display: 'block', maxWidth: '100%', overflow: 'hidden',
        }}>
          {emoji.content}
        </span>
      </button>

      <button
        onClick={e => { e.stopPropagation(); onToggleFavorite(emoji.id) }}
        style={{
          position: 'absolute', top: '6px', right: '6px',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '4px', borderRadius: '6px',
          color: isFavorite ? '#e05555' : 'var(--color-text-muted)',
          opacity: hovered || isFavorite ? 1 : 0,
          transition: 'opacity 0.15s, color 0.15s',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill={isFavorite ? 'currentColor' : 'none'}>
          <path d="M6.5 11.5C6.5 11.5 1 8.2 1 4.5a2.8 2.8 0 015.5-.8A2.8 2.8 0 0112 4.5C12 8.2 6.5 11.5 6.5 11.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}
