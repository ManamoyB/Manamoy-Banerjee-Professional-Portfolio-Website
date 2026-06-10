# API Documentation

## Core Libraries

### Analytics (`src/lib/analytics.ts`)

Integrates with Vercel Analytics and provides custom event tracking.

#### Functions

- `trackEvent(event: AnalyticsEvent, properties?: Record<string, string>)` - Track custom analytics event
- `trackPageView(path: string, title?: string, metadata?: Record<string, unknown>)` - Track page view
- `trackProjectView(projectId: string, projectName: string)` - Track project view
- `trackBlogView(blogId: string, blogTitle: string)` - Track blog post view
- `trackSkillView(skillName: string, category: string)` - Track skill interaction
- `trackContactSubmit(method: "email" | "formspree")` - Track contact form submission
- `trackResumeDownload(fileName?: string)` - Track resume download
- `trackExternalLinkClick(url: string, platform?: string)` - Track external link clicks
- `trackCodeView(source: string, projectId?: string)` - Track code repository views
- `trackSearch(query: string, resultCount?: number)` - Track search queries
- `trackFilter(filterType: string, filterValue: string)` - Track filter/category selection
- `trackAdminLogin()` - Track admin login
- `trackAdminAction(action: "create" | "update" | "delete", table: string)` - Track admin CRUD actions
- `useAnalytics()` - Hook to automatically track page views

#### Usage Example

```typescript
import { trackProjectView, trackSearch } from "@/lib/analytics";

// Track project view
trackProjectView("proj-123", "My Cool Project");

// Track search
trackSearch("react hooks", 15);
```

---

### Supabase Storage (`src/lib/supabase-storage.ts`)

File storage management with Supabase.

#### Functions

- `uploadFile(options: UploadOptions)` - Upload file from browser
- `getStoragePublicUrl(bucket: string, filePath: string)` - Get public URL for a file
- `deleteStorageFile(bucket: string, filePath: string)` - Delete a file
- `listStorageFiles(bucket: string, path?: string)` - List files in bucket
- `uploadFileServerSide(bucket: string, filePath: string, fileContent: Buffer | Uint8Array)` - Server-side upload
- `deleteStorageFileServerSide(bucket: string, filePath: string)` - Server-side delete

#### Types

```typescript
interface UploadOptions {
  bucket: string;
  path: string;
  file: File;
  onProgress?: (progress: number) => void;
}

interface StorageFile {
  name: string;
  id?: string | null;
  updated_at?: string | null;
  metadata?: Record<string, unknown>;
  size?: number;
}
```

#### Usage Example

```typescript
import { uploadFile, getStoragePublicUrl } from "@/lib/supabase-storage";

// Upload a file
const filePath = await uploadFile({
  bucket: "portfolio-images",
  path: "projects/",
  file: imageFile,
});

if (filePath) {
  // Get public URL
  const publicUrl = getStoragePublicUrl("portfolio-images", filePath);
  console.log("File URL:", publicUrl);
}
```

---

### Search & Filtering (`src/lib/search.ts`)

Advanced search and filtering across portfolio content.

#### Functions

- `searchPortfolio(portfolioData: PortfolioData, searchTerm: string, filters?: SearchFilters)` - Search all content
- `getAvailableSkillCategories(skills: Skill[])` - Get unique skill categories
- `getAvailableProjectCategories(projects: PortfolioProject[])` - Get unique project categories
- `getAvailableTechStack(projects: PortfolioProject[])` - Get all technologies used
- `getBlogTags(blogs: BlogPost[])` - Get all blog tags
- `filterProjects(projects: PortfolioProject[], criteria: FilterCriteria)` - Filter projects
- `filterBlogsByTag(blogs: BlogPost[], tag: string)` - Filter blogs by tag
- `filterCertifications(certifications: Certification[], focus?: string)` - Filter certifications

#### Types

```typescript
type SearchCategory = "projects" | "blogs" | "skills" | "certifications" | "all";

interface SearchFilters {
  category?: SearchCategory;
  skill?: string;
  year?: number;
  status?: string;
  featured?: boolean;
}

interface SearchResult {
  item: SearchableContent;
  category: "projects" | "blogs" | "skills";
  relevance: number;
  matchedFields: string[];
}
```

#### Usage Example

```typescript
import { searchPortfolio, filterProjects } from "@/lib/search";

// Search across all content
const results = searchPortfolio(portfolioData, "react", {
  category: "projects",
});

// Filter projects
const featured = filterProjects(portfolioData.projects, {
  featured: true,
  tech: "TypeScript",
});
```

---

### Portfolio Data (`src/lib/portfolio-data.ts`)

Fetch portfolio data from Supabase with fallback to mock data.

#### Functions

- `getPortfolioData()` - Get all portfolio data
- `getProjects()` - Get all projects
- `getProject(slug: string)` - Get single project by slug
- `getBlogs()` - Get all blog posts
- `getBlogPost(slug: string)` - Get single blog post by slug

#### Features

- **Automatic Fallback**: If Supabase is not configured, uses mock data
- **Type Safety**: Full TypeScript support with type mapping
- **Error Handling**: Graceful handling of network errors

#### Usage Example

```typescript
import { getPortfolioData, getProject } from "@/lib/portfolio-data";

// Server-side data fetching (async)
const data = await getPortfolioData();
const project = await getProject("my-project");
```

---

## Components

### Admin Dashboard (`src/components/admin/admin-dashboard.tsx`)

Full CRUD interface for managing portfolio content.

#### Features

- ✅ User authentication with Supabase
- ✅ Create, Read, Update, Delete for all tables
- ✅ Support for multiple field types (text, textarea, number, checkbox, array, URL)
- ✅ Session management with automatic logout
- ✅ Table switching and record browsing
- ✅ Real-time form updates

#### Supported Tables

1. `portfolio_settings` - Profile and social links
2. `projects` - Project entries
3. `certifications` - Credentials and certificates
4. `achievements` - Awards and recognitions
5. `skills` - Technical skills with proficiency
6. `education` - Educational background
7. `experience` - Work experience
8. `blogs` - Blog articles
9. `resume_files` - Resume documents

#### Configuration

Set environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## Verification Checklist

### ✅ TypeScript & Linting

- [x] All TypeScript errors fixed
- [x] ESLint warnings resolved
- [x] Type safety enforced

### ✅ Build Status

- [x] TypeScript compilation passes
- [x] ESLint passes without errors
- [x] No unused variables

### ✅ Features Implemented

- [x] Supabase integration with fallback data
- [x] Admin Dashboard with CRUD operations
- [x] Analytics tracking system
- [x] Search and filtering utilities
- [x] File storage utilities (ready for implementation)
- [x] Dynamic routes ([slug] pages)
- [x] SEO metadata generation

### ✅ Routes Verified

- `/` - Home page
- `/about` - About section
- `/skills` - Skills showcase
- `/projects` - Projects listing
- `/projects/[slug]` - Project details
- `/blog` - Blog listing
- `/blog/[slug]` - Blog post details
- `/certifications` - Certifications
- `/achievements` - Achievements
- `/contact` - Contact form
- `/resume` - Resume page
- `/admin` - Admin dashboard

---

## Environment Configuration

Create `.env.local` file:

```bash
# Required
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional - Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Optional - Contact Form
NEXT_PUBLIC_FORMSPREE_ENDPOINT=
```

---

## Deployment Readiness

### Pre-deployment Checklist

- [ ] Set environment variables in production
- [ ] Test all routes with real Supabase data
- [ ] Verify analytics tracking is working
- [ ] Test admin dashboard functionality
- [ ] Check fallback data display
- [ ] Run security audit
- [ ] Test on production domain

### Vercel Deployment

```bash
# Install dependencies
npm install

# Run quality checks
npm run check

# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

Default Vercel settings will work without custom configuration.

---

## Troubleshooting

### Font Loading Issues

If Google Fonts fail to load (common in build containers):

- The site uses `display: swap` which provides system fonts as fallback
- This is expected in offline environments
- Will work correctly in production with internet access

### Supabase Configuration

If admin dashboard shows "Supabase is not configured":

- Check `.env.local` for Supabase credentials
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Service role key is optional but required for server-side operations

### Analytics Not Tracking

- Ensure Vercel Analytics script is loaded
- Check browser console for any network errors
- Verify deployment has internet access
