'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Lang } from '@/types'
import { Analytics } from './AmplitudeProvider'
import { SUPPORTED_LANGS, getLangLabel } from '@/lib/i18n'
import { ThemeToggle } from './ThemeToggle'

interface Props {
  lang: Lang
  downloadLabel: string
  favoritesLabel: string
  showFavoritesOnly: boolean
  onToggleFavorites: () => void
  searchText: string
  onSearchChange: (v: string) => void
  searchPlaceholder: string
  onMenuOpen: () => void
}

const APP_STORE_URL = 'https://apps.apple.com/app/id6762520115'

export function Header({
  lang, downloadLabel, favoritesLabel, showFavoritesOnly,
  onToggleFavorites, searchText, onSearchChange, searchPlaceholder, onMenuOpen,
}: Props) {
  const pathname = usePathname()

  function langHref(l: Lang) {
    return pathname.replace(/^\/(ko|en|ja)/, `/${l}`) || `/${l}`
  }

  return (
    <header style={{
      borderBottom: '1px solid var(--color-border)',
      background: 'var(--color-surface)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      padding: '0 16px',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      {/* Mobile menu button */}
      <button
        onClick={onMenuOpen}
        className="mobile-menu-btn"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-text-secondary)', padding: '8px', borderRadius: '8px',
          display: 'none', alignItems: 'center', justifyContent: 'center',
        }}
        aria-label="Categories"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Logo */}
      <Link href={`/${lang}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <span style={{ fontWeight: 700, fontSize: '16px', color: 'var(--color-text-primary)' }}>
          Moji Board
        </span>
      </Link>

      {/* Search — grows */}
      <div style={{ flex: 1, position: 'relative', maxWidth: '480px' }}>
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }}
        >
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          value={searchText}
          onChange={e => onSearchChange(e.target.value)}
          onCompositionEnd={e => onSearchChange((e.target as HTMLInputElement).value)}
          placeholder={searchPlaceholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          style={{
            width: '100%',
            background: 'var(--color-surface2)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            color: 'var(--color-text-primary)',
            fontSize: '13px',
            padding: '8px 12px 8px 34px',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.25)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        />
        {searchText && (
          <button
            onClick={() => onSearchChange('')}
            style={{
              position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--color-text-muted)', padding: '2px', borderRadius: '4px',
              display: 'flex', alignItems: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto', flexShrink: 0 }}>
        {/* Favorites toggle */}
        <button
          onClick={onToggleFavorites}
          title={favoritesLabel}
          style={{
            background: showFavoritesOnly ? 'var(--color-item-active)' : 'none',
            border: `1px solid ${showFavoritesOnly ? 'var(--color-border2)' : 'var(--color-border)'}`,
            borderRadius: '8px', cursor: 'pointer', padding: '0 10px',
            height: '32px',
            color: showFavoritesOnly ? '#e05555' : 'var(--color-text-secondary)',
            fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px',
            transition: 'all 0.15s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill={showFavoritesOnly ? 'currentColor' : 'none'}>
            <path d="M7 12.5C7 12.5 1 8.8 1 4.5a3 3 0 015.5-1.65A3 3 0 0113 4.5C13 8.8 7 12.5 7 12.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          </svg>
          <span className="favorites-label">{favoritesLabel}</span>
        </button>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Language switcher */}
        <div style={{ position: 'relative' }} className="lang-switcher">
          <select
            value={lang}
            onChange={e => { window.location.href = langHref(e.target.value as Lang) }}
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              background: 'transparent',
              border: '1px solid var(--color-border2)',
              borderRadius: '8px',
              color: 'var(--color-text-secondary)',
              fontSize: '12px',
              padding: '0 10px',
              cursor: 'pointer',
              outline: 'none',
              height: '32px',
            }}
          >
            {SUPPORTED_LANGS.map(l => (
              <option key={l} value={l} style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)' }}>
                {getLangLabel(l)}
              </option>
            ))}
          </select>
        </div>

        {/* App Store button */}
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => Analytics.appStoreClicked()}
          style={{
            background: 'var(--color-overlay)',
            border: '1px solid var(--color-overlay-border)',
            color: 'var(--color-text-primary)',
            borderRadius: '8px',
            padding: '0 14px',
            height: '32px',
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
          className="download-btn"
        >
          {downloadLabel}
        </a>

        {/* Guide button */}
        <Link
          href={`/${lang}/guide`}
          title={lang === 'ko' ? '카오모지 가이드' : lang === 'ja' ? '顔文字ガイド' : 'Kaomoji Guide'}
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
            borderRadius: '8px',
            padding: '0 12px',
            height: '32px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
          className="guide-btn"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 2h6.5a1.5 1.5 0 011.5 1.5V12L7 10l-4 2V2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          </svg>
          <span className="guide-label">{lang === 'ko' ? '가이드' : lang === 'ja' ? 'ガイド' : 'Guide'}</span>
        </Link>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .mobile-menu-btn { display: flex !important; }
          .favorites-label { display: none; }
          .download-btn { display: none; }
          .guide-label { display: none; }
          .guide-btn { padding: 0 8px !important; }
        }
        @media (max-width: 480px) {
          .lang-switcher { display: none; }
        }
      `}</style>
    </header>
  )
}
