# Final Structure

## Source Tree
```text
src/
  app/
    about/
    achievements/
    admin/
    blog/
      [slug]/
    certifications/
    contact/
    gallery/
    journey/
    projects/
      [slug]/
    recruiter/
    resume/
    skills/
    error.tsx
    globals.css
    layout.tsx
    loading.tsx
    not-found.tsx
    opengraph-image.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    admin/
    common/
    layout/
    motion/
    providers/
    sections/
    ui/
  config/
    analytics.ts
    navigation.ts
    project-categories.ts
    site.ts
    socials.ts
    theme.ts
  content/
    profile/
      about.mdx
  data/
    fallbackData.ts
  hooks/
    use-mounted.ts
  lib/
    analytics.ts
    content.ts
    portfolio-data.ts
    schema.ts
    seo.ts
    supabase.ts
    utils.ts
  styles/
    animation.ts
  types/
    index.ts
  utils/
    links.ts
```

## Notes
- Public route structure is preserved.
- MDX support is still present through `src/content` and `mdx-components.tsx`.
- `/admin` remains part of the app structure.
- The source tree is down to 74 tracked files under `src`.
