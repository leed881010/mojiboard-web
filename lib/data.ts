import fs from 'fs'
import path from 'path'
import { cache } from 'react'
import type { EmojiData, EmojiGroupId, CategorySectionId, TextEmoji, EmojiCategory } from '@/types'

// ── 그룹 분류 ──────────────────────────────────────────────────────────────────
const DIVIDER_CATS = new Set([
  'divider', 'div_heart', 'div_star', 'div_flower', 'div_moon', 'div_christmas', 'div_template',
  'valentine', 'newyear',
])
const COMBO_CATS = new Set([
  'combo', 'emojico',
  'cmb_heart', 'cmb_star', 'cmb_flower', 'cmb_moon', 'cmb_christmas', 'cmb_template',
  'cmb_pink', 'cmb_red', 'cmb_yellow', 'cmb_white', 'cmb_blue', 'cmb_green', 'cmb_purple', 'cmb_dark',
])

function getGroup(categoryId: string): EmojiGroupId {
  if (DIVIDER_CATS.has(categoryId)) return 'divider'
  if (COMBO_CATS.has(categoryId)) return 'combo'
  return 'kaomoji'
}

// ── 섹션 분류 (사이드바 그룹 헤더) ───────────────────────────────────────────
const SECTION_MAP: Record<string, CategorySectionId> = {
  // 감정/표현
  happy: 'emotion', angry: 'emotion', thumbsup: 'emotion',
  worry: 'emotion', thinking: 'emotion', upfeeling: 'emotion',
  abnormal: 'emotion', ask: 'emotion', wink: 'emotion',
  hello: 'emotion', donot: 'emotion', salut: 'emotion',
  scary: 'emotion', fighting: 'emotion', crazy: 'emotion',
  confused: 'emotion', sad: 'emotion', love: 'emotion',
  shy: 'emotion', dance: 'emotion', blurry: 'emotion',
  // 동물
  bear: 'animal', cat: 'animal', puppy: 'animal',
  pig: 'animal', rabbit: 'animal', duck: 'animal',
  bird: 'animal', fish: 'animal',
  // 활동
  studying: 'action', sleeping: 'action', running: 'action',
  hiding: 'action', eating: 'action', music: 'action', magic: 'action',
  // 캐릭터
  old: 'character', snowman: 'character', cloud: 'character',
  chiikawa: 'character', returningstudent: 'character',
  weapon: 'character', combination: 'character',
  // 특별
  pick: 'special', card: 'special', star: 'special', friend: 'special',
  // 구분선 심볼 (divider 기본 카테고리는 primary라 사이드바에 숨김 — section 정의 불필요)
  div_heart: 'symbol', div_star: 'symbol', div_flower: 'symbol', div_moon: 'symbol',
  div_template: 'other',
  // 꾸밈 심볼
  emojico: 'other',
  cmb_heart: 'symbol', cmb_star: 'symbol', cmb_flower: 'symbol', cmb_moon: 'symbol',
  cmb_template: 'other',
  // 색상 (콤보)
  cmb_pink: 'color', cmb_red: 'color', cmb_yellow: 'color', cmb_white: 'color',
  cmb_blue: 'color', cmb_green: 'color', cmb_purple: 'color', cmb_dark: 'color',
  // 시즌
  valentine: 'season', newyear: 'season',
  div_christmas: 'season', cmb_christmas: 'season',
  // 기타
  etc: 'other',
}

function getSection(categoryId: string): CategorySectionId {
  return SECTION_MAP[categoryId] ?? 'other'
}

// ── 카테고리 표시 이름 ──────────────────────────────────────────────────────────
export const CATEGORY_NAMES: Record<string, Record<string, string>> = {
  happy:             { ko: '행복해요',       en: 'Happy',           ja: '嬉しい' },
  angry:             { ko: '화났어요',       en: 'Angry',           ja: '怒り' },
  thumbsup:          { ko: '최고에요',       en: 'Thumbs Up',       ja: 'いいね' },
  worry:             { ko: '걱정돼요',       en: 'Worried',         ja: '心配' },
  thinking:          { ko: '생각 중',        en: 'Thinking',        ja: '考え中' },
  upfeeling:         { ko: '신나요',         en: 'Excited',         ja: 'ウキウキ' },
  studying:          { ko: '공부해요',       en: 'Studying',        ja: '勉強中' },
  abnormal:          { ko: '비정상',         en: 'Weird',           ja: '変なの' },
  ask:               { ko: '부탁해요',       en: 'Pleading',        ja: 'お願い' },
  wink:              { ko: '윙크',           en: 'Wink',            ja: 'ウィンク' },
  hello:             { ko: '인사해요',       en: 'Hello',           ja: 'あいさつ' },
  donot:             { ko: '하지마세요',     en: "Don't!",          ja: 'やめて' },
  salut:             { ko: '충성!',          en: 'Salute',          ja: '敬礼' },
  scary:             { ko: '무서워요',       en: 'Scared',          ja: 'こわい' },
  fighting:          { ko: '싸울래요',       en: 'Fighting',        ja: 'ファイト' },
  crazy:             { ko: '미쳤어요',       en: 'Crazy',           ja: '狂気' },
  confused:          { ko: '혼란스러워요',   en: 'Confused',        ja: '混乱' },
  sad:               { ko: '슬퍼요',         en: 'Sad',             ja: '悲しい' },
  dance:             { ko: '춤춰요',         en: 'Dancing',         ja: 'ダンス' },
  love:              { ko: '사랑해요',       en: 'Love',            ja: '愛してる' },
  cloud:             { ko: '구름',           en: 'Cloud',           ja: '雲' },
  bear:              { ko: '곰돌이',         en: 'Bear',            ja: 'クマ' },
  cat:               { ko: '고양이',         en: 'Cat',             ja: 'ねこ' },
  puppy:             { ko: '강아지',         en: 'Puppy',           ja: '犬' },
  pig:               { ko: '돼지',           en: 'Pig',             ja: 'ブタ' },
  rabbit:            { ko: '토끼',           en: 'Rabbit',          ja: 'うさぎ' },
  duck:              { ko: '오리',           en: 'Duck',            ja: 'アヒル' },
  bird:              { ko: '새',             en: 'Bird',            ja: '鳥' },
  fish:              { ko: '해양생물',       en: 'Sea Life',        ja: '海の生き物' },
  snowman:           { ko: '눈사람',         en: 'Snowman',         ja: '雪だるま' },
  old:               { ko: '나이 많아요',    en: 'Elderly',         ja: 'お年寄り' },
  blurry:            { ko: '블러리',         en: 'Blurry',          ja: 'ぼんやり' },
  music:             { ko: '음악',           en: 'Music',           ja: '音楽' },
  sleeping:          { ko: '잠자요',         en: 'Sleeping',        ja: 'ねむい' },
  running:           { ko: '뛰어요',         en: 'Running',         ja: '走る' },
  hiding:            { ko: '숨어요',         en: 'Hiding',          ja: 'かくれてる' },
  magic:             { ko: '마법',           en: 'Magic',           ja: '魔法' },
  eating:            { ko: '먹는 중',        en: 'Eating',          ja: '食事中' },
  combination:       { ko: '조합',           en: 'Mix',             ja: '組み合わせ' },
  weapon:            { ko: '무기',           en: 'Weapon',          ja: '武器' },
  chiikawa:          { ko: '먼작귀',         en: 'Chiikawa',        ja: 'ちいかわ' },
  returningstudent:  { ko: '복학생',         en: 'Ret. Student',    ja: '復学生' },
  pick:              { ko: 'PICK',           en: 'PICK',            ja: 'PICK' },
  friend:            { ko: '친구',           en: 'Friend',          ja: '友達' },
  valentine:         { ko: '발렌타인',       en: 'Valentine',       ja: 'バレンタイン' },
  newyear:           { ko: '새해',           en: 'New Year',        ja: '新年' },
  etc:               { ko: '기타',           en: 'Other',           ja: 'その他' },
  star:              { ko: '스타',           en: 'Star',            ja: 'スター' },
  card:              { ko: '카드',           en: 'Card',            ja: 'カード' },
  shy:               { ko: '수줍어요',       en: 'Shy',             ja: '恥ずかしい' },
  // 구분선 카테고리
  divider:           { ko: '구분선',         en: 'Divider',         ja: '区切り線' },
  div_heart:         { ko: '하트',           en: 'Heart',           ja: 'ハート' },
  div_star:          { ko: '별',             en: 'Star',            ja: '星' },
  div_flower:        { ko: '꽃',             en: 'Flower',          ja: '花' },
  div_moon:          { ko: '달',             en: 'Moon',            ja: '月' },
  div_christmas:     { ko: '크리스마스',     en: 'Christmas',       ja: 'クリスマス' },
  div_template:      { ko: '텍스트 서식',    en: 'Template',        ja: 'テンプレート' },
  // 꾸밈 카테고리
  combo:             { ko: '꾸밈',           en: 'Aesthetic',       ja: 'デコ' },
  emojico:           { ko: '이모지 콤보',    en: 'Emoji Combo',     ja: '絵文字コンボ' },
  cmb_heart:         { ko: '하트',           en: 'Heart',           ja: 'ハート' },
  cmb_star:          { ko: '별',             en: 'Star',            ja: '星' },
  cmb_flower:        { ko: '꽃',             en: 'Flower',          ja: '花' },
  cmb_moon:          { ko: '달',             en: 'Moon',            ja: '月' },
  cmb_christmas:     { ko: '크리스마스',     en: 'Christmas',       ja: 'クリスマス' },
  cmb_template:      { ko: '텍스트 서식',    en: 'Template',        ja: 'テンプレート' },
  cmb_pink:          { ko: '핑크',           en: 'Pink',            ja: 'ピンク' },
  cmb_red:           { ko: '레드',           en: 'Red',             ja: 'レッド' },
  cmb_yellow:        { ko: '옐로우',         en: 'Yellow',          ja: 'イエロー' },
  cmb_white:         { ko: '화이트',         en: 'White',           ja: 'ホワイト' },
  cmb_blue:          { ko: '블루',           en: 'Blue',            ja: 'ブルー' },
  cmb_green:         { ko: '그린',           en: 'Green',           ja: 'グリーン' },
  cmb_purple:        { ko: '퍼플',           en: 'Purple',          ja: 'パープル' },
  cmb_dark:          { ko: '다크',           en: 'Dark',            ja: 'ダーク' },
}

// ── 검색 키워드 ────────────────────────────────────────────────────────────────
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  happy:            ['행복', '기쁨', 'happy', 'smile', '嬉しい'],
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
  div_heart:        ['하트 구분선', 'heart divider', 'ハート 区切り'],
  div_star:         ['별 구분선', 'star divider', '星 区切り'],
  div_flower:       ['꽃 구분선', 'flower divider', '花 区切り'],
  div_moon:         ['달 구분선', 'moon divider', '月 区切り'],
  div_christmas:    ['크리스마스 구분선', 'christmas divider', 'クリスマス 区切り'],
  div_template:     ['텍스트 서식', 'template', 'テンプレート'],
  combo:            ['꾸밈', '장식', 'deco', 'aesthetic', 'デコ'],
  emojico:          ['이모지 콤보', 'emoji combo', '絵文字コンボ'],
  cmb_heart:        ['하트 꾸밈', 'heart deco', 'ハート デコ'],
  cmb_star:         ['별 꾸밈', 'star deco', '星 デコ'],
  cmb_flower:       ['꽃 꾸밈', 'flower deco', '花 デコ'],
  cmb_moon:         ['달 꾸밈', 'moon deco', '月 デコ'],
  cmb_christmas:    ['크리스마스 꾸밈', 'christmas deco', 'クリスマス デコ'],
  cmb_template:     ['텍스트 서식', 'template', 'テンプレート'],
  cmb_pink:         ['핑크', 'pink', '분홍', 'ピンク'],
  cmb_yellow:       ['노랑', 'yellow', '금', 'イエロー'],
  cmb_white:        ['하양', 'white', '크림', 'ホワイト'],
  cmb_blue:         ['파랑', 'blue', '하늘', 'ブルー'],
  cmb_green:        ['초록', 'green', 'グリーン'],
  cmb_purple:       ['보라', 'purple', 'パープル'],
  cmb_dark:         ['다크', 'dark', '고딕', 'gothic', 'ダーク'],
}

function buildSearchTokens(content: string, categoryIds: string[]): string {
  const parts = [content.toLowerCase()]
  for (const id of categoryIds) {
    const kws = CATEGORY_KEYWORDS[id]
    if (kws) parts.push(...kws)
  }
  return parts.join(' ')
}

type RawItem = { id: string; content: string; categories: string[] }

function readJson(filePath: string): RawItem[] {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf-8')) } catch { return [] }
}

export const loadEmojiData = cache((lang: string = 'ko'): EmojiData => {
  const pub = path.join(process.cwd(), 'public')
  // 세 파일 모두 읽어서 카테고리 전체 파악
  const allRaw: RawItem[] = [
    ...readJson(path.join(pub, 'kaomoji.json')),
    ...readJson(path.join(pub, 'kaomoji-divider.json')),
    ...readJson(path.join(pub, 'kaomoji-combo.json')),
  ]

  const categoryOrder: string[] = []
  const categoryCounts: Record<string, number> = {}

  for (const item of allRaw) {
    for (const catId of item.categories) {
      if (!categoryOrder.includes(catId)) categoryOrder.push(catId)
      categoryCounts[catId] = (categoryCounts[catId] ?? 0) + 1
    }
  }

  const categories: EmojiCategory[] = categoryOrder.map(id => ({
    id,
    displayName: CATEGORY_NAMES[id]?.[lang] ?? CATEGORY_NAMES[id]?.en ?? id,
    group: getGroup(id),
    section: getSection(id),
    count: categoryCounts[id] ?? 0,
  }))

  const emojis: TextEmoji[] = allRaw.map(item => ({
    id: item.id,
    content: item.content,
    categoryIds: item.categories,
    group: getGroup(item.categories[0] ?? ''),
    searchTokens: buildSearchTokens(item.content, item.categories),
  }))

  const byCategory: Record<string, TextEmoji[]> = {}
  for (const emoji of emojis) {
    for (const catId of emoji.categoryIds) {
      ;(byCategory[catId] ??= []).push(emoji)
    }
  }

  return { categories, byCategory }
})
