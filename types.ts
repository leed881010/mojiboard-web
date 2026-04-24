export type Lang = 'ko' | 'en' | 'ja'
export type EmojiGroupId = 'kaomoji' | 'divider' | 'combo'
export type CategorySectionId = 'emotion' | 'animal' | 'action' | 'character' | 'special' | 'symbol' | 'color' | 'season' | 'other'

export interface TextEmoji {
  id: string
  content: string
  categoryIds: string[]
  group: EmojiGroupId
  searchTokens: string
}

export interface EmojiCategory {
  id: string
  displayName: string
  group: EmojiGroupId
  section: CategorySectionId
  count: number
}

// server-side only — do NOT pass to client components as props
export interface EmojiData {
  categories: EmojiCategory[]
  byCategory: Record<string, TextEmoji[]>
}
