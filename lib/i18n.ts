import type { Lang, CategorySectionId } from '@/types'

export const SUPPORTED_LANGS: Lang[] = ['ko', 'en', 'ja']
export const DEFAULT_LANG: Lang = 'ko'

export function isValidLang(lang: string): lang is Lang {
  return SUPPORTED_LANGS.includes(lang as Lang)
}

type TranslationKey =
  | 'siteTitle' | 'siteDescription'
  | 'groupKaomoji' | 'groupDivider' | 'groupCombo'
  | 'searchPlaceholder' | 'categoryAll' | 'emptyResult'
  | 'copied' | 'copyHint' | 'downloadApp' | 'favoritesOnly'
  | 'itemCount' | 'ogDescription'
  | 'sectionEmotion' | 'sectionAnimal' | 'sectionAction' | 'sectionCharacter'
  | 'sectionSpecial' | 'sectionSymbol' | 'sectionColor' | 'sectionSeason' | 'sectionOther'

type Translations = Record<TranslationKey, string>

const translations: Record<Lang, Translations> = {
  ko: {
    siteTitle: 'Moji Board — 카오모지 & 이모티콘',
    siteDescription: '10,000개 이상의 카오모지와 텍스트 이모티콘. 클릭 한 번으로 복사하세요.',
    groupKaomoji: '카오모지',
    groupDivider: '구분선',
    groupCombo: '콤보',
    searchPlaceholder: '검색... (예: 고양이, happy, 猫)',
    categoryAll: '전체',
    emptyResult: '검색 결과가 없어요',
    copied: '복사됐어요!',
    copyHint: '클릭하면 복사',
    downloadApp: '앱 다운로드',
    favoritesOnly: '즐겨찾기',
    itemCount: '{n}개',
    ogDescription: '{category} 카오모지 모음 — 클릭으로 바로 복사',
    sectionEmotion: '감정/표현',
    sectionAnimal: '동물',
    sectionAction: '활동',
    sectionCharacter: '캐릭터',
    sectionSpecial: '특별',
    sectionSymbol: '심볼',
    sectionColor: '색상',
    sectionSeason: '시즌',
    sectionOther: '기타',
  },
  en: {
    siteTitle: 'Moji Board — Kaomoji & Emoticons',
    siteDescription: '10,000+ kaomoji and text emoticons. Click to copy instantly.',
    groupKaomoji: 'Kaomoji',
    groupDivider: 'Dividers',
    groupCombo: 'Combos',
    searchPlaceholder: 'Search... (e.g. cat, happy, 猫)',
    categoryAll: 'All',
    emptyResult: 'No results found',
    copied: 'Copied!',
    copyHint: 'Click to copy',
    downloadApp: 'Get the App',
    favoritesOnly: 'Favorites',
    itemCount: '{n} items',
    ogDescription: '{category} kaomoji collection — click to copy instantly',
    sectionEmotion: 'Emotions',
    sectionAnimal: 'Animals',
    sectionAction: 'Actions',
    sectionCharacter: 'Characters',
    sectionSpecial: 'Special',
    sectionSymbol: 'Symbols',
    sectionColor: 'Colors',
    sectionSeason: 'Seasons',
    sectionOther: 'Other',
  },
  ja: {
    siteTitle: 'Moji Board — 顔文字 & 絵文字',
    siteDescription: '10,000以上の顔文字とテキスト絵文字。ワンクリックでコピー。',
    groupKaomoji: '顔文字',
    groupDivider: '区切り線',
    groupCombo: 'コンボ',
    searchPlaceholder: '検索... (例: ねこ, happy, 猫)',
    categoryAll: 'すべて',
    emptyResult: '見つかりませんでした',
    copied: 'コピーしました！',
    copyHint: 'クリックでコピー',
    downloadApp: 'アプリをDL',
    favoritesOnly: 'お気に入り',
    itemCount: '{n}件',
    ogDescription: '{category}の顔文字コレクション — クリックでコピー',
    sectionEmotion: '感情/表現',
    sectionAnimal: '動物',
    sectionAction: '行動',
    sectionCharacter: 'キャラ',
    sectionSpecial: 'スペシャル',
    sectionSymbol: 'シンボル',
    sectionColor: 'カラー',
    sectionSeason: 'シーズン',
    sectionOther: 'その他',
  },
}

export function t(lang: Lang, key: TranslationKey, vars?: Record<string, string | number>): string {
  let text = translations[lang][key] ?? translations.en[key] ?? key
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(`{${k}}`, String(v))
    }
  }
  return text
}

export function getLangLabel(lang: Lang): string {
  return { ko: '한국어', en: 'English', ja: '日本語' }[lang]
}

// 섹션 표시 순서
export const SECTION_ORDER: CategorySectionId[] = [
  'emotion', 'animal', 'action', 'character', 'special', 'symbol', 'color', 'season', 'other',
]

export function getSectionLabel(lang: Lang, section: CategorySectionId): string {
  const key = `section${section.charAt(0).toUpperCase() + section.slice(1)}` as TranslationKey
  return t(lang, key)
}
