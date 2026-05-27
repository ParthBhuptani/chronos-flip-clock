import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ─── constants ─────────────────────────────────────────────── */
const W = 158   // card width  (px)
const H = 208   // card height (px)

const CARD_BG   = 'linear-gradient(160deg, #1c1c1c 0%, #101010 55%, #161616 100%)'
const CARD_SHADOW = [
  '0 32px 80px rgba(0,0,0,0.92)',
  '0 8px  30px rgba(0,0,0,0.65)',
  'inset 0 1px 0 rgba(255,255,255,0.045)',
].join(', ')

/* ─── shared style objects ──────────────────────────────────── */
const halfBase = {
  position : 'absolute',
  left     : 0,
  right    : 0,
  height   : H / 2,
  overflow : 'hidden',
  background: CARD_BG,
  border   : '1px solid #242424',
}

const numBase = {
  position       : 'absolute',
  width          : '100%',
  height         : H,
  display        : 'flex',
  alignItems     : 'center',
  justifyContent : 'center',
  fontFamily     : '"Bebas Neue", Impact, monospace',
  fontSize       : 138,
  lineHeight     : 1,
  color          : '#f5f2ee',
  userSelect     : 'none',
  letterSpacing  : '-1px',
}

/* ─── sub-components ────────────────────────────────────────── */

/** Shared sheen overlay for each panel */
function Sheen({ dir = 'to bottom', from = 'rgba(255,255,255,0.035)', to = 'transparent', at = '55%' }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: `linear-gradient(${dir}, ${from} 0%, ${to} ${at})`,
    }} />
  )
}

/** Static top panel — always shows the upper half of `digit` */
function StaticTop({ digit }) {
  return (
    <div style={{ ...halfBase, top: 0, borderRadius: '14px 14px 0 0', borderBottom: '2px solid #080808' }}>
      <div style={{ ...numBase, top: 0 }}>{digit}</div>
      <Sheen />
    </div>
  )
}

/** Static bottom panel — always shows the lower half of `digit` */
function StaticBottom({ digit }) {
  return (
    <div style={{ ...halfBase, bottom: 0, borderRadius: '0 0 14px 14px', borderTop: 'none' }}>
      <div style={{ ...numBase, top: -(H / 2) }}>{digit}</div>
      <Sheen dir="to bottom" from="transparent" to="rgba(0,0,0,0.35)" at="100%" />
      {/* bottom amber tint */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 28,
        background: 'linear-gradient(to bottom, transparent, rgba(255,160,64,0.03))',
        borderRadius: '0 0 14px 14px', pointerEvents: 'none',
      }} />
    </div>
  )
}

/** Animated top flap — current digit's upper half, rotates away */
function FlapTop({ digit }) {
  return (
    <div
      className="anim-flip-top"
      style={{
        ...halfBase,
        top          : 0,
        borderRadius : '14px 14px 0 0',
        borderBottom : '2px solid #080808',
        transformOrigin: 'bottom center',
        zIndex       : 4,
        backfaceVisibility: 'hidden',
      }}
    >
      <div style={{ ...numBase, top: 0 }}>{digit}</div>
      <Sheen />
      {/* fold-edge streak */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, pointerEvents: 'none',
        background: 'linear-gradient(to right, transparent, rgba(255,140,0,0.45), transparent)',
      }} />
    </div>
  )
}

/** Animated bottom flap — next digit's lower half, rotates into view */
function FlapBottom({ digit }) {
  return (
    <div
      className="anim-flip-bottom"
      style={{
        ...halfBase,
        bottom       : 0,
        borderRadius : '0 0 14px 14px',
        transformOrigin: 'top center',
        zIndex       : 4,
        backfaceVisibility: 'hidden',
      }}
    >
      <div style={{ ...numBase, top: -(H / 2) }}>{digit}</div>
      {/* unfold-edge streak */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3, pointerEvents: 'none',
        background: 'linear-gradient(to right, transparent, rgba(255,140,0,0.45), transparent)',
      }} />
    </div>
  )
}

/* ─── FlipCard ──────────────────────────────────────────────── */
/**
 * Props:
 *  value  {number}  — current numeric value (0-59 / 0-23 / 1-12)
 *  label  {string}  — caption underneath ("Hour", "Minute", "Second")
 */
export default function FlipCard({ value, label }) {
  const [displayed, setDisplayed] = useState(value)
  const [pending,   setPending]   = useState(value)
  const [flipping,  setFlipping]  = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    // Nothing changed — skip
    if (value === displayed && !flipping) return

    clearTimeout(timerRef.current)
    setPending(value)
    setFlipping(true)

    // After both flap animations finish (250ms + 250ms = 500ms), settle
    timerRef.current = setTimeout(() => {
      setDisplayed(value)
      setFlipping(false)
    }, 520)

    return () => clearTimeout(timerRef.current)
  }, [value])

  const curr = String(displayed).padStart(2, '0')
  const next = String(pending).padStart(2, '0')

  return (
    <motion.div
      className="flip-card"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
      whileHover={{ y: -4, filter: 'brightness(1.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* ── card body ── */}
      <div style={{ position: 'relative', width: W, height: H, borderRadius: 14, boxShadow: CARD_SHADOW }}>

        {/* Static panels */}
        <StaticTop    digit={next} />
        <StaticBottom digit={curr} />

        {/* Animated flaps — mounted only while flipping */}
        {flipping && (
          <>
            <FlapTop    digit={curr} />
            <FlapBottom digit={next} />
          </>
        )}

        {/* ── center seam ── */}
        <div style={{
          position : 'absolute', left: 0, right: 0, top: '50%',
          height   : 5, background: '#000',
          zIndex   : 10, transform: 'translateY(-50%)',
          boxShadow: '0 0 10px rgba(0,0,0,1)',
        }} />

        {/* ── rim glow ── */}
        <div style={{
          position: 'absolute', inset: -1, borderRadius: 15, pointerEvents: 'none',
          border  : '1px solid rgba(255,140,0,0.12)',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)',
        }} />

        {/* ── top specular highlight ── */}
        <div style={{
          position: 'absolute', top: 0, left: 12, right: 12, height: 1, pointerEvents: 'none',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)',
          borderRadius: 14,
        }} />
      </div>

      {/* ── label ── */}
      <p style={{
        margin       : 0,
        fontFamily   : '"Rajdhani", Arial, sans-serif',
        fontSize     : 11,
        fontWeight   : 700,
        letterSpacing: '0.45em',
        color        : '#444',
        textTransform: 'uppercase',
      }}>
        {label}
      </p>
    </motion.div>
  )
}
