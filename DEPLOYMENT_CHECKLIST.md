# Deployment Checklist

## Current Readiness
- Vercel-compatible Next.js App Router build: ready
- TypeScript: passing
- ESLint: passing
- Production build: passing
- Fallback-first public data rendering without Supabase env vars: present

## Required Environment Variables
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT`

## Before Vercel Deployment
- Set all required environment variables in Vercel.
- Point `NEXT_PUBLIC_SITE_URL` to the production domain.
- Confirm Supabase database schema matches the current data-access expectations.
- Confirm Supabase Auth has an admin user for `/admin`.
- If using storage-backed uploads later, create the expected storage buckets in Supabase.
- Add a real resume URL if you want direct resume download rather than the email fallback.
- Replace placeholder project GitHub/live links where real destinations exist.

## Verified In This Pass
- App routes compile successfully.
- Metadata, robots, sitemap, and OpenGraph route build successfully.
- `/admin` is part of the build output.
- Contact form fallback logic compiles successfully.

## Not Fully Verified In This Pass
- Live Supabase authentication against a real project
- Live CRUD behavior against real tables
- Live storage uploads
- Browser-level Lighthouse run

## Open Deployment Concern
- `npm audit --omit=dev` reports 4 moderate vulnerabilities tied to the current `next`/`postcss` advisory chain.
