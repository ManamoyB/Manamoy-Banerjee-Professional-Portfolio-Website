# Current State Report

## Completed Features
- `src/`-based Next.js App Router structure is in place and builds successfully.
- Public routes render successfully: `/`, `/about`, `/skills`, `/projects`, `/projects/[slug]`, `/certifications`, `/blog`, `/blog/[slug]`, `/journey`, `/gallery`, `/achievements`, `/recruiter`, `/resume`, `/contact`, `/admin`.
- TypeScript, ESLint, and production build are currently passing.
- Central fallback data exists in [src/data/fallbackData.ts](/D:/Documents/GitHub/Manamoy-Banerjee-Professional-Portfolio-Website/src/data/fallbackData.ts).
- Shared site configuration exists in [src/config/site.ts](/D:/Documents/GitHub/Manamoy-Banerjee-Professional-Portfolio-Website/src/config/site.ts).
- Supabase client and fallback-first portfolio data mapping exist in [src/lib/supabase.ts](/D:/Documents/GitHub/Manamoy-Banerjee-Professional-Portfolio-Website/src/lib/supabase.ts) and [src/lib/portfolio-data.ts](/D:/Documents/GitHub/Manamoy-Banerjee-Professional-Portfolio-Website/src/lib/portfolio-data.ts).
- Search/filter UI exists for projects, certifications, and blog listings.
- JSON-LD schema helpers exist for person, project, and blog content.
- Vercel Analytics and Speed Insights are wired in the root layout.
- Project detail pages now convert placeholder GitHub/live links into `🚧 Feature Coming Soon`.

## Incomplete Features
- Supabase storage is not currently wired into live UI flows.
- Admin dashboard is present but still generic; it has not been verified against a real Supabase project in this pass.
- MDX support is preserved, but blog rendering currently comes from Supabase-or-fallback data rather than active MDX page content.
- `src/lib/content.ts` is preserved for MDX/content support but is not currently imported.
- Root-level historical reports remain in the repo and are not a trustworthy source of current truth.

## Broken Features
- No current TypeScript, lint, or production build blockers remain.
- No broken public routes were found in the production build output.
- Placeholder project GitHub/demo links are intentionally non-functional and now surface a “coming soon” state instead of behaving like dead links.

## Duplicate Files
- Root-level historical artifacts appear to overlap in purpose and should be treated as stale documentation:
  - `AUDIT_REPORT.md`
  - `API_DOCUMENTATION.md`
  - `COMPLETION_REPORT.md`
  - `DELIVERY_SUMMARY.md`
  - `FINAL_STATUS.txt`
  - `ROUTES_VERIFICATION.md`

## Unused Files
- [src/lib/content.ts](/D:/Documents/GitHub/Manamoy-Banerjee-Professional-Portfolio-Website/src/lib/content.ts) is currently unused in imports but retained to preserve MDX/content infrastructure.

## Empty Folders
- No real empty source folders remain after cleanup.
- Dynamic route folders with bracket names are not empty; PowerShell wildcard handling can make them appear empty in naive checks.

## Build Issues
- Fixed during this pass:
  - `tsconfig.json` was still depending on stale route types from the pre-`src/` app layout.
  - [src/app/layout.tsx](/D:/Documents/GitHub/Manamoy-Banerjee-Professional-Portfolio-Website/src/app/layout.tsx) used broken `geist/font/*` imports.
- Current status:
  - `corepack npm install` passes.
  - `corepack npm run typecheck` passes.
  - `corepack npm run lint` passes.
  - `corepack npm run build` passes.

## Deployment Issues
- `npm audit --omit=dev` still reports 4 moderate vulnerabilities in the current `next`/`postcss` advisory chain.
- Supabase production readiness still depends on manual setup:
  - environment variables
  - database tables/policies
  - auth configuration
  - storage bucket setup if storage-backed uploads are required
