import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isValidLang, t } from '@/lib/i18n'
import type { Lang } from '@/types'

interface Props {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params
  if (!isValidLang(rawLang)) return {}
  const lang = rawLang as Lang
  return {
    title: t(lang, 'siteTitle'),
    description: t(lang, 'siteDescription'),
    metadataBase: new URL('https://mojiboard.pepper-factory.com'),
    alternates: {
      canonical: `/${lang}`,
      languages: { ko: '/ko', en: '/en', ja: '/ja' },
    },
    openGraph: {
      title: t(lang, 'siteTitle'),
      description: t(lang, 'siteDescription'),
      url: `/${lang}`,
      siteName: 'Moji Board',
      type: 'website',
    },
  }
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()
  return <>{children}</>
}
