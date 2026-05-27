/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'monospace'],
        ui: ['"Rajdhani"', 'Arial', 'sans-serif'],
      },
      colors: {
        amber: {
          flip: '#FF8C00',
          light: '#FFB347',
          dim: '#FF6E00',
        },
      },
      keyframes: {
        flipTopLeave: {
          '0%':   { transform: 'perspective(700px) rotateX(0deg)' },
          '100%': { transform: 'perspective(700px) rotateX(-90deg)' },
        },
        flipBottomEnter: {
          '0%':   { transform: 'perspective(700px) rotateX(90deg)' },
          '100%': { transform: 'perspective(700px) rotateX(0deg)' },
        },
        ambientGlow: {
          '0%, 100%': { opacity: '0.45' },
          '50%':       { opacity: '0.75' },
        },
        rise: {
          '0%':   { transform: 'translateY(100vh) scale(0.6)', opacity: '0' },
          '8%':   { opacity: '1' },
          '92%':  { opacity: '0.4' },
          '100%': { transform: 'translateY(-120px) scale(1)', opacity: '0' },
        },
        clockIn: {
          '0%':   { opacity: '0', transform: 'translateY(50px) scale(0.92)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        flipTopLeave:    'flipTopLeave 0.25s cubic-bezier(0.4,0,1,1) forwards',
        flipBottomEnter: 'flipBottomEnter 0.25s cubic-bezier(0,0,0.6,1) 0.25s forwards',
        ambientGlow:     'ambientGlow 4s ease-in-out infinite',
        rise:            'rise linear infinite',
        clockIn:         'clockIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
      },
    },
  },
  plugins: [],
}
