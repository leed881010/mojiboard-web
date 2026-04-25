import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { isValidLang, t } from '@/lib/i18n'
import { loadEmojiData, CATEGORY_NAMES } from '@/lib/data'
import { CategoryPageGrid } from '@/components/CategoryPageGrid'
import type { Lang, EmojiGroupId } from '@/types'

interface Props {
  params: Promise<{ lang: string; group: string; category: string }>
}

const VALID_GROUPS: EmojiGroupId[] = ['kaomoji', 'divider', 'combo']

export async function generateStaticParams() {
  const langs: Lang[] = ['ko', 'en', 'ja']
  const result: Array<{ lang: string; group: string; category: string }> = []

  for (const lang of langs) {
    const data = loadEmojiData(lang)
    for (const cat of data.categories) {
      result.push({ lang, group: cat.group, category: cat.id })
    }
  }

  return result
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang, category, group } = await params
  if (!isValidLang(rawLang)) return {}
  const lang = rawLang as Lang
  const catName = CATEGORY_NAMES[category]?.[lang] ?? category
  const data = loadEmojiData(lang)
  const count = data.byCategory[category]?.length ?? 0
  const title = `${catName} ${t(lang, 'groupKaomoji')} — Moji Board`
  const description = t(lang, 'ogDescription', { category: catName })

  const countStr = lang === 'ko' ? `${count}개` : lang === 'ja' ? `${count}件` : `${count} items`
  const fullDescription = `${description} (${countStr})`

  return {
    title,
    description: fullDescription,
    alternates: {
      canonical: `/${lang}/${group}/${category}`,
      languages: {
        ko: `/ko/${group}/${category}`,
        en: `/en/${group}/${category}`,
        ja: `/ja/${group}/${category}`,
      },
    },
    openGraph: {
      title,
      description: fullDescription,
      type: 'website',
      images: [{ url: '/og-image.png' }],
    },
    twitter: { card: 'summary', title, description: fullDescription },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { lang: rawLang, group, category } = await params
  if (!isValidLang(rawLang) || !VALID_GROUPS.includes(group as EmojiGroupId)) notFound()
  const lang = rawLang as Lang
  const data = loadEmojiData(lang)
  const emojis = data.byCategory[category]
  if (!emojis || emojis.length === 0) notFound()

  const catName = CATEGORY_NAMES[category]?.[lang] ?? category
  const groupLabel = t(lang, group === 'kaomoji' ? 'groupKaomoji' : group === 'divider' ? 'groupDivider' : 'groupCombo')
  const countStr = lang === 'ko' ? `${emojis.length}개` : lang === 'ja' ? `${emojis.length}件` : `${emojis.length} items`
  const inLanguage = lang === 'ko' ? 'ko-KR' : lang === 'ja' ? 'ja-JP' : 'en-US'

  const BASE_URL = 'https://mojiboard.pepper-factory.com'

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${catName} ${groupLabel}`,
    description: `${t(lang, 'ogDescription', { category: catName })} (${countStr})`,
    url: `${BASE_URL}/${lang}/${group}/${category}`,
    inLanguage,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: emojis.length,
      itemListElement: emojis.slice(0, 20).map((emoji, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: emoji.content,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Moji Board', item: `${BASE_URL}/${lang}` },
      { '@type': 'ListItem', position: 2, name: groupLabel, item: `${BASE_URL}/${lang}` },
      { '@type': 'ListItem', position: 3, name: catName, item: `${BASE_URL}/${lang}/${group}/${category}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div style={{ background: 'var(--color-bg)', minHeight: '100dvh', color: 'var(--color-text-primary)' }}>
      {/* minimal header */}
      <header style={{ borderBottom: '1px solid var(--color-border)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link href={`/${lang}`} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '14px' }}>
          ← Moji Board
        </Link>
        <span style={{ color: 'var(--color-text-muted)' }}>/</span>
        <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>{groupLabel}</span>
        <span style={{ color: 'var(--color-text-muted)' }}>/</span>
        <span style={{ fontSize: '14px', fontWeight: 600 }}>{catName}</span>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>{catName}</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: '14px' }}>
          {emojis.length}{lang === 'ko' ? '개' : lang === 'ja' ? '件' : ' items'}
        </p>

        <CategoryPageGrid emojis={emojis} copiedLabel={t(lang, 'copied')} />

        {/* SSR: 카오모지 문자를 초기 HTML에 포함하여 검색 엔진 인덱싱 지원 */}
        <section
          aria-label={catName}
          style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}
        >
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', listStyle: 'none', padding: 0, margin: 0 }}>
            {emojis.map(emoji => (
              <li
                key={emoji.id}
                style={{ fontFamily: 'monospace', fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}
              >
                {emoji.content}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
    </>
  )
}
