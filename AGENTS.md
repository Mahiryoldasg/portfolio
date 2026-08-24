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
