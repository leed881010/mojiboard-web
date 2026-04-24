'use client'

import { useState } from 'react'
import type { EmojiCategory, CategorySectionId, Lang } from '@/types'
import { SECTION_ORDER, getSectionLabel } from '@/lib/i18n'

interface Props {
  lang: Lang
  categories: EmojiCategory[]
  activeCategoryId: string | null
  onSelect: (id: string | null) => void
  allLabel: string
}

export function Sidebar({ lang, categories, activeCategoryId, onSelect, allLabel }: Props) {
  const total = categories.reduce((s, c) => s + c.count, 0)
  const [collapsed, setCollapsed] = useState<Set<CategorySectionId>>(new Set())

  const bySections = SECTION_ORDER.reduce<Record<CategorySectionId, EmojiCategory[]>>(
    (acc, s) => ({ ...acc, [s]: [] }),
    {} as Record<CategorySectionId, EmojiCategory[]>
  )
  for (const cat of categories) {
    bySections[cat.section].push(cat)
  }

  function toggleSection(id: CategorySectionId) {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <nav style={{ padding: '6px 8px 24px' }}>
      <SidebarItem label={allLabel} count={total} isActive={activeCategoryId === null} onClick={() => onSelect(null)} />

      {SECTION_ORDER.map(sectionId => {
        const cats = bySections[sectionId]
        if (!cats || cats.length === 0) return null
        const isCollapsed = collapsed.has(sectionId)

        return (
          <div key={sectionId} style={{ marginTop: '16px' }}>
            {/* 섹션 헤더 — 클릭으로 토글 */}
            <button
              onClick={() => toggleSection(sectionId)}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 10px 5px',
                background: 'none', border: 'none', cursor: 'pointer',
                marginBottom: isCollapsed ? 0 : '2px',
              }}
            >
              <span style={{
                fontSize: '10px', fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}>
                {getSectionLabel(lang, sectionId)}
              </span>
              <svg
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                style={{
                  color: 'var(--color-text-muted)',
                  transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  flexShrink: 0,
                }}
              >
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* 카테고리 목록 */}
            {!isCollapsed && cats.map(cat => (
              <SidebarItem
                key={cat.id}
                label={cat.displayName}
                count={cat.count}
                isActive={activeCategoryId === cat.id}
                onClick={() => onSelect(cat.id)}
              />
            ))}
          </div>
        )
      })}
    </nav>
  )
}

function SidebarItem({ label, count, isActive, onClick }: {
  label: string; count: number; isActive: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '5px 10px', borderRadius: '7px', border: 'none', cursor: 'pointer',
        background: isActive ? 'var(--color-item-active)' : 'transparent',
        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        fontSize: '13px', fontWeight: isActive ? 500 : 400,
        textAlign: 'left', transition: 'background 0.1s, color 0.1s', gap: '8px',
      }}
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.background = 'var(--color-item-hover)'
          e.currentTarget.style.color = 'var(--color-text-primary)'
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--color-text-secondary)'
        }
      }}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
        {label}
      </span>
      <span style={{ flexShrink: 0, fontSize: '11px', fontVariantNumeric: 'tabular-nums', color: 'var(--color-text-muted)' }}>
        {count}
      </span>
    </button>
  )
}
