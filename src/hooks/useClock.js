import { useState, useEffect } from 'react'

/**
 * useClock — returns live time values, updated every second.
 * @param {boolean} is24h  — use 24-hour format
 * @returns {{ hours, minutes, seconds, ampm, dateStr }}
 */
export function useClock(is24h = false) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    // Align tick to the next whole second for accuracy
    const msUntilNextSecond = 1000 - now.getMilliseconds()
    const timeout = setTimeout(() => {
      setNow(new Date())
      const interval = setInterval(() => setNow(new Date()), 1000)
      return () => clearInterval(interval)
    }, msUntilNextSecond)

    return () => clearTimeout(timeout)
  }, [])

  const raw  = now.getHours()
  const ampm = raw >= 12 ? 'PM' : 'AM'

  const hours   = is24h ? raw : raw % 12 || 12
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  const DAY_NAMES   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  const dateStr = `${DAY_NAMES[now.getDay()]}, ${MONTH_NAMES[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`

  return { hours, minutes, seconds, ampm, dateStr, is24h }
}
