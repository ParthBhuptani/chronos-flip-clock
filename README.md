# Chronos — Premium Flip Clock

A cinematic, futuristic flip-clock built with **React + Vite + Tailwind CSS + Framer Motion**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.jsx                  # Root — wires clock, tilt, layout
├── main.jsx                 # React entry point
├── index.css                # Tailwind + global keyframes
│
├── components/
│   ├── FlipCard.jsx         # Mechanical flip animation (4-panel)
│   ├── Clock.jsx            # Card layout, separator dots, controls
│   └── BackgroundEffects.jsx # Particles, grid, ambient glows
│
└── hooks/
    └── useClock.js          # Live time — seconds-aligned tick
```

## Features

| Feature | Detail |
|---|---|
| Flip animation | CSS `rotateX` — top flap out (0→-90°), bottom flap in (90→0°) |
| Live time | Tick aligned to the next whole second via `setTimeout` |
| 12 / 24 h | Toggle button, AM/PM indicator |
| Mouse tilt | Lerped 3-D `rotateX/Y` via `requestAnimationFrame` |
| Particles | 38 rising amber embers via CSS `@keyframes rise` |
| Entrance | Framer Motion spring scale + fade on mount |

## Customisation

- **Card size**: edit `W` / `H` constants at the top of `FlipCard.jsx`
- **Tilt intensity**: edit the `* -10` / `* 10` multipliers in `App.jsx → useMouseTilt`
- **Particle count**: edit `Array.from({ length: 38 }` in `BackgroundEffects.jsx`
- **Accent colour**: find `#FF8C00` / `#FFB347` and replace globally

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Framer Motion 11](https://www.framer.com/motion/)
- [Bebas Neue + Rajdhani](https://fonts.google.com/) via Google Fonts
