'use client'

interface Props {
  message: string
}

export function CopyToast({ message }: Props) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(20,20,28,0.95)',
      border: '1px solid var(--color-border2)',
      backdropFilter: 'blur(12px)',
      color: 'var(--color-text-primary)',
      borderRadius: '20px',
      padding: '10px 20px',
      fontSize: '13px',
      fontWeight: 600,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      animation: 'toastIn 0.2s ease-out',
      pointerEvents: 'none',
    }}>
      <span style={{
        width: '18px', height: '18px', background: 'var(--color-overlay)',
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '10px', flexShrink: 0,
      }}>✓</span>
      {message}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}
