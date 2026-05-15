# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **Yarn** (engines pin `yarn >=1.22`, `packageManager` is yarn@1.22.22). Do not introduce `package-lock.json`.

- `yarn dev` — Vite dev server with `--host` (LAN-accessible)
- `yarn build` — production build to `dist/` (no separate `tsc` step; Vite + SWC handle TS)
- `yarn lint` — ESLint over the repo
- `yarn preview` — serve the built `dist/` locally

There is **no test runner** configured.

## Architecture

Single-page React 18 + TypeScript app built with Vite (using `@vitejs/plugin-react-swc`, not Babel) and Tailwind v4 (via `@tailwindcss/vite`, configured in CSS — there is no `tailwind.config.js`). Deployed on Vercel.

### Routing

`react-router-dom` v7 with three routes declared in `src/App.tsx`:

- `/` — landing page (typing intro, terminal, projects, contact)
- `/resume` — printable resume page
- `/wedding` — wedding countdown page (currently hidden from nav; the nav link is commented out in `App.tsx`)

Vercel rewrites `/(.*) → /` (see `vercel.json`) so the SPA handles all unknown paths client-side. `vercel.json` also defines real server redirects under `/loc/*` (e.g. `/loc/krr`, `/loc/plni`) that point to Google Maps URLs — these are server-side and must stay in `vercel.json`, not in the React router.

### Content is data-driven from `src/assets/database/content.json`

Almost everything visible on the site — name, quick note, "about" Q&A, projects, contact links, full resume — lives in this single JSON file. To change copy, edit the JSON, not the components.

Two answer values in `content.json` are **string tokens** resolved at render time by `src/utils/renderAnswer.tsx`:

- `"<overallExperience>"` → computed total years across `resume.employmentHistory` via `calculateYearsOfExperience` (treats `endDate: "Present"` as today)
- `"<orgNow>"` → derived from the employment entry whose `endDate` is `"Present"`

`renderAnswer` also handles three answer shapes: plain string, `string[]` (rendered as a JSON-ish array), `{ name, href }` (external link), and `{ "file-path", "file-name" }` (download link). When adding new "about" entries, match one of these shapes.

### Resume page

`src/components/Resume.tsx` uses `html2pdf.js` for direct PDF generation. The on-screen Tailwind classes are mostly separate from the PDF styles which are defined in an inline `<style>` block. When tweaking PDF output, edit the styles within the `Resume` component's style tag.

### Wedding page

`src/components/WeddingCounter/WeddingCounter.tsx` is a countdown to `2026-03-05T10:04:00` (local time) with a password-gated reveal. The password check is **base64-compare in the browser** (`BASE64_MATCH = "dGhhbmdha3VuanU="`) — treat this as an obfuscated client secret, not real auth.

### Other notes

- `@vercel/speed-insights` is mounted on `/` only (in `App.tsx`).
- Fonts come from `@fontsource-variable/jetbrains-mono` and `@fontsource/rajdhani` (imported via CSS).
