# AGENTS.md — FureIn (Furniture E-Commerce)

## Commands

```bash
npm run dev          # Next.js dev with Turbopack
npm run build        # Production build
npm run lint         # ESLint (next/core-web-vitals + typescript)
npm run typecheck    # tsc --noEmit
npm run test         # Vitest (unit/integration, jsdom)
npm run test:watch   # Vitest watch mode
npm run test:e2e     # Playwright (chromium only, starts dev server)
npm run format       # Prettier (writes in-place)
```

Run order before committing: `lint` -> `typecheck` -> `test`
Run single test: `npx vitest run __tests__/path/to/file.test.ts`

## Prisma (v7 with @prisma/adapter-pg)

- Client output is **non-default**: `generated/prisma/` (gitignored, regenerated)
- Import from `@/generated/prisma/client`, **never** `@prisma/client`
- Singleton only: `import prisma from "@/lib/prisma"` — never instantiate `PrismaClient` elsewhere
- Generator: `provider = "prisma-client"` (v7 syntax, not `prisma-client-js`)
- Config: `prisma.config.ts` (v7 `defineConfig` format, loads env via `dotenv/config`)
- After schema changes: `npx prisma generate` then `npx prisma db push` (no migration files)
- Seed: `npx prisma db seed` (runs `tsx prisma/seed.ts`)
- Monetary fields use `Decimal` (`@db.Decimal(10,2)` / `@db.Decimal(12,2)`), **not** `Float`. Always wrap with `Number()` before arithmetic or string interpolation

## Architecture

- **App Router** with Server Components. Root layout: `ThemeProvider > AuthProvider > TooltipProvider`
- **Server Actions** (`"use server"`) in `lib/actions/` for all mutations. Only API route is `app/api/auth/[...nextauth]/route.ts` (NextAuth)
- **Client state**: Zustand in `lib/store.ts` — `useCartStore` (persisted as `furein-cart-storage`) and `useUserStore`
- **Auth**: NextAuth v4, Credentials provider, JWT strategy. Token carries `id` + `role`. Use `useSession` (client) or `getServerSession(authOptions)` (server)
- **Middleware**: `middleware.ts` guards `/admin/*` (ADMIN role) and `/dashboard/*` (authenticated). Server actions do NOT pass through middleware — they must check auth independently
- **DB roles**: enum `Role { USER, ADMIN }` — enum `OrderStatus { PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED }`
- **Env validation**: `lib/env.ts` validates `DATABASE_URL`, `NEXTAUTH_SECRET` (min 32 chars), `NEXTAUTH_URL` at startup. `.env.example` documents required vars
- **Guest checkout**: `createOrder` allows `session = null` (guest orders with `userId: null`). Rate-limited per IP (5/min). Server recalculates prices from DB, ignores client-supplied totals
- **Suspended users**: `lib/auth.ts` `authorize()` checks `isSuspended` — blocked at login, not at middleware

## Critical Gotchas

- **Decimal fields**: `Product.price`, `Product.originalPrice`, `Order.total`, `OrderItem.price` are all `Decimal`. Always `Number(field)` before math, comparison, `.toFixed()`, `.toLocaleString()`, or template literals. Zustand `addItem` already converts via `Number(product.price)`
- **Server actions are the auth boundary**: Middleware only covers page routes. Every mutation in `lib/actions/` calls `getServerSession(authOptions)` — this is the real guard
- **Error/loading files exist**: `app/error.tsx`, `app/not-found.tsx`, `app/loading.tsx`, plus route-specific ones under `admin/`, `dashboard/`, `shop/`, `product/[slug]/`, `cart/`, `checkout/`
- **No audit logging**: No audit trail for state changes. Future work needed.
- **`prisma as any`**: Required in `lib/auth.ts` for NextAuth PrismaAdapter (v7 client type mismatch)

## Path Aliases

`@/*` maps to project root (`./`).

## shadcn/ui

- Preset: `radix-nova`, RSC enabled. Components in `components/ui/`
- Add via `npx shadcn@latest add <name>`, utility: `cn()` from `@/lib/utils`

## Code Style

No semicolons, double quotes, 2-space indent, trailing commas (es5). Prettier auto-sorts Tailwind classes (`prettier-plugin-tailwindcss`, stylesheet: `app/globals.css`).

## Testing

- **Unit/integration**: Vitest + jsdom + React Testing Library. Setup mocks `ResizeObserver`. Tests in `__tests__/`
- **E2E**: Playwright, dir `e2e/`, chromium only. Auto-starts dev server, `baseURL: http://localhost:3000`. 120s timeout, retries in CI only
- Test mocks for order.ts must include `mockTx.product.findMany` and `mockTx.product.update` (server-side price verification). `paymentMethod` must be `"card"`, `"paypal"`, or `"crypto"` (Zod enum validated)
- `headers` must be mocked: `vi.mock("next/headers", () => ({ headers: vi.fn().mockResolvedValue(new Map()) }))`

## Key Directories

| Dir | Purpose |
|---|---|
| `app/(auth)/` | Auth pages (login, register, forgot-password) — separate layout |
| `app/admin/` | Admin dashboard (role-guarded) |
| `app/dashboard/` | User dashboard (auth-guarded) |
| `components/` | Domain-organized: auth, cart, checkout, home, product, layout, admin, shop |
| `lib/actions/` | Server actions (auth, cart, order, product, user, analytics) |
| `lib/env.ts` | Runtime env validation (Zod) |
| `generated/prisma/` | Prisma output (gitignored, regenerated by `prisma generate`) |

## Deployment

- **Platform**: Vercel
- **Database**: PostgreSQL (via `@prisma/adapter-pg` + `pg` Pool)
- **Config**: `next.config.mjs` (ESM, not `.ts`)
- **Required env vars on Vercel**: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (auto-set by Vercel)
- **Images**: Remote patterns configured for `images.unsplash.com` in `next.config.mjs`
