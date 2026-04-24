import type { Metadata } from 'next'
import './globals.css'

const BASE_URL = 'https://mojiboard.pepper-factory.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Moji Board — Kaomoji & Text Emoticons',
    template: '%s | Moji Board',
  },
  description: '10,000+ kaomoji and text emoticons for messages, social media, and more. Browse 50+ categories, search in Korean, English, or Japanese, and copy with one click.',
  keywords: ['kaomoji', '카오모지', '顔文字', 'text emoticons', 'text emoji', 'copy paste', '이모티콘', '텍스트 이모티콘'],
  authors: [{ name: 'Pepper Factory' }],
  creator: 'Pepper Factory',
  publisher: 'Pepper Factory',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: ['en_US', 'ja_JP'],
    url: BASE_URL,
    siteName: 'Moji Board',
    title: 'Moji Board — Kaomoji & Text Emoticons',
    description: '10,000+ kaomoji and text emoticons. Click to copy instantly.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Moji Board' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moji Board — Kaomoji & Text Emoticons',
    description: '10,000+ kaomoji. Click to copy.',
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
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Noto+Sans+KR&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="PmIgyC0sse6SzpG5BYtRkfkgJRhwQ7P1JVx-R24dCOE" />
        {/* 테마 flicker 방지 */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('mojiboard-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Moji Board',
            url: BASE_URL,
            description: '10,000+ kaomoji and text emoticons. Browse by category, search in Korean, English, or Japanese, and copy with one click.',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web, iOS',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            author: { '@type': 'Organization', name: 'Pepper Factory', url: 'https://pepper-factory.com' },
          })}}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
