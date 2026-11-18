# GRÜN Website

Japanese-first, English-option website for GRÜN Arabic Shisha & Silk Road Kissa in Kyoto.

The site now uses React, TypeScript, Vite, Tailwind CSS v4, and a shadcn-style component layout (`src/components/ui/`). It adapts the Cairn landing-page template's scenic hero, floating conversation card, editorial sections, and restrained motion to GRÜN's brand rather than retaining the original AI-product copy.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`; preview it with `npm run preview`.

## Brand links and content

- Main page component: `src/components/ui/grun-landing.tsx`
- Japanese and English copy: `words` in that component
- Brand color: Matt Imperial Green `#156125` in `src/index.css`
- Instagram: `https://www.instagram.com/grun.kyoto/`
- Google Maps link and venue photos remain linked from the repository assets.

Confirm opening hours and current menu with the shop before publishing.
