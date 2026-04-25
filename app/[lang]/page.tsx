import { notFound } from 'next/navigation'
import { isValidLang, t } from '@/lib/i18n'
import { loadEmojiData } from '@/lib/data'
import { EmojiApp } from '@/components/EmojiApp'
import type { Lang, EmojiGroupId } from '@/types'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }, { lang: 'ja' }]
}

const GROUP_ORDER: EmojiGroupId[] = ['kaomoji', 'divider', 'combo']

export default async function MainPage({ params }: Props) {
  const { lang: rawLang } = await params
  if (!isValidLang(rawLang)) notFound()
  const lang = rawLang as Lang
  const data = loadEmojiData(lang)

  const byGroup = GROUP_ORDER.map(group => ({
    group,
    label: t(lang, group === 'kaomoji' ? 'groupKaomoji' : group === 'divider' ? 'groupDivider' : 'groupCombo'),
    categories: data.categories.filter(c => c.group === group),
  })).filter(g => g.categories.length > 0)

  return (
    <>
      <EmojiApp
        lang={lang}
        categories={data.categories}
        i18n={{
          groupKaomoji: t(lang, 'groupKaomoji'),
          groupDivider: t(lang, 'groupDivider'),
          groupCombo: t(lang, 'groupCombo'),
          searchPlaceholder: t(lang, 'searchPlaceholder'),
          categoryAll: t(lang, 'categoryAll'),
          emptyResult: t(lang, 'emptyResult'),
          copied: t(lang, 'copied'),
          copyHint: t(lang, 'copyHint'),
          downloadApp: t(lang, 'downloadApp'),
          favoritesOnly: t(lang, 'favoritesOnly'),
        }}
      />
      {/* SSR section: search engines index this even though users see EmojiApp above */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '60px 24px 80px', color: 'var(--color-text-primary)' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>
          {t(lang, 'siteTitle')}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '48px', fontSize: '16px', lineHeight: '1.7' }}>
          {t(lang, 'siteDescription')}
        </p>
        {byGroup.map(({ group, label, categories }) => (
          <div key={group} style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>{label}</h2>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', padding: 0, margin: 0 }}>
              {categories.map(cat => (
                <li key={cat.id}>
                  <a
                    href={`/${lang}/${cat.group}/${cat.id}`}
                    style={{
                      display: 'inline-block', padding: '6px 14px', borderRadius: '8px',
                      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                      textDecoration: 'none', color: 'var(--color-text-primary)', fontSize: '14px',
                    }}
                  >
                    {cat.displayName}
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '12px', marginLeft: '6px' }}>
                      {cat.count}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  )
}
