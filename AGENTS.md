# AGENTS.md

Instructions for AI coding agents working in this project.

## What this is

A personal portfolio site.

## Stack

- Next.js (App Router) + React + TypeScript (strict mode)
- Tailwind CSS v4 - CSS-first config in `app/globals.css`, no `tailwind.config.js`
- ESLint (flat config)
- npm as the package manager
- No `src/` directory; the app router lives at the project root (`app/`)

## Conventions

- Functional components only; server components by default, `'use client'`
  only for interactivity, hooks, or browser APIs
- Components: PascalCase; functions: camelCase; types/interfaces: PascalCase
- Tailwind utility classes for styling, no inline styles
- Strict TypeScript, no `any`

## Commands

- Dev server: `npm run dev` (http://localhost:3000)
- Build: `npm run build`
- Production server: `npm run start`
- Lint: `npm run lint`

Testing is opt-in. This project does not currently have a unit test runner, so
no test command is required before committing.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
