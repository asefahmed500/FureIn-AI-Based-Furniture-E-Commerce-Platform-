# FureIn - Furniture E-Commerce Platform

FureIn is a modern, full-stack furniture e-commerce platform built with Next.js 15, TypeScript, Tailwind CSS 4, and Prisma. It provides a rich shopping experience for furniture enthusiasts, featuring detailed product pages, category filtering, a seamless checkout process, and user/admin dashboards.

## Architecture & Tech Stack

- **Frontend:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4 & shadcn/ui
- **State Management:** Zustand (Client state), React Query (Server state inference)
- **Database:** PostgreSQL with Prisma ORM (using `@prisma/adapter-pg`)
- **Authentication:** NextAuth.js (Credentials provider with bcryptjs)
- **Components:** Modular structure with domain-specific components (auth, cart, checkout, dashboard, home, layout, product, shop)
- **Icons:** Lucide React

## Key Features

- **Storefront:** Responsive homepage, product listing with filters (material, dimensions, style), and detailed product pages.
- **Shopping Experience:** Cart management, checkout with summary, and order confirmation.
- **User Dashboard:** Order history, profile management, and wishlist.
- **Admin Dashboard:** Product management, order tracking, and basic analytics.
- **Authentication:** Secure login and registration flows.

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- PostgreSQL database

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in a `.env` file (see `.env.example` if available, or use `DATABASE_URL` and `NEXTAUTH_SECRET`).
4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
5. Push schema to your database:
   ```bash
   npx prisma db push
   ```
6. (Optional) Seed the database:
   ```bash
   npx prisma db seed
   ```

### Development

Run the development server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm run start
```

## Development Conventions

- **UI Components:** Use and extend shadcn/ui components located in `components/ui`.
- **Server Actions:** Perform data mutations using server actions located in `lib/actions/`.
- **Database Access:** Use the singleton Prisma client from `lib/prisma.ts`.
- **Type Safety:** Ensure all new code is properly typed and passes `npm run typecheck`.
- **Styling:** Adhere to the design tokens defined in `app/globals.css` and the minimal modern aesthetic described in `prd.md`.
- **Images:** High-resolution lifestyle and product images should be stored or referenced appropriately (e.g., `public/products/`).

## Project Structure

- `app/`: Next.js App Router (Pages, Layouts, APIs)
- `components/`: Reusable React components
- `hooks/`: Custom React hooks
- `lib/`: Utilities, Auth, Prisma, and Server Actions
- `prisma/`: Database schema and seeding logic
- `types/`: Global TypeScript definitions
- `public/`: Static assets (Images, Icons)

---

*This document serves as a guide for Gemini CLI interactions within this project.*
