import type { MetadataRoute } from 'next'
import { loadEmojiData } from '@/lib/data'

const BASE_URL = 'https://mojiboard.pepper-factory.com'
const LANGS = ['ko', 'en', 'ja'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const data = loadEmojiData('ko')
  const entries: MetadataRoute.Sitemap = []

  // Main pages
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

  // Category pages
  for (const lang of LANGS) {
    const langData = loadEmojiData(lang)
    for (const cat of langData.categories) {
      entries.push({
        url: `${BASE_URL}/${lang}/${cat.group}/${cat.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
