import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { isValidLang } from '@/lib/i18n'
import { loadEmojiData, CATEGORY_NAMES } from '@/lib/data'
import type { Lang, EmojiGroupId, CategorySectionId } from '@/types'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }, { lang: 'ja' }]
}

const BASE_URL = 'https://mojiboard.pepper-factory.com'

// ── 메타데이터 ────────────────────────────────────────────────────────────────

const META: Record<Lang, { title: string; description: string }> = {
  ko: {
    title: '카오모지 가이드 — Moji Board',
    description:
      '카오모지란 무엇인지, 어떻게 사용하는지, 인기 카오모지를 소개합니다. 10,000개 이상의 카오모지를 탭 한 번으로 복사하세요.',
  },
  en: {
    title: 'Kaomoji Guide — Moji Board',
    description:
      'Learn what kaomoji are, how to use them, and discover popular text emoticons. Copy 10,000+ kaomoji with one click.',
  },
  ja: {
    title: '顔文字ガイド — Moji Board',
    description:
      '顔文字とは何か、使い方、人気の顔文字を紹介します。10,000以上の顔文字をワンクリックでコピー。',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params
  if (!isValidLang(rawLang)) return {}
  const lang = rawLang as Lang
  const { title, description } = META[lang]

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/guide`,
      languages: {
        ko: '/ko/guide',
        en: '/en/guide',
        ja: '/ja/guide',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${lang}/guide`,
      siteName: 'Moji Board',
      type: 'article',
      images: [{ url: '/og-image.png' }],
    },
    twitter: { card: 'summary', title, description },
  }
}

// ── 콘텐츠 ────────────────────────────────────────────────────────────────────

const CONTENT = {
  ko: {
    pageTitle: '카오모지 가이드',
    backLabel: '← Moji Board',

    section1Title: '카오모지란?',
    section1Body: `카오모지(顔文字)는 일본어로 '얼굴(顔) 문자(文字)'를 뜻하는 텍스트 이모티콘입니다. 1986년 일본의 아스키(ASCII) 아트 문화에서 탄생하여, 키보드로 입력할 수 있는 기호와 문자를 조합해 표정이나 감정을 표현합니다. 서양의 이모티콘(:) :-))과 달리 카오모지는 가로로 읽으며 훨씬 풍부한 표현이 가능합니다. 현재 카카오톡, 인스타그램, X(트위터), 디스코드 등 다양한 SNS에서 광범위하게 사용되고 있습니다.`,
    section1Examples: ['(^▽^)', '(ᴗ_ ᴗ。)', '(=^･ω･^=)', '(ノ◕ヮ◕)ノ*:･ﾟ✧', '( ´•̥̥̥ω•̥̥̥` )'],

    section2Title: '어떻게 사용하나요?',
    section2Steps: [
      { step: '1', title: '원하는 카오모지 선택', desc: 'Moji Board에서 감정, 동물, 활동 등 카테고리별로 카오모지를 탐색하세요.' },
      { step: '2', title: '탭 한 번으로 복사', desc: '카오모지를 클릭하면 자동으로 클립보드에 복사됩니다. 별도의 조작이 필요 없어요.' },
      { step: '3', title: '어디서든 붙여넣기', desc: '카카오톡, 인스타그램 DM, 트위터 트윗, 디스코드 채팅 등 원하는 곳에 Ctrl+V (또는 길게 눌러 붙여넣기)로 사용하세요.' },
    ],

    section3Title: '카테고리 탐색',
    section3Desc: 'Moji Board에는 감정, 동물, 활동, 캐릭터 등 다양한 카테고리가 있습니다. 아래에서 원하는 카테고리를 골라보세요.',
    sectionLabels: {
      emotion: '감정/표현',
      animal: '동물',
      action: '활동',
      character: '캐릭터',
      special: '특별',
      symbol: '심볼',
      color: '색상',
      season: '시즌',
      other: '기타',
    },

    section4Title: '인기 카오모지 TOP 10',
    section4Desc: '가장 많이 사랑받는 행복(Happy) 카테고리의 카오모지 TOP 10을 소개합니다.',

    ctaTitle: '더 많은 카오모지 탐색하기',
    ctaDesc: 'Moji Board 앱에서 10,000개 이상의 카오모지를 오프라인에서도 자유롭게 사용하세요.',
    ctaMain: '메인으로 돌아가기',
    ctaApp: '앱 다운로드',
  },
  en: {
    pageTitle: 'Kaomoji Guide',
    backLabel: '← Moji Board',

    section1Title: 'What is Kaomoji?',
    section1Body: `Kaomoji (顔文字) is a Japanese word meaning "face (顔) character (文字)." These text emoticons originated in Japan's ASCII art culture in 1986 and are formed by combining keyboard symbols and characters to express emotions and expressions. Unlike Western emoticons (:-) or :)), kaomoji are read horizontally and offer a much richer range of expression. Today they are widely used on platforms like KakaoTalk, Instagram, X (Twitter), Discord, and many more.`,
    section1Examples: ['(^▽^)', '(ᴗ_ ᴗ。)', '(=^･ω･^=)', '(ノ◕ヮ◕)ノ*:･ﾟ✧', '( ´•̥̥̥ω•̥̥̥` )'],

    section2Title: 'How to Use Kaomoji',
    section2Steps: [
      { step: '1', title: 'Find your kaomoji', desc: 'Browse Moji Board by category — emotions, animals, actions, characters, and more.' },
      { step: '2', title: 'Copy with one click', desc: 'Click any kaomoji and it is instantly copied to your clipboard. No extra steps needed.' },
      { step: '3', title: 'Paste anywhere', desc: 'Use Ctrl+V (or long-press paste) in KakaoTalk, Instagram DMs, tweets, Discord chats, or any text field.' },
    ],

    section3Title: 'Browse Categories',
    section3Desc: 'Moji Board features a wide variety of categories including emotions, animals, actions, and characters. Pick one below to explore.',
    sectionLabels: {
      emotion: 'Emotions',
      animal: 'Animals',
      action: 'Actions',
      character: 'Characters',
      special: 'Special',
      symbol: 'Symbols',
      color: 'Colors',
      season: 'Seasons',
      other: 'Other',
    },

    section4Title: 'Top 10 Popular Kaomoji',
    section4Desc: 'Here are the top 10 kaomoji from the beloved Happy category.',

    ctaTitle: 'Explore More Kaomoji',
    ctaDesc: 'Get the Moji Board app for offline access to 10,000+ kaomoji anytime, anywhere.',
    ctaMain: 'Back to Main',
    ctaApp: 'Download App',
  },
  ja: {
    pageTitle: '顔文字ガイド',
    backLabel: '← Moji Board',

    section1Title: '顔文字とは？',
    section1Body: `顔文字（かおもじ）とは、キーボードの記号や文字を組み合わせて顔の表情や感情を表すテキスト絵文字です。1986年に日本のASCIIアート文化から生まれ、欧米のスマイリー（:-)）とは異なり、横向きに読む点が特徴です。（^▽^）や（=^･ω･^=）のように、豊かな表現力を持ち、現在はTwitter（X）、Instagram、LINE、Discordなどさまざまなプラットフォームで広く活用されています。`,
    section1Examples: ['(^▽^)', '(ᴗ_ ᴗ。)', '(=^･ω･^=)', '(ノ◕ヮ◕)ノ*:･ﾟ✧', '( ´•̥̥̥ω•̥̥̥` )'],

    section2Title: '使い方',
    section2Steps: [
      { step: '1', title: '顔文字を選ぶ', desc: 'Moji Boardで感情・動物・行動・キャラクターなどカテゴリー別に顔文字を探してみましょう。' },
      { step: '2', title: 'ワンクリックでコピー', desc: '顔文字をクリックすると自動的にクリップボードにコピーされます。操作はそれだけです。' },
      { step: '3', title: 'どこでも貼り付け', desc: 'LINE、Instagram DM、Twitterのツイート、Discordのチャットなど、好きな場所でCtrl+V（またはロングタップで貼り付け）してお使いください。' },
    ],

    section3Title: 'カテゴリーを探す',
    section3Desc: 'Moji Boardには感情・動物・行動・キャラクターなど多彩なカテゴリーがあります。下から好きなカテゴリーを選んでください。',
    sectionLabels: {
      emotion: '感情/表現',
      animal: '動物',
      action: '行動',
      character: 'キャラ',
      special: 'スペシャル',
      symbol: 'シンボル',
      color: 'カラー',
      season: 'シーズン',
      other: 'その他',
    },

    section4Title: '人気顔文字 TOP 10',
    section4Desc: '最も人気のある「嬉しい（Happy）」カテゴリーから厳選したTOP 10の顔文字をご紹介します。',

    ctaTitle: 'もっと顔文字を探す',
    ctaDesc: 'Moji Boardアプリで10,000以上の顔文字をオフラインでもいつでも使えます。',
    ctaMain: 'メインへ戻る',
    ctaApp: 'アプリをダウンロード',
  },
}

const SECTION_ORDER: CategorySectionId[] = [
  'emotion', 'animal', 'action', 'character', 'special', 'symbol', 'color', 'season', 'other',
]

const GROUP_ORDER: EmojiGroupId[] = ['kaomoji', 'divider', 'combo']

// ── ページ ────────────────────────────────────────────────────────────────────

export default async function GuidePage({ params }: Props) {
  const { lang: rawLang } = await params
  if (!isValidLang(rawLang)) notFound()
  const lang = rawLang as Lang

  const data = loadEmojiData(lang)
  const c = CONTENT[lang]

  // 섹션별로 카테고리 분류 (kaomoji 그룹만)
  const kaomojCategories = data.categories.filter(cat => cat.group === 'kaomoji')
  const bySection: Partial<Record<CategorySectionId, typeof kaomojCategories>> = {}
  for (const cat of kaomojCategories) {
    ;(bySection[cat.section] ??= []).push(cat)
  }

  // 구분선/콤보 카테고리
  const dividerCategories = data.categories.filter(cat => cat.group === 'divider')
  const comboCategories = data.categories.filter(cat => cat.group === 'combo')

  // 인기 카오모지 TOP 10 — happy 카테고리 첫 10개
  const top10 = (data.byCategory['happy'] ?? []).slice(0, 10)

  // JSON-LD
  const inLanguage = lang === 'ko' ? 'ko-KR' : lang === 'ja' ? 'ja-JP' : 'en-US'
  const pageUrl = `${BASE_URL}/${lang}/guide`

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: c.pageTitle,
    headline: c.pageTitle,
    description: META[lang].description,
    url: pageUrl,
    inLanguage,
    author: { '@type': 'Organization', name: 'Moji Board' },
    publisher: { '@type': 'Organization', name: 'Moji Board', url: BASE_URL },
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: c.section1Title,
        acceptedAnswer: { '@type': 'Answer', text: c.section1Body },
      },
      {
        '@type': 'Question',
        name: c.section2Title,
        acceptedAnswer: {
          '@type': 'Answer',
          text: c.section2Steps.map(s => `${s.step}. ${s.title}: ${s.desc}`).join(' '),
        },
      },
    ],
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Moji Board', item: `${BASE_URL}/${lang}` },
      { '@type': 'ListItem', position: 2, name: c.pageTitle, item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div style={{ background: 'var(--color-bg)', minHeight: '100dvh', color: 'var(--color-text-primary)' }}>
        {/* 헤더 */}
        <header style={{ borderBottom: '1px solid var(--color-border)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href={`/${lang}`} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '14px' }}>
            {c.backLabel}
          </Link>
          <span style={{ color: 'var(--color-text-muted)' }}>/</span>
          <span style={{ fontSize: '14px', fontWeight: 600 }}>{c.pageTitle}</span>
        </header>

        <main style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px 80px' }}>

          {/* H1 */}
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>{c.pageTitle}</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginBottom: '56px', lineHeight: '1.7' }}>
            {META[lang].description}
          </p>

          {/* ── 섹션 1: 카오모지란? ── */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid var(--color-border)' }}>
              {c.section1Title}
            </h2>
            <p style={{ fontSize: '16px', lineHeight: '1.85', color: 'var(--color-text-primary)', marginBottom: '24px' }}>
              {c.section1Body}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {c.section1Examples.map(ex => (
                <span
                  key={ex}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '18px',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '10px',
                    padding: '8px 16px',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {ex}
                </span>
              ))}
            </div>
          </section>

          {/* ── 섹션 2: 어떻게 사용하나요? ── */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid var(--color-border)' }}>
              {c.section2Title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {c.section2Steps.map(({ step, title, desc }) => (
                <div
                  key={step}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '20px',
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--color-text-primary)',
                      color: 'var(--color-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '14px',
                    }}
                  >
                    {step}
                  </span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{title}</p>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.7' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 섹션 3: 카테고리 탐색 ── */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', paddingBottom: '8px', borderBottom: '2px solid var(--color-border)' }}>
              {c.section3Title}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginBottom: '28px', lineHeight: '1.7' }}>
              {c.section3Desc}
            </p>

            {/* 카오모지 그룹 — 섹션별 */}
            {SECTION_ORDER.map(sectionId => {
              const cats = bySection[sectionId]
              if (!cats || cats.length === 0) return null
              return (
                <div key={sectionId} style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
                    {c.sectionLabels[sectionId]}
                  </h3>
                  <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', padding: 0, margin: 0 }}>
                    {cats.map(cat => (
                      <li key={cat.id}>
                        <Link
                          href={`/${lang}/${cat.group}/${cat.id}`}
                          style={{
                            display: 'inline-block',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            textDecoration: 'none',
                            color: 'var(--color-text-primary)',
                            fontSize: '14px',
                          }}
                        >
                          {cat.displayName}
                          <span style={{ color: 'var(--color-text-muted)', fontSize: '12px', marginLeft: '6px' }}>
                            {cat.count}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}

            {/* 구분선 */}
            {dividerCategories.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
                  {lang === 'ko' ? '구분선' : lang === 'ja' ? '区切り線' : 'Dividers'}
                </h3>
                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', padding: 0, margin: 0 }}>
                  {dividerCategories.map(cat => (
                    <li key={cat.id}>
                      <Link
                        href={`/${lang}/${cat.group}/${cat.id}`}
                        style={{
                          display: 'inline-block',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          textDecoration: 'none',
                          color: 'var(--color-text-primary)',
                          fontSize: '14px',
                        }}
                      >
                        {cat.displayName}
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '12px', marginLeft: '6px' }}>
                          {cat.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 콤보 */}
            {comboCategories.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
                  {lang === 'ko' ? '콤보' : lang === 'ja' ? 'コンボ' : 'Combos'}
                </h3>
                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', padding: 0, margin: 0 }}>
                  {comboCategories.map(cat => (
                    <li key={cat.id}>
                      <Link
                        href={`/${lang}/${cat.group}/${cat.id}`}
                        style={{
                          display: 'inline-block',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          textDecoration: 'none',
                          color: 'var(--color-text-primary)',
                          fontSize: '14px',
                        }}
                      >
                        {cat.displayName}
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '12px', marginLeft: '6px' }}>
                          {cat.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* ── 섹션 4: 인기 카오모지 TOP 10 ── */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', paddingBottom: '8px', borderBottom: '2px solid var(--color-border)' }}>
              {c.section4Title}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginBottom: '24px', lineHeight: '1.7' }}>
              {c.section4Desc}
            </p>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {top10.map((emoji, i) => (
                <li
                  key={emoji.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '10px',
                    padding: '12px 20px',
                  }}
                >
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '13px', minWidth: '24px', fontWeight: 600 }}>
                    {i + 1}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: '17px', color: 'var(--color-text-primary)' }}>
                    {emoji.content}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* ── CTA ── */}
          <section
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              padding: '36px 32px',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>{c.ctaTitle}</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px', marginBottom: '24px', lineHeight: '1.7' }}>
              {c.ctaDesc}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href={`/${lang}`}
                style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  borderRadius: '10px',
                  background: 'var(--color-text-primary)',
                  color: 'var(--color-bg)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                }}
              >
                {c.ctaMain}
              </Link>
              <a
                href="https://apps.apple.com/app/moji-board/id6762520115"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  borderRadius: '10px',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                }}
              >
                {c.ctaApp}
              </a>
            </div>
          </section>

        </main>
      </div>
    </>
  )
}
