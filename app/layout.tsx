import type { Metadata } from 'next'
import './globals.css'
import { AmplitudeProvider } from '@/components/AmplitudeProvider'

const BASE_URL = 'https://mojiboard.pepper-factory.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Moji Board (모찌보드) — Kaomoji & Text Emoticons',
    template: '%s | Moji Board (모찌보드)',
  },
  description: '모찌보드(Moji Board) — 10,000개 이상의 카오모지와 텍스트 이모티콘. 50개 이상 카테고리, 한국어/영어/일본어 검색, 클릭 한 번으로 복사. 10,000+ kaomoji and text emoticons for messages, social media, and more.',
  keywords: ['모찌보드', 'mojiboard', 'moji board', '모지보드', 'kaomoji', '카오모지', '카오모지 모음', '카오모지 복사', '텍스트 카오모지', '귀여운 카오모지', '顔文字', 'text emoticons', 'text emoji', 'copy paste', '이모티콘', '텍스트 이모티콘'],
  authors: [{ name: 'Pepper Factory' }],
  creator: 'Pepper Factory',
  publisher: 'Pepper Factory',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: ['en_US', 'ja_JP'],
    url: BASE_URL,
    siteName: 'Moji Board (모찌보드)',
    title: 'Moji Board (모찌보드) — Kaomoji & Text Emoticons',
    description: '모찌보드 — 10,000개 이상의 카오모지와 텍스트 이모티콘. 클릭 한 번으로 복사.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Moji Board (모찌보드)' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moji Board (모찌보드) — Kaomoji & Text Emoticons',
    description: '모찌보드 — 10,000+ kaomoji. Click to copy.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: BASE_URL,
    languages: { ko: `${BASE_URL}/ko`, en: `${BASE_URL}/en`, ja: `${BASE_URL}/ja` },
  },
  icons: {
    icon: '/og-image.png',
    apple: '/og-image.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Noto+Sans+KR&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="PmIgyC0sse6SzpG5BYtRkfkgJRhwQ7P1JVx-R24dCOE" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5167821121400794" crossOrigin="anonymous" />
        {/* 테마 flicker 방지 */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('mojiboard-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Moji Board',
            alternateName: ['모찌보드', 'Mojiboard', '모지보드', '카오모지', '카오모지 모음', '카오모지 복사'],
            inLanguage: ['ko', 'en', 'ja'],
            url: BASE_URL,
            description: '모찌보드(Moji Board) — 10,000개 이상의 카오모지와 텍스트 이모티콘. 카테고리별 탐색, 한국어/영어/일본어 검색, 클릭 한 번으로 복사.',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web, iOS',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            author: { '@type': 'Organization', name: 'Pepper Factory', url: 'https://pepper-factory.com' },
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/ko?q={search_term_string}` },
              'query-input': 'required name=search_term_string',
            },
          })}}
        />
      </head>
      <body><AmplitudeProvider>{children}</AmplitudeProvider></body>
    </html>
  )
}
