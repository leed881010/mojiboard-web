import { notFound } from 'next/navigation'
import { isValidLang, t } from '@/lib/i18n'
import { loadEmojiData } from '@/lib/data'
import { EmojiApp } from '@/components/EmojiApp'
import type { Lang } from '@/types'

interface Props {
  params: Promise<{ lang: string }>
}

export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }, { lang: 'ja' }]
}

export default async function MainPage({ params }: Props) {
  const { lang: rawLang } = await params
  if (!isValidLang(rawLang)) notFound()
  const lang = rawLang as Lang
  const data = loadEmojiData(lang)

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
    />
  )
}
