# Manamoy Personal Brand Platform

Production-ready V1 personal branding platform for Manamoy, built with Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui-style primitives, Framer Motion, and MDX content support.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui source-owned primitives
- Framer Motion
- MDX content architecture
- Vercel-compatible deployment

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env.local` from `.env.example`.

```bash
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_FORMSPREE_ENDPOINT=""
```

`NEXT_PUBLIC_FORMSPREE_ENDPOINT` is optional. If it is empty, the contact form opens a mailto draft.

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

## Structure

- `app/` routes, project/blog detail pages, metadata, sitemap, robots, OG image
- `components/` layout, sections, reusable components, shadcn/ui primitives
- `lib/` shared utilities, SEO, content helpers, V1 mock content constants
- `hooks/` client hooks
- `types/` shared TypeScript contracts
- `styles/` shared animation constants
- `content/` MDX-ready content
- `public/` brand assets

## Deployment

The app is ready for Vercel's Next.js detection. No custom `vercel.json` is required.

Default Vercel settings:

- Framework preset: Next.js
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `.next`

CLI deployment:

```bash
npm install
npm run build
npx vercel
```

Production deployment:

```bash
npx vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed URL in Vercel project environment variables. Add `NEXT_PUBLIC_FORMSPREE_ENDPOINT` only if you want Formspree submissions instead of the mailto fallback.

## V1 Features

- Home, About, Skills, Projects, Project Detail, Certifications, Resume, Contact
- Blog listing and blog detail pages
- Journey, Gallery, Achievements, and Recruiter quick-view
- Responsive sticky navigation, footer, dark/light theme, loading and error states
- Static SEO metadata, OpenGraph image route, robots, and sitemap
