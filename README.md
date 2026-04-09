# RealEstateTracker

RealEstateTracker is a modern property operations dashboard built with React, TypeScript, and Supabase.
It is structured with a feature-first architecture, production-minded developer tooling, and a clean UI system based on Tailwind + shadcn primitives.

## Why This Project

This application focuses on practical day-to-day workflows for small and mid-size property portfolios:

- Manage properties and related entities in a clear, task-oriented interface.
- Keep feature logic maintainable through focused modules.
- Prioritize readability and velocity over premature abstraction.

## Tech Stack

- Frontend: React 19, TypeScript, Vite
- Data + Auth: Supabase
- State + Data Fetching: TanStack Query
- Routing: TanStack Router
- UI: Tailwind CSS, shadcn/ui primitives, Sonner
- Tooling: ESLint, TypeScript project references
- Runtime/Package Manager: Bun

## Architecture Overview

The codebase follows a feature-based folder structure.
Each feature owns its API access, actions, hooks, types, and UI components.

### High-level shape

```text
src/
	app/
	components/
		layout/
		ui/
	features/
		auth/
		managers/
		properties/
		tenants/
	lib/
	pages/
	routes/
```

### Design principles

- Feature isolation: domain logic stays inside each feature folder.
- Explicit boundaries: `api`, `actions`, `hooks`, and `components` are separated.
- Pragmatic UI composition: focused tables per feature where useful.
- Type-safe by default: interfaces represent API contracts and view models.

## Local Development

### 1) Prerequisites

- Bun >= 1.0
- Node.js >= 20 (recommended fallback runtime)
- A Supabase project with matching tables/storage buckets

### 2) Environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

### 3) Install dependencies

```bash
bun install
```

### 4) Start dev server

```bash
bun run dev
```

Default Vite URL: `http://localhost:5173`

## Scripts

- `bun run dev`: Start development server
- `bun run build`: Type-check and create production build
- `bun run lint`: Run ESLint checks
- `bun run preview`: Preview production build locally

## Current Feature Surface

- Authentication flows (login/signup/logout)
- Property listing and creation flows
- Manager listing and creation flows
- Property-related document links (insurance/contract)

## Code Quality Notes

- Strictly modular feature boundaries keep changes localized.
- Query hooks and action functions are intentionally separated.
- UI behavior favors clarity and predictable rendering.

## Deployment Notes

This is a Vite SPA and can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, S3 + CDN) once environment variables are configured.

## Roadmap

- Add edit/delete workflows for properties and managers
- Introduce role-based access control in Supabase policies
- Add integration and end-to-end tests for key flows
- Reintroduce reusable table abstractions only after UX patterns stabilize

## License

This project is licensed under the **RealEstateTracker Non-Commercial + No-AI License v1.0**.

Summary:

- Contributions are welcome.
- Commercial use is not allowed without written permission.
- AI/ML training or model-development use is not allowed without written permission.
- Attribution to Alex Besse Donato is required.

See [LICENSE](LICENSE), [NOTICE](NOTICE), and [CONTRIBUTING.md](CONTRIBUTING.md) for full terms.
