# Rentaly

Rentaly is a property operations dashboard for landlords and small portfolio owners. Track properties, tenants, managers, and finances in one place — built with React, TypeScript, and Supabase.

Logged-out visitors see a marketing landing page. Authenticated users get a dashboard with property tables, financial summaries, and management flows for tenants and property managers.

## Features

- **Landing page** — hero, feature overview, how-it-works, and sign-up CTAs for unauthenticated users
- **Properties** — list properties with rent, mortgage, manager, and tenant info; upload insurance and contract documents
- **Financial overview** — total rent, total mortgage, and net income across the portfolio (via Supabase RPC)
- **Managers** — track property managers with company and contact details
- **Tenants** — manage tenants and link them to properties
- **Authentication** — email login, sign-up, and logout with session-aware UI

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Routing | TanStack Router |
| Data fetching | TanStack Query |
| Auth state | Supabase Auth + Nanostores |
| Backend | Supabase (Postgres, Storage, RPC) |
| UI | Tailwind CSS, shadcn/ui, Lucide icons, Sonner |
| Package manager | pnpm |

## Project Structure

```text
src/
├── app/                    # App shell (QueryClientProvider, router)
├── components/
│   ├── layout/             # NavigationBar, MainLayout, AuthMenu, etc.
│   └── ui/                 # shadcn primitives (Button, Card, Table, …)
├── features/
│   ├── auth/
│   │   ├── api/            # Supabase auth I/O
│   │   ├── hooks/mutations.ts
│   │   ├── store/          # $auth nanostore
│   │   ├── pages/          # LoginPage, SignUpPage
│   │   └── components/
│   ├── properties/
│   │   ├── api/
│   │   ├── hooks/          # queries + usePropertiesList
│   │   ├── pages/          # AddPropertyPage
│   │   ├── components/
│   │   ├── constants/
│   │   └── utils/
│   ├── managers/
│   ├── tenants/
│   └── financials/
├── pages/
│   ├── dashboard/          # Auth-gated dashboard shell
│   └── landing/            # Marketing page + DashboardPreview
├── routes/                 # TanStack Router route tree
├── lib/                    # supabaseClient, utils
└── utils/
```

### Architecture conventions

Each feature follows a consistent, folder-based layout:

```
features/{name}/
├── api/{name}.ts           # Pure Supabase I/O (no React)
├── hooks/queries.ts        # useXQuery + useAddXMutation
├── hooks/mutations.ts      # Auth only (login / signup / logout)
├── hooks/use{X}List.ts     # Screen-level hooks when needed
├── components/             # Feature UI (lists, forms, buttons)
├── pages/                  # Route-level screens
├── constants/              # Query keys, select strings
├── types.ts
└── utils/                  # Optional helpers (e.g. file upload paths)
```

**Key rules:**

- `api/` handles all Supabase reads and writes
- React Query hooks live in `hooks/queries.ts` (and `hooks/mutations.ts` for auth)
- Route screens live inside `features/{name}/pages/`
- Auth session is stored in a Nanostore (`$auth`), not React Query
- `pages/` holds cross-feature shells (dashboard, landing) — not feature logic

## Routes

| Path | Screen |
|---|---|
| `/` | Dashboard (landing page when logged out) |
| `/login` | Login |
| `/signup` | Sign up |
| `/add-property` | Add property form |
| `/add-manager` | Add manager form |
| `/add-tenant` | Add tenant form |

## Local Development

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- A Supabase project with matching tables, storage buckets, and RPC functions

### Environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

### Install and run

```bash
pnpm install
pnpm run dev
```

Dev server: `http://localhost:5173`

### Scripts

| Command | Description |
|---|---|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Type-check and create production build |
| `pnpm run preview` | Preview production build locally |
| `pnpm run lint` | Run ESLint |

## Deployment (Vercel)

This is a Vite SPA, deploy to Vercel (or any static host) with the environment variables above configured in the hosting dashboard.

**Vercel settings:**

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `pnpm run build` |
| Output Directory | `dist` |
| Install Command | `pnpm install` |

**Environment variables** (set in Vercel → Settings → Environment Variables):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

**SPA routing** — add a `vercel.json` at the project root so client-side routes work on refresh:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Supabase auth** — in your Supabase dashboard (Authentication → URL Configuration), set:

- **Site URL** → your production URL (e.g. `https://your-app.vercel.app`)
- **Redirect URLs** → same URL + `http://localhost:5173`

After pushing to `main`, Vercel auto-deploys. Confirm the latest deployment commit matches your local `main` branch.

## Roadmap

- Edit/delete workflows for properties, managers, and tenants
- Role-based access control via Supabase RLS policies
- Query `enabled` guards tied to auth status across all features
- Integration and end-to-end tests for key flows

## License

This project is licensed under the **Rentaly Non-Commercial + No-AI License v1.0**.

Summary:

- Contributions are welcome
- Commercial use is not allowed without written permission
- AI/ML training or model-development use is not allowed without written permission
- Attribution to Alex Besse Donato is required

See [LICENSE](LICENSE), [NOTICE](NOTICE), and [CONTRIBUTING.md](CONTRIBUTING.md) for full terms.
