# Manual Actions Required

## Supabase
- Create or verify the expected tables:
  - `portfolio_settings`
  - `projects`
  - `certifications`
  - `achievements`
  - `skills`
  - `education`
  - `experience`
  - `blogs`
  - `resume_files`
  - `contact_messages`
- Create an admin user for Supabase Auth so `/admin` can be used.
- Configure any RLS policies required for public reads and admin writes.

## Environment Variables
- Populate:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_FORMSPREE_ENDPOINT`

## Content
- Replace fallback placeholder project GitHub/live links with real URLs where available.
- Add a real resume file URL if you want direct resume download instead of `Request PDF`.
- Add any missing social links such as LeetCode if you want them exposed publicly.

## Admin / Storage
- If you want file uploads in the admin UI, storage integration still needs to be implemented or reintroduced against live Supabase buckets.

## Security / Maintenance
- Review the remaining 4 moderate `npm audit` findings and decide whether to accept the current advisory state or plan a dependency update cycle.
