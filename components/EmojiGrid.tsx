'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import type { TextEmoji } from '@/types'
import { EmojiCard } from './EmojiCard'

interface Props {
  emojis: TextEmoji[]
  favoriteIds: Set<string>
  copiedId: string | null
  emptyLabel: string
  copyHint: string
  scrollResetKey: string
  onCopy: (emoji: TextEmoji) => void
  onToggleFavorite: (id: string) => void
}

const CARD_MIN_W = 160
const CARD_H = 120    // 카드 추정 높이 (gap 포함)
const GAP = 10

export function EmojiGrid({ emojis, favoriteIds, copiedId, emptyLabel, copyHint, scrollResetKey, onCopy, onToggleFavorite }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // 그리드 열 개수 계산
  const getColCount = useCallback(() => {
    const w = scrollRef.current?.clientWidth ?? 800
    return Math.max(1, Math.floor((w + GAP) / (CARD_MIN_W + GAP)))
  }, [])

  // 행으로 변환
  const colCount = typeof window !== 'undefined' ? getColCount() : 4
  const rows: TextEmoji[][] = []
  for (let i = 0; i < emojis.length; i += colCount) {
    rows.push(emojis.slice(i, i + colCount))
  }

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => CARD_H,
    overscan: 5,
  })

  // 탭/카테고리 전환 시 맨 위로
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    virtualizer.scrollToIndex(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollResetKey])

  if (emojis.length === 0) {
    return (
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-text-muted)', gap: '12px',
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="18" cy="18" r="11" stroke="currentColor" strokeWidth="2"/>
          <path d="M27 27l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <p style={{ fontSize: '14px' }}>{emptyLabel}</p>
      </div>
    )
  }

  const totalH = virtualizer.getTotalSize()
  const items = virtualizer.getVirtualItems()

  return (
    <div
      ref={scrollRef}
      style={{ flex: 1, overflowY: 'auto', padding: '16px' }}
    >
      {/* 가상 스크롤 컨테이너 — 전체 높이 확보 */}
      <div style={{ height: `${totalH}px`, position: 'relative' }}>
        {items.map(vRow => {
          const rowEmojis = rows[vRow.index]
          if (!rowEmojis) return null
          return (
            <div
              key={vRow.key}
              data-index={vRow.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                transform: `translateY(${vRow.start}px)`,
                display: 'grid',
                gridTemplateColumns: `repeat(${colCount}, 1fr)`,
                gap: `${GAP}px`,
                paddingBottom: `${GAP}px`,
              }}
            >
              {rowEmojis.map(emoji => (
                <EmojiCard
                  key={emoji.id}
                  emoji={emoji}
                  isFavorite={favoriteIds.has(emoji.id)}
                  isCopied={copiedId === emoji.id}
                  copyHint={copyHint}
                  onCopy={onCopy}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
