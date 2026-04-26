'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Analytics } from './AmplitudeProvider'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { GroupTabs } from './GroupTabs'
import { EmojiGrid } from './EmojiGrid'
import { CopyToast } from './CopyToast'
import type { Lang, EmojiGroupId, TextEmoji, EmojiCategory } from '@/types'

interface I18n {
  groupKaomoji: string
  groupDivider: string
  groupCombo: string
  searchPlaceholder: string
  categoryAll: string
  emptyResult: string
  copied: string
  copyHint: string
  downloadApp: string
  favoritesOnly: string
}

interface Props {
  lang: Lang
  categories: EmojiCategory[]
  i18n: I18n
  children?: React.ReactNode
}

// ── data constants (mirrors lib/data.ts) ──────────────────────────────────────

const DIVIDER_CATS = new Set([
  'divider', 'div_heart', 'div_star', 'div_flower', 'div_moon', 'div_christmas', 'div_template',
  'valentine', 'newyear',
])
const COMBO_CATS = new Set([
  'combo', 'emojico',
  'cmb_heart', 'cmb_star', 'cmb_flower', 'cmb_moon', 'cmb_christmas', 'cmb_template',
  'cmb_pink', 'cmb_red', 'cmb_yellow', 'cmb_white', 'cmb_blue', 'cmb_green', 'cmb_purple', 'cmb_dark',
])

function emojiGroup(catId: string): EmojiGroupId {
  if (DIVIDER_CATS.has(catId)) return 'divider'
  if (COMBO_CATS.has(catId)) return 'combo'
  return 'kaomoji'
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  happy:            ['행복', '기쁨', 'happy', 'smile', '嬉しい', '幸せ'],
  angry:            ['화남', 'angry', 'mad', '怒り'],
  thumbsup:         ['최고', '좋아', 'good', 'thumbs', 'いいね'],
  worry:            ['걱정', 'worry', 'anxious', '心配'],
  thinking:         ['생각', '고민', 'think', '考える'],
  upfeeling:        ['신남', 'excited', 'ウキウキ'],
  studying:         ['공부', 'study', '勉強'],
  abnormal:         ['비정상', 'weird', '異常'],
  ask:              ['부탁', '애원', 'please', 'お願い'],
  wink:             ['윙크', 'wink', 'ウィンク'],
  hello:            ['안녕', '인사', 'hello', 'hi', 'bye', 'こんにちは'],
  donot:            ['하지마', '금지', 'stop', 'no', 'やめて'],
  salut:            ['충성', '경례', 'salute', '敬礼'],
  scary:            ['무서움', 'scary', 'fear', '怖い'],
  fighting:         ['싸움', 'fight', 'ファイト'],
  crazy:            ['미침', 'crazy', '狂う'],
  confused:         ['혼란', 'confused', '混乱'],
  sad:              ['슬픔', '울음', 'sad', 'cry', '悲しい'],
  dance:            ['춤', 'dance', 'ダンス'],
  love:             ['사랑', 'love', 'heart', '愛', 'ハート'],
  cloud:            ['구름', 'cloud', '雲'],
  bear:             ['곰', 'bear', 'クマ', '熊'],
  cat:              ['고양이', 'cat', 'ねこ', '猫'],
  puppy:            ['강아지', '개', 'dog', '犬'],
  pig:              ['돼지', 'pig', 'ブタ'],
  rabbit:           ['토끼', 'rabbit', 'うさぎ'],
  duck:             ['오리', 'duck', 'アヒル'],
  bird:             ['새', 'bird', '鳥'],
  fish:             ['물고기', '해양', 'fish', '魚', '海'],
  snowman:          ['눈사람', 'snowman', '雪だるま'],
  old:              ['할아버지', '할머니', 'old', 'おじいさん'],
  blurry:           ['블러', 'blurry', 'ぼやけ'],
  music:            ['음악', '노래', 'music', '音楽'],
  sleeping:         ['잠', 'sleep', 'zzz', '眠る'],
  running:          ['달리기', 'run', '走る'],
  hiding:           ['숨기', 'hide', '隠れる'],
  magic:            ['마법', 'magic', '魔法'],
  eating:           ['먹기', 'eat', 'food', '食べる'],
  combination:      ['조합', 'combination', '組み合わせ'],
  weapon:           ['무기', 'weapon', '武器'],
  chiikawa:         ['먼작귀', 'chiikawa', 'ちいかわ'],
  returningstudent: ['복학', 'returning student'],
  pick:             ['pick', '추천', 'おすすめ'],
  friend:           ['friend', 'together', '友達'],
  valentine:        ['valentine', 'バレンタイン'],
  newyear:          ['new year', '새해', '新年'],
  etc:              ['기타', 'other', 'その他'],
  star:             ['star', '별', '星', 'スター'],
  card:             ['card', '카드', 'トランプ'],
  shy:              ['shy', '수줍', 'blush', '恥ずかしい'],
  divider:          ['구분선', 'divider', 'separator', '区切り'],
  combo:            ['꾸밈', '장식', 'deco', 'aesthetic', 'デコ'],
  emojico:          ['이모지 콤보', 'emoji combo', '絵文字コンボ'],
}

function buildSearchTokens(content: string, categoryIds: string[]): string {
  const parts = [content.toLowerCase()]
  for (const id of categoryIds) {
    const kws = CATEGORY_KEYWORDS[id]
    if (kws) parts.push(...kws)
  }
  return parts.join(' ')
}

function processRaw(raw: Array<{ id: string; content: string; categories: string[] }>, group: EmojiGroupId): GroupData {
  const emojis: TextEmoji[] = []
  const byCategory: Record<string, TextEmoji[]> = {}

  for (const item of raw) {
    const emoji: TextEmoji = {
      id: item.id,
      content: item.content,
      categoryIds: item.categories,
      group,
      searchTokens: buildSearchTokens(item.content, item.categories),
    }
    emojis.push(emoji)
    for (const catId of item.categories) {
      ;(byCategory[catId] ??= []).push(emoji)
    }
  }

  return { emojis, byCategory }
}

// ── local storage ─────────────────────────────────────────────────────────────

const FAVORITES_KEY = 'mojiboard-favorites'
const COPY_TOAST_MS = 1500

function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch { return new Set() }
}

// ── component ─────────────────────────────────────────────────────────────────

type GroupData = {
  emojis: TextEmoji[]
  byCategory: Record<string, TextEmoji[]>
}

type DataState = {
  groups: Partial<Record<EmojiGroupId, GroupData>>
  loading: Set<EmojiGroupId>
  errors: Set<EmojiGroupId>
}

export function EmojiApp({ lang, categories, i18n, children }: Props) {
  const [data, setData] = useState<DataState>({ groups: {}, loading: new Set(), errors: new Set() })
  const [activeGroup, setActiveGroup] = useState<EmojiGroupId>('kaomoji')
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [searchText, setSearchText] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchGroup = useCallback((group: EmojiGroupId) => {
    setData(prev => {
      if (prev.groups[group] || prev.loading.has(group)) return prev
      const loading = new Set(prev.loading)
      loading.add(group)
      return { ...prev, loading }
    })
    fetch(`/kaomoji-${group}.json`)
      .then(r => r.json())
      .then(raw => {
        const processed = processRaw(raw, group)
        setData(prev => {
          const loading = new Set(prev.loading)
          loading.delete(group)
          return { ...prev, loading, groups: { ...prev.groups, [group]: processed } }
        })
      })
      .catch(() => {
        setData(prev => {
          const loading = new Set(prev.loading)
          const errors = new Set(prev.errors)
          loading.delete(group)
          errors.add(group)
          return { ...prev, loading, errors }
        })
      })
  }, [])

  useEffect(() => {
    setFavoriteIds(loadFavorites())
    fetchGroup('kaomoji')
  }, [fetchGroup])

  // prefetch other groups in background after initial load
  useEffect(() => {
    const t = setTimeout(() => {
      fetchGroup('divider')
      fetchGroup('combo')
    }, 1500)
    return () => clearTimeout(t)
  }, [fetchGroup])


  const groupLabels: Record<EmojiGroupId, string> = {
    kaomoji: i18n.groupKaomoji,
    divider: i18n.groupDivider,
    combo: i18n.groupCombo,
  }

  // iOS와 동일하게 primary 카테고리(divider/combo)는 사이드바에서 숨김
  const PRIMARY_CAT: Partial<Record<EmojiGroupId, string>> = { divider: 'divider', combo: 'combo' }

  const categoriesInGroup = useMemo(
    () => categories.filter(c => c.group === activeGroup && c.id !== PRIMARY_CAT[activeGroup]),
    [categories, activeGroup]
  )

  const counts: Record<EmojiGroupId, number> = useMemo(() => ({
    kaomoji: data.groups.kaomoji?.emojis.length ?? 0,
    divider: data.groups.divider?.emojis.length ?? 0,
    combo:   data.groups.combo?.emojis.length ?? 0,
  }), [data.groups])

  const visibleEmojis = useMemo((): TextEmoji[] => {
    const groupData = data.groups[activeGroup]
    if (!groupData) return []

    let pool: TextEmoji[]

    if (searchText.trim().length > 0) {
      const q = searchText.toLowerCase()
      // search within current group only (all groups load in background)
      pool = groupData.emojis.filter(e => e.searchTokens.includes(q))
    } else if (activeCategoryId) {
      pool = groupData.byCategory[activeCategoryId] ?? []
    } else {
      pool = groupData.emojis
    }

    if (showFavoritesOnly) pool = pool.filter(e => favoriteIds.has(e.id))
    return pool
  }, [data.groups, searchText, activeCategoryId, activeGroup, showFavoritesOnly, favoriteIds])

  // 검색 로깅 (1초 debounce)
  useEffect(() => {
    if (!searchText.trim()) return
    const t = setTimeout(() => {
      Analytics.searchUsed(searchText, visibleEmojis.length)
    }, 1000)
    return () => clearTimeout(t)
  }, [searchText, visibleEmojis.length])

  const handleGroupChange = useCallback((group: EmojiGroupId) => {
    fetchGroup(group)
    setActiveGroup(group)
    setActiveCategoryId(null)
    setSearchText('')
    setShowFavoritesOnly(false)
    Analytics.groupChanged(group)
  }, [fetchGroup])

  const handleCategorySelect = useCallback((id: string | null) => {
    setActiveCategoryId(id)
    setShowFavoritesOnly(false)
    setSidebarOpen(false)
    Analytics.filterApplied(id ?? 'all')
  }, [])

  const handleCopy = useCallback((emoji: TextEmoji) => {
    navigator.clipboard.writeText(emoji.content).catch(() => {})
    setCopiedId(emoji.id)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setCopiedId(null), COPY_TOAST_MS)
    Analytics.emojiCopied(emoji.content, emoji.categoryIds[0] ?? 'unknown', activeGroup)
  }, [activeGroup])

  const handleToggleFavorite = useCallback((id: string) => {
    setFavoriteIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      try { localStorage.setItem(FAVORITES_KEY, JSON.stringify([...next])) } catch {}
      return next
    })
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden', background: 'var(--color-bg)' }}>
      <Header
        lang={lang}
        downloadLabel={i18n.downloadApp}
        favoritesLabel={i18n.favoritesOnly}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavorites={() => setShowFavoritesOnly(v => !v)}
        searchText={searchText}
        onSearchChange={setSearchText}
        searchPlaceholder={i18n.searchPlaceholder}
        onMenuOpen={() => setSidebarOpen(true)}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Desktop sidebar */}
        <aside className="sidebar-desktop" style={{
          width: '220px', flexShrink: 0,
          borderRight: '1px solid var(--color-border)',
          overflowY: 'auto', padding: '12px 0',
        }}>
          <Sidebar
            lang={lang}
            categories={categoriesInGroup}
            activeCategoryId={activeCategoryId}
            onSelect={handleCategorySelect}
            allLabel={i18n.categoryAll}
          />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}>
            <div
              style={{ flex: 1, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setSidebarOpen(false)}
            />
            <div style={{
              width: '240px', background: 'var(--color-surface)', height: '100%',
              overflowY: 'auto', padding: '16px 0', borderLeft: '1px solid var(--color-border)',
            }}>
              <Sidebar
                lang={lang}
                categories={categoriesInGroup}
                activeCategoryId={activeCategoryId}
                onSelect={handleCategorySelect}
                allLabel={i18n.categoryAll}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <GroupTabs
            activeGroup={activeGroup}
            labels={groupLabels}
            counts={counts}
            onChange={handleGroupChange}
          />

          {data.loading.has(activeGroup) && !data.groups[activeGroup] ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                width: '24px', height: '24px',
                border: '2px solid var(--color-border2)',
                borderTopColor: 'var(--color-text-secondary)',
                borderRadius: '50%',
                animation: 'spin 0.7s linear infinite',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : data.errors.has(activeGroup) ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '14px' }}>
              로드 실패 — 새로고침 해주세요
            </div>
          ) : (
            <EmojiGrid
              emojis={visibleEmojis}
              favoriteIds={favoriteIds}
              copiedId={copiedId}
              emptyLabel={i18n.emptyResult}
              copyHint={i18n.copyHint}
              scrollResetKey={`${activeGroup}-${activeCategoryId ?? 'all'}`}
              onCopy={handleCopy}
              onToggleFavorite={handleToggleFavorite}
            >
              {children}
            </EmojiGrid>
          )}
        </div>
      </div>

      {copiedId && <CopyToast message={i18n.copied} />}

      <style>{`
        @media (max-width: 640px) {
          .sidebar-desktop { display: none !important; }
        }
      `}</style>
    </div>
  )
}
