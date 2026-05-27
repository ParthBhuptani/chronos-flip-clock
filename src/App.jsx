import { useState, useEffect, useRef, useCallback } from 'react'
import BackgroundEffects from './components/BackgroundEffects'
import Clock from './components/Clock'
import { useClock } from './hooks/useClock'

/* ─── Mouse tilt hook ───────────────────────────────────────── */
function useMouseTilt(containerRef) {
  const targetRef  = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const rafRef = useRef(null)

  // Lerp animation loop — runs independently of mouse events
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t
    const tick = () => {
      const cx = lerp(currentRef.current.x, targetRef.current.x, 0.075)
      const cy = lerp(currentRef.current.y, targetRef.current.y, 0.075)
      currentRef.current = { x: cx, y: cy }
      setTilt({ x: cx, y: cy })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const onMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width  / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    targetRef.current = { x: dy * -10, y: dx * 10 }
  }, [])

  const onMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 }
  }, [])

  return { tilt, onMouseMove, onMouseLeave }
}

/* ─── App ───────────────────────────────────────────────────── */
export default function App() {
  const [is24h, setIs24h] = useState(false)
  const containerRef = useRef(null)

  const { hours, minutes, seconds, ampm, dateStr } = useClock(is24h)
  const { tilt, onMouseMove, onMouseLeave } = useMouseTilt(containerRef)

  const toggle24h = useCallback(() => setIs24h(prev => !prev), [])

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        minHeight      : '100vh',
        background     : '#050505',
        display        : 'flex',
        flexDirection  : 'column',
        alignItems     : 'center',
        justifyContent : 'center',
        position       : 'relative',
        overflow       : 'hidden',
        userSelect     : 'none',
      }}
    >
      {/* ── layered background effects ── */}
      <BackgroundEffects />

      {/* ── clock ── */}
      <Clock
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        ampm={ampm}
        dateStr={dateStr}
        is24h={is24h}
        onToggle24h={toggle24h}
        tilt={tilt}
      />

      {/* ── footer ── */}
      <footer style={{
        position      : 'absolute',
        bottom        : 22,
        display       : 'flex',
        alignItems    : 'center',
        gap           : 12,
        fontFamily    : '"Rajdhani", Arial, sans-serif',
        fontSize      : 10,
        fontWeight    : 700,
        letterSpacing : '0.45em',
        color         : '#282828',
        textTransform : 'uppercase',
        userSelect    : 'none',
      }}>
        <span style={{ width: 22, height: 1, background: 'rgba(255,140,0,0.2)', display: 'inline-block' }} />
        Live Digital Timepiece
        <span style={{ width: 22, height: 1, background: 'rgba(255,140,0,0.2)', display: 'inline-block' }} />
      </footer>
    </div>
  )
}
