# Copilot Instructions

## Build, lint, and test commands

- Use **Yarn 1.x** in this repository (`packageManager` is pinned to `yarn@1.22.22`).
- Install dependencies: `yarn install`
- Start dev server: `yarn dev`
- Production build: `yarn build`
- Lint: `yarn lint`
- Preview built app: `yarn preview`
- Tests: there is currently **no test runner configured**, so there is no full-suite or single-test command.

## High-level architecture

- This is a Vite + React 18 + TypeScript single-page app. Entry point is `src/main.tsx`, and route composition is in `src/App.tsx`.
- Routing uses `react-router-dom` with three routes:
  - `/` landing page with typing intro, terminal-style about section, projects, and contact
  - `/resume` printable/downloadable resume page (`src/components/Resume.tsx`)
  - `/wedding` countdown/reveal page (`src/components/WeddingCounter/WeddingCounter.tsx`)
- Deployment behavior is split between app routing and Vercel config:
  - `vercel.json` rewrites `/(.*)` to `/` so client-side routing handles deep links.
  - `/loc/*` links are server-side redirects in `vercel.json` and should stay there (not moved into React routes).
- Content is data-driven from `src/assets/database/content.json`; components mostly render this payload rather than hardcoding copy.

## Key repository conventions

- Prefer updating `src/assets/database/content.json` for profile/about/projects/contact/resume content changes instead of editing component markup.
- `src/utils/renderAnswer.tsx` resolves special answer tokens in `about`:
  - `"<overallExperience>"` is computed from `resume.employmentHistory` via `calculateYearsOfExperience`.
  - `"<orgNow>"` resolves from the employment record with `endDate: "Present"`.
- `renderAnswer` supports specific answer shapes (`string`, `string[]`, `{ name, href }`, `{ "file-path", "file-name" }`); keep new `about` entries within these shapes unless you also extend renderer logic.
- Tailwind is configured via Vite plugin + CSS (`@tailwindcss/vite` and `src/index.css`); there is no `tailwind.config.js`.
- Resume PDF styling is maintained inline in `Resume.tsx` (`<style>` block for print/PDF output), separate from typical on-screen Tailwind utility styling.
- The wedding page’s reveal gate is a client-side base64 comparison (`BASE64_MATCH`) and should be treated as obfuscation, not authentication.
- Keep `@vercel/speed-insights` mounted on the landing route as currently wired in `App.tsx`.
