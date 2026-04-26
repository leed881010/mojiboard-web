import { notFound } from 'next/navigation'
import Link from 'next/link'
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
    >
      {/* SSR footer: EmojiGrid 스크롤 영역 끝부분에 위치 */}
      <footer style={{ maxWidth: '960px', margin: '40px auto 24px', padding: '32px 8px 16px', borderTop: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
          {t(lang, 'siteTitle')}
        </h2>
        <p style={{ marginBottom: '12px' }}>
          <Link href={`/${lang}/guide`} style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            {lang === 'ko' ? '카오모지 가이드 →' : lang === 'ja' ? '顔文字ガイド →' : 'Kaomoji Guide →'}
          </Link>
        </p>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: '14px', lineHeight: '1.7' }}>
          {t(lang, 'siteDescription')}
        </p>
        {byGroup.map(({ group, label, categories }) => (
          <div key={group} style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text-secondary)' }}>{label}</h3>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', listStyle: 'none', padding: 0, margin: 0 }}>
              {categories.map(cat => (
                <li key={cat.id}>
                  <a
                    href={`/${lang}/${cat.group}/${cat.id}`}
                    style={{
                      display: 'inline-block', padding: '4px 10px', borderRadius: '6px',
                      background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                      textDecoration: 'none', color: 'var(--color-text-primary)', fontSize: '12px',
                    }}
                  >
                    {cat.displayName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </footer>
    </EmojiApp>
  )
}
