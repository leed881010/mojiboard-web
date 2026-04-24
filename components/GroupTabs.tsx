'use client'

import type { EmojiGroupId } from '@/types'

interface Props {
  activeGroup: EmojiGroupId
  labels: Record<EmojiGroupId, string>
  counts: Record<EmojiGroupId, number>
  onChange: (group: EmojiGroupId) => void
}

const GROUPS: EmojiGroupId[] = ['kaomoji', 'divider', 'combo']

export function GroupTabs({ activeGroup, labels, counts, onChange }: Props) {
  return (
    <div style={{
      display: 'flex',
      borderBottom: '1px solid var(--color-border)',
      padding: '0 16px',
      background: 'var(--color-surface)',
      gap: '4px', flexShrink: 0,
    }}>
      {GROUPS.map(group => {
        const isActive = group === activeGroup
        return (
          <button
            key={group}
            onClick={() => onChange(group)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '12px 16px', fontSize: '13px',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              borderBottom: isActive ? '2px solid var(--color-text-primary)' : '2px solid transparent',
              marginBottom: '-1px', transition: 'color 0.15s',
              whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            {labels[group]}
            <span style={{
              background: isActive ? 'var(--color-item-active)' : 'var(--color-surface3)',
              color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              borderRadius: '20px', padding: '1px 7px',
              fontSize: '11px', fontWeight: 500,
            }}>
              {counts[group].toLocaleString()}
            </span>
          </button>
        )
      })}
    </div>
  )
}
