# FureIn - Furniture E-Commerce Platform

FureIn is a modern, high-performance, full-stack furniture e-commerce platform built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, and **Prisma**. It is designed to provide an immersive shopping experience with detailed product information, material-focused filters, and a seamless flow from discovery to checkout.

## 🚀 Architecture & Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components, Server Actions)
- **Styling:** Tailwind CSS 4 with `shadcn/ui` components.
- **Database:** PostgreSQL with Prisma ORM (utilizing `@prisma/adapter-pg` for optimal connection pooling).
- **Authentication:** NextAuth.js (Credentials provider with `bcryptjs` for secure hashing).
- **State Management:**
  - **Client State:** Zustand (`lib/store.ts`) for cart management and user session persistence.
  - **Server State:** Managed via Next.js Data Fetching and Server Actions.
- **Icons:** Lucide React
- **Validation:** Zod (used extensively in forms and API schemas).
- **Testing:**
  - **Unit/Integration:** Vitest & React Testing Library.
  - **End-to-End:** Playwright.

## 📁 Project Structure

- `app/`: Next.js App Router (Routes, Layouts, and API endpoints).
- `components/`:
  - `auth/`: Login, Registration, and Auth-related components.
  - `cart/`: Cart items, summary, and empty state.
  - `checkout/`: Form handling, payment, and success screens.
  - `home/`: Featured sections, hero, and promotional banners.
  - `product/`: Galleries, info tabs, and dimension widgets.
  - `layout/`: Navbar, Footer, and global navigation.
  - `ui/`: Base components from `shadcn/ui`.
- `lib/`:
  - `actions/`: Server Actions for data mutations (auth, cart, order, product).
  - `auth.ts`: NextAuth configuration and providers.
  - `prisma.ts`: Singleton Prisma client setup with PG adapter.
  - `store.ts`: Zustand store definitions for Cart and User.
  - `utils.ts`: Tailwind merge and general utility functions.
- `prisma/`:
  - `schema.prisma`: Database schema definition.
  - `seed.ts`: Script for populating the database with initial furniture data.
- `generated/prisma/`: Custom output path for the Prisma Client.
- `public/`: Static assets, including product images (`/products/`) and category icons.

## 🗺️ Information Architecture (Main Routes)

- `/`: Homepage (Hero, Trending, Best Sellers)
- `/shop`: All Products Listing (with Material, Style, and Dimension filters)
- `/shop/[category]`: Filtered products by category (e.g., Sofas, Tables)
- `/product/[slug]`: Detailed product page (Gallery, Specs, Dimensions, Reviews)
- `/cart`: Shopping cart summary and management
- `/checkout`: Multi-step checkout process
- `/auth/login` | `/auth/register`: Authentication flows
- `/dashboard`: User profile, order history, and wishlist
- `/admin`: Administrative panel for products, orders, and analytics

## 🛠️ Key Commands

| Task | Command |
| :--- | :--- |
| **Development** | `npm run dev` |
| **Build** | `npm run build` |
| **Start Production** | `npm run start` |
| **Linting** | `npm run lint` |
| **Type Checking** | `npm run typecheck` |
| **Unit Tests** | `npm run test` |
| **E2E Tests** | `npm run test:e2e` |
| **Format Code** | `npm run format` |
| **Prisma Generate** | `npx prisma generate` |
| **Prisma DB Push** | `npx prisma db push` |
| **Database Seed** | `npx prisma db seed` |

## 📐 Development Conventions

- **Surgical Edits:** Use the `replace` tool for targeted changes. Ensure context is sufficient for unambiguous matching.
- **Server Actions:** Always use Server Actions (`lib/actions/`) for data mutations. Client components should call these actions rather than hitting API routes directly where possible.
- **Type Safety:** Leverage Zod schemas for both client-side form validation and server-side action inputs.
- **UI Components:** Do not reinvent the wheel. Use and extend existing `shadcn/ui` components in `components/ui`.
- **Database Access:** Always import `prisma` from `@/lib/prisma`. Do not instantiate `PrismaClient` elsewhere.
- **Styling:** Follow the "FureIn" design tokens:
  - Radius: `1rem` (`--radius`)
  - Primary Font: "DM Sans" (Headings)
  - Colors: Warm walnut primary, amber accents, and off-white backgrounds as defined in `app/globals.css`.
- **Testing Requirements:** Every new feature or bug fix must be accompanied by relevant tests (Vitest for logic, Playwright for critical user flows like checkout).

## 🗃️ Data Model Highlights

- **Product:** Includes `Json` fields for `dimensions`, `variants`, and `colors` to handle furniture-specific variability.
- **User:** Roles (`USER`, `ADMIN`) define access to dashboards.
- **Order:** Tracks status (`PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`).
- **Review:** Supports user-submitted images to build trust.

---
*This document serves as the primary instructional context for Gemini CLI interactions. Adhere strictly to these patterns.*
