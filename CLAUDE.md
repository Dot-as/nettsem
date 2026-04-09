# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is this

Nettsem (earlier "Nettsmed") is a landing page for a Norwegian web design agency targeting small businesses. It's a static site (no build step, no framework) with a Supabase backend for lead capture.

## Architecture

- **`index.html`** — Main production landing page (includes Meta Pixel, before/after toggle, onboarding wizard, screenshot carousels)
- **`index-v2.html`** — Earlier/alternate version of the landing page (simpler, no wizard, uses "Nettsmed" branding)
- **`admin.html`** — Lead management dashboard (reads/updates leads from Supabase, has realtime subscription)
- **`style.css`** — All styling for `index.html` (CSS custom properties in `:root`, no preprocessor)
- **`script.js`** — All JS for `index.html` (scroll effects, wizard logic, carousels, before/after slider)
- **`supabase-config.js`** — Supabase URL + anon key (imported by both `index.html` and `admin.html`)

## Key patterns

- **No build system.** Plain HTML/CSS/JS. Open `index.html` in browser or serve with any static server.
- **Supabase loaded via CDN** (`@supabase/supabase-js@2` from jsdelivr). No npm/node dependencies.
- **Onboarding wizard** in `script.js` collects lead data (5 steps) and inserts into Supabase `leads` table.
- **Before/After toggle** lets visitors switch between an "ugly" version and the real site to demonstrate value.
- **Design tokens** are CSS custom properties: `--accent: #D42B2B`, `--bg: #FAF8F5`, fonts are Instrument Serif (headings) + DM Sans (body).
- **Scroll-driven animations:** progress bar, nav state change, counter animation, staggered card reveals, kinetic typography — all in the single scroll listener in `script.js`.

## Supabase

- Project ID: `yxqyfrhzfkspsjcinhcf`
- Single table: `leads` (see `supabase/migrations/20260320_create_leads.sql`)
- RLS is open (anon insert/select/update) — admin.html reads and updates leads directly with the anon key.

## Development

No build or install needed. Just serve the files:
```bash
npx serve .
# or open index.html directly in a browser
```

## Language

All user-facing content is in Norwegian (bokmål). Keep all text, labels, and copy in Norwegian.
