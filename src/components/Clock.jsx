import { motion } from 'framer-motion'
import FlipCard from './FlipCard'

/* ─── Static separator dots (NO blink) ─────────────────────── */
function Colon() {
  return (
    <div style={{
      display       : 'flex',
      flexDirection : 'column',
      gap           : 22,
      marginBottom  : 28,
      // Deliberately static — no animation
    }}>
      {[0, 1].map(i => (
        <div
          key={i}
          style={{
            width        : 9,
            height       : 9,
            borderRadius : '50%',
            background   : 'radial-gradient(circle, #FFB347, #FF6E00)',
            boxShadow    : '0 0 14px #FF8C00, 0 0 28px rgba(255,140,0,0.4)',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Accent bar ────────────────────────────────────────────── */
function AccentBar() {
  return (
    <div style={{
      width      : '100%',
      height     : 2,
      background : 'linear-gradient(to right, transparent, rgba(255,140,0,0.52) 30%, rgba(255,140,0,0.52) 70%, transparent)',
      borderRadius: 2,
      boxShadow  : '0 0 18px rgba(255,140,0,0.3)',
    }} />
  )
}

/* ─── Format toggle button ──────────────────────────────────── */
function FormatBtn({ is24h, onToggle }) {
  return (
    <button
      className={`ctrl-btn ${is24h ? 'active' : ''}`}
      onClick={onToggle}
    >
      {is24h ? '12 H' : '24 H'}
    </button>
  )
}

/* ─── Clock ─────────────────────────────────────────────────── */
/**
 * Props:
 *  hours   {number}
 *  minutes {number}
 *  seconds {number}
 *  ampm    {string}   'AM' | 'PM'
 *  dateStr {string}
 *  is24h   {boolean}
 *  onToggle24h {fn}
 *  tilt    {{ x, y }} — degrees for 3-D tilt
 */
export default function Clock({
  hours, minutes, seconds,
  ampm, dateStr,
  is24h, onToggle24h,
  tilt,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position      : 'relative',
        zIndex        : 1,
        display       : 'flex',
        flexDirection : 'column',
        alignItems    : 'center',
        gap           : 0,
      }}
    >
      {/* ── brand label ── */}
      <p style={{
        margin        : '0 0 36px',
        fontFamily    : '"Rajdhani", Arial, sans-serif',
        fontSize      : 11,
        fontWeight    : 700,
        letterSpacing : '0.7em',
        color         : 'rgba(255,140,0,0.62)',
        textTransform : 'uppercase',
      }}>
        ◈ &nbsp; Chronos &nbsp; ◈
      </p>

      {/* ── 3-D tilt wrapper ── */}
      <div style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}>
        <motion.div
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
          style={{
            display       : 'flex',
            flexDirection : 'column',
            alignItems    : 'center',
            gap           : 0,
          }}
        >
          <AccentBar />

          {/* ── flip cards ── */}
          <div style={{
            display    : 'flex',
            alignItems : 'center',
            gap        : 22,
            padding    : '28px 40px',
          }}>
            <FlipCard value={hours}   label="Hour"   />
            <Colon />
            <FlipCard value={minutes} label="Minute" />
            <Colon />
            <FlipCard value={seconds} label="Second" />
          </div>

          <AccentBar />
        </motion.div>
      </div>

      {/* ── AM/PM + format toggle ── */}
      <div style={{
        display    : 'flex',
        alignItems : 'center',
        gap        : 20,
        marginTop  : 34,
      }}>
        {!is24h && (
          <p style={{
            margin        : 0,
            fontFamily    : '"Rajdhani", Arial, sans-serif',
            fontSize      : 22,
            fontWeight    : 700,
            letterSpacing : '0.22em',
            color         : '#FFA040',
            textShadow    : '0 0 22px rgba(255,140,0,0.55)',
            minWidth      : 54,
          }}>
            {ampm}
          </p>
        )}
        <FormatBtn is24h={is24h} onToggle={onToggle24h} />
      </div>

      {/* ── date ── */}
      <p style={{
        margin        : '22px 0 0',
        fontFamily    : '"Rajdhani", Arial, sans-serif',
        fontSize      : 13,
        fontWeight    : 500,
        letterSpacing : '0.28em',
        color         : '#383838',
        textTransform : 'uppercase',
      }}>
        {dateStr}
      </p>
    </motion.div>
  )
}
