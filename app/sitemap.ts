import type { MetadataRoute } from 'next'
import { loadEmojiData } from '@/lib/data'

const BASE_URL = 'https://mojiboard.pepper-factory.com'
const LANGS = ['ko', 'en', 'ja'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const data = loadEmojiData('ko')
  const entries: MetadataRoute.Sitemap = []

  // Root page with x-default
  entries.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: {
      languages: {
        'x-default': BASE_URL,
        ko: `${BASE_URL}/ko`,
        en: `${BASE_URL}/en`,
        ja: `${BASE_URL}/ja`,
      },
    },
  })

  // Main pages per language
  for (const lang of LANGS) {
    entries.push({
      url: `${BASE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(LANGS.map(l => [l, `${BASE_URL}/${l}`])),
      },
    })
  }

  // Category pages — grouped by category (not by lang) to include hreflang
  const koData = loadEmojiData('ko')
  for (const cat of koData.categories) {
    entries.push({
      url: `${BASE_URL}/ko/${cat.group}/${cat.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(LANGS.map(l => [l, `${BASE_URL}/${l}/${cat.group}/${cat.id}`])),
      },
    })
  }

  return entries
}
