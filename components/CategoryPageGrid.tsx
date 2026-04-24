'use client'

import { useState, useCallback, useRef } from 'react'
import type { TextEmoji } from '@/types'
import { EmojiCard } from './EmojiCard'
import { CopyToast } from './CopyToast'

interface Props {
  emojis: TextEmoji[]
  copiedLabel: string
}

const TOAST_MS = 1500

export function CategoryPageGrid({ emojis, copiedLabel }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = useCallback((emoji: TextEmoji) => {
    navigator.clipboard.writeText(emoji.content).catch(() => {})
    setCopiedId(emoji.id)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopiedId(null), TOAST_MS)
  }, [])

  const handleToggleFavorite = useCallback((id: string) => {
    setFavoriteIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '10px',
      }}>
        {emojis.map(emoji => (
          <EmojiCard
            key={emoji.id}
            emoji={emoji}
            isFavorite={favoriteIds.has(emoji.id)}
            isCopied={copiedId === emoji.id}
            copyHint="Click to copy"
            onCopy={handleCopy}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
      {copiedId && <CopyToast message={copiedLabel} />}
    </>
  )
}
