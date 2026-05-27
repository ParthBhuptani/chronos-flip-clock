import { useRef, useMemo } from 'react'

/* ─── helpers ───────────────────────────────────────────────── */
function rand(min, max) {
  return Math.random() * (max - min) + min
}

/* ─── Particles ─────────────────────────────────────────────── */
function Particles() {
  const particles = useMemo(() => (
    Array.from({ length: 38 }, (_, i) => ({
      id      : i,
      left    : `${rand(0, 100)}%`,
      size    : rand(1, 3.2),
      duration: rand(14, 26),
      delay   : rand(0, 22),
      drift   : `${rand(-80, 80)}px`,
      color   : Math.random() > 0.55 ? '#FF8C00' : '#FFB347',
    }))
  ), [])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none', overflow: 'hidden', zIndex: 0,
    }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position     : 'absolute',
            left         : p.left,
            bottom       : '-10px',
            width        : p.size,
            height       : p.size,
            borderRadius : '50%',
            background   : p.color,
            boxShadow    : `0 0 ${p.size * 3}px ${p.color}`,
            opacity      : 0,
            '--drift'    : p.drift,
            animationName           : 'rise',
            animationDuration       : `${p.duration}s`,
            animationDelay          : `${p.delay}s`,
            animationTimingFunction : 'linear',
            animationIterationCount : 'infinite',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Perspective grid ──────────────────────────────────────── */
function Grid() {
  return (
    <div style={{
      position      : 'fixed', inset: 0,
      pointerEvents : 'none',
      backgroundImage: [
        'linear-gradient(rgba(255,140,0,0.018) 1px, transparent 1px)',
        'linear-gradient(90deg, rgba(255,140,0,0.018) 1px, transparent 1px)',
      ].join(', '),
      backgroundSize: '62px 62px',
    }} />
  )
}

/* ─── Ambient centre glow ───────────────────────────────────── */
function AmbientGlow() {
  return (
    <div
      style={{
        position      : 'fixed', inset: 0,
        pointerEvents : 'none',
        background    : 'radial-gradient(ellipse 72% 52% at 50% 50%, rgba(255,120,0,0.07) 0%, transparent 68%)',
        animationName : 'ambientGlow',
        animationDuration       : '4s',
        animationTimingFunction : 'ease-in-out',
        animationIterationCount : 'infinite',
      }}
    />
  )
}

/* ─── Corner accent glows ───────────────────────────────────── */
function CornerGlows() {
  const corners = [
    { top: -80, left: -80 },
    { top: -80, right: -80 },
    { bottom: -80, left: -80 },
    { bottom: -80, right: -80 },
  ]
  return (
    <>
      {corners.map((pos, i) => (
        <div key={i} style={{
          position: 'fixed', ...pos,
          width: 230, height: 230,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,100,0,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      ))}
    </>
  )
}

/* ─── Scanline overlay (very subtle CRT feel) ───────────────── */
function Scanlines() {
  return (
    <div style={{
      position      : 'fixed', inset: 0,
      pointerEvents : 'none',
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
      zIndex        : 50,
    }} />
  )
}

/* ─── Export ────────────────────────────────────────────────── */
export default function BackgroundEffects() {
  return (
    <>
      <AmbientGlow />
      <CornerGlows />
      <Grid />
      <Particles />
      <Scanlines />
    </>
  )
}
