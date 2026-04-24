'use client'

import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('mojiboard-theme')
    if (saved === 'dark' || saved === 'light') {
      setIsDark(saved === 'dark')
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('mojiboard-theme')) setIsDark(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('mojiboard-theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      title={isDark ? 'Light mode' : 'Dark mode'}
      style={{
        background: 'none',
        border: '1px solid var(--color-border)',
        borderRadius: '8px', cursor: 'pointer',
        width: '32px', height: '32px',
        color: 'var(--color-text-secondary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'color 0.15s', flexShrink: 0,
        overflow: 'visible',
        appearance: 'none',
        WebkitAppearance: 'none',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="-1 -1 18 18" fill="none" overflow="visible">
          <circle cx="8" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M11.5 3.4l-1.1 1.1M4.5 11.5l-1.1 1.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="-1 -1 18 18" fill="none" overflow="visible">
          <path d="M13.5 9.5A6 6 0 017 3 6 6 0 1013.5 9.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  )
}
