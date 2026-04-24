import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { SUPPORTED_LANGS, DEFAULT_LANG } from '@/lib/i18n'
import type { Lang } from '@/types'

export default async function RootPage() {
  const hdrs = await headers()
  const acceptLang = hdrs.get('accept-language') ?? ''
  const preferred = acceptLang.split(',')[0]?.split('-')[0]?.toLowerCase() as Lang
  const lang = SUPPORTED_LANGS.includes(preferred) ? preferred : DEFAULT_LANG
  redirect(`/${lang}`)
}
