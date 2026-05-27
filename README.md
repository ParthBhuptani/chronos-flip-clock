<div align="center">

# ◈ Chronos ◈

**A cinematic, dark-themed flip clock built with React + Vite + Tailwind CSS**

[![Live Demo](https://img.shields.io/badge/Live_Demo-chronos--flip--clock.vercel.app-FF8C00?style=flat-square&logo=vercel&logoColor=white)](https://chronos-flip-clock.vercel.app/)
&nbsp;
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-EF476F?style=flat-square&logo=framer&logoColor=white)

<br />

> Inspired by mechanical split-flap displays — Chronos renders hours, minutes, and seconds as flip cards with 3D tilt, amber ember particles, and silky spring animations.

</div>

---

## ✨ Features

| Feature | Detail |
|---|---|
| 🃏 **Flip animation** | 4-panel `rotateX` mechanic — top flap folds out, bottom folds in |
| ⏱ **Live time** | Tick aligned to the next whole second — no drift |
| 🔄 **12 / 24 h toggle** | One-click format switch with AM / PM indicator |
| 🖱 **Mouse tilt** | Lerped 3D `rotateX/Y` via `requestAnimationFrame` for a parallax feel |
| 🔥 **Particle effects** | 38 rising amber embers via CSS `@keyframes rise` |
| 🎬 **Entrance animation** | Framer Motion spring scale + fade on first mount |
| ✦ **Hover lift** | Each card subtly lifts and brightens on hover |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm

### Run locally

    # Clone the repo
    git clone https://github.com/ParthBhuptani/chronos-flip-clock.git

    # Enter the folder
    cd chronos-flip-clock

    # Install dependencies
    npm install

    # Start dev server
    npm run dev

Open [http://localhost:5173](http://localhost:5173) — the clock is live.

### Build for production

    npm run build     # outputs to /dist
    npm run preview   # preview the build locally

---

## 🗂 Project Structure

    chronos-flip-clock/
    ├── public/
    │   └── favicon.svg
    ├── src/
    │   ├── App.jsx                    # Root — wires clock, mouse tilt, layout
    │   ├── main.jsx                   # React entry point
    │   ├── index.css                  # Tailwind + global @keyframes
    │   ├── components/
    │   │   ├── FlipCard.jsx           # 4-panel flip animation
    │   │   ├── Clock.jsx              # Card layout, separators, controls
    │   │   └── BackgroundEffects.jsx  # Ember particles, grid, ambient glows
    │   └── hooks/
    │       └── useClock.js            # Second-aligned live tick
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json

---

## 🎨 Customisation

| What | Where |
|---|---|
| Card size | `W` / `H` at the top of `FlipCard.jsx` |
| Tilt intensity | `* -10` / `* 10` multipliers in `useMouseTilt` → `App.jsx` |
| Particle count | `Array.from({ length: 38 })` in `BackgroundEffects.jsx` |
| Flip speed | `520` ms timeout + matching CSS durations in `FlipCard.jsx` |
| Accent colour | Find `#FF8C00` / `#FFB347` and replace globally |

---

## 🧰 Tech Stack

| Library | Purpose |
|---|---|
| [React 18](https://react.dev/) | Component model & hooks |
| [Vite 5](https://vitejs.dev/) | Dev server & bundler |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion 11](https://www.framer.com/motion/) | Spring animations & transitions |
| [Bebas Neue + Rajdhani](https://fonts.google.com/) | Clock numerals & labels |

---

## ☁️ Deployment

Hosted on **Vercel** — [chronos-flip-clock.vercel.app](https://chronos-flip-clock.vercel.app/)

To deploy your own fork:

1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — hit **Deploy** ✅

Or on **Netlify**: build command `npm run build`, publish directory `dist`.

---

## 📄 License

Released under the [MIT License](LICENSE). Free to use, fork, and build on.

---

<div align="center">
  Made by <a href="https://github.com/ParthBhuptani">Parth Bhuptani</a>
</div>
