# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Next.js 16 Warning

This is NOT the Next.js you know. This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — run ESLint
- No test runner is configured yet

## Architecture

**NextRep** is a fitness tracker app (early stage) built on:

- **Next.js 16** (App Router, `src/app/`) with React 19 and React Server Components
- **TypeScript** in strict mode; path alias `@/*` maps to `src/*`
- **Tailwind CSS v4** with `@tailwindcss/postcss` — uses `@theme` syntax and CSS custom properties for theming
- **shadcn/ui** (radix-nova style, zinc base) — add components via `npx shadcn@latest add <component>`
- **next-themes** for dark/light mode (dark is default, system preference enabled)
- **React Compiler** enabled in `next.config.ts`
- **Geist** font (sans + mono) loaded via `next/font`

### Key conventions

- Use `cn()` from `@/lib/utils` to merge Tailwind classes (clsx + tailwind-merge)
- UI primitives live in `src/components/ui/` and follow the shadcn CVA pattern
- Wrapper components (e.g. ThemeProvider) live in `src/components/`
- Icons come from `lucide-react`
