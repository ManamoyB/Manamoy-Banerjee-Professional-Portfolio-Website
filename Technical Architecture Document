# Technical Architecture Document (TAD)

## Project Name

Manamoy Banerjee Professional Portfolio Website

Version: 2.0

Architecture Type: Modern JAMstack Portfolio Platform

---

# 1. Architecture Overview

The portfolio is designed as a high-performance, SEO-optimized, content-driven platform that showcases professional achievements, projects, certifications, research, and technical expertise.

Architecture Style:

Frontend-First Architecture

```text
Visitor
   ↓
Next.js Application
   ↓
Content Layer
   ↓
Supabase Database
   ↓
External Integrations
```

Goals:

* Fast Loading
* SEO Optimized
* Mobile First
* Easy Content Management
* Future Scalability
* Recruiter Friendly

---

# 2. Recommended Tech Stack

## Frontend

### Next.js 15

Purpose:

Core web framework

Why:

* Server Components
* SEO Friendly
* Static Site Generation
* Fast Performance
* Vercel Integration

---

### React 19

Purpose:

UI Development

Why:

* Component Based
* Large Ecosystem
* Excellent Developer Experience

---

### TypeScript

Purpose:

Type Safety

Why:

* Fewer Bugs
* Better Maintainability
* AI-Friendly Codebase

---

### Tailwind CSS

Purpose:

Styling

Why:

* Fast Development
* Consistent Design System
* Responsive Design

---

### Framer Motion

Purpose:

Animations

Why:

* Apple-Like Animations
* Smooth UX

---

# Backend

## Supabase

Purpose:

Backend Platform

Features:

* PostgreSQL
* Authentication
* Storage
* Row Level Security

Why:

* Fast Setup
* Free Tier
* Scalable

---

# Database

## PostgreSQL

Why:

* Relational Data
* Easy Reporting
* Mature Ecosystem

---

# Hosting

## Vercel

Purpose:

Application Hosting

Why:

* Native Next.js Support
* Automatic Deployments
* Global CDN

---

# Analytics

## Google Analytics

Purpose:

Traffic Monitoring

---

## Microsoft Clarity

Purpose:

User Behavior Analysis

---

# Email

## Resend

Purpose:

Contact Form Delivery

Why:

* Modern
* Developer Friendly

---

# 3. Project Folder Structure

```text
portfolio-website/

├── public/
│   ├── images/
│   ├── certificates/
│   ├── projects/
│   ├── resume/
│   └── favicon/

├── src/
│
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── projects/
│   ├── certifications/
│   ├── skills/
│   ├── journey/
│   ├── resume/
│   ├── blog/
│   ├── contact/
│   └── api/
│
├── components/
│   ├── layout/
│   ├── ui/
│   ├── cards/
│   ├── sections/
│   ├── forms/
│   └── animations/
│
├── data/
│   ├── projects/
│   ├── certifications/
│   ├── skills/
│   └── blog/
│
├── lib/
│   ├── supabase/
│   ├── analytics/
│   ├── seo/
│   └── utils/
│
├── hooks/
│
├── types/
│
├── styles/
│
├── docs/
│
├── tests/
│
└── scripts/
```

---

# 4. Database Schema

## Users Table

Purpose:

Admin Access

Fields:

```text
id
name
email
role
created_at
updated_at
```

---

## Projects Table

Purpose:

Store portfolio projects

Fields:

```text
id
title
slug
description
long_description
github_url
demo_url
thumbnail
featured
status
created_at
updated_at
```

---

## Project Technologies Table

Purpose:

Store project skills

Fields:

```text
id
project_id
technology_name
```

Relationship:

Many technologies belong to one project.

---

## Certifications Table

Fields:

```text
id
title
issuer
platform
issue_date
credential_url
skills
job_role
featured
created_at
```

---

## Skills Table

Fields:

```text
id
name
category
proficiency
featured
```

Examples:

* Python
* SQL
* Machine Learning
* TensorFlow

---

## Blog Posts Table

Fields:

```text
id
title
slug
content
excerpt
cover_image
published
published_at
created_at
```

---

## Journey Timeline Table

Fields:

```text
id
title
description
year
category
image
```

Examples:

* School
* Basketball
* SRM
* Certifications

---

## Contact Messages Table

Fields:

```text
id
name
email
subject
message
created_at
```

---

# 5. Database Relationships

```text
Projects
   ↓
Project Technologies

Users
   ↓
Blog Posts

Users
   ↓
Projects

Users
   ↓
Certifications
```

---

# 6. Environment Variables

## Supabase

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=
```

---

## Analytics

```env
NEXT_PUBLIC_GA_ID=
```

---

## Microsoft Clarity

```env
NEXT_PUBLIC_CLARITY_ID=
```

---

## Email

```env
RESEND_API_KEY=
```

---

## Site Configuration

```env
NEXT_PUBLIC_SITE_URL=

NEXT_PUBLIC_SITE_NAME=
```

---

# 7. Security Notes

Never expose:

```env
SUPABASE_SERVICE_ROLE_KEY

RESEND_API_KEY
```

Only use server-side.

---

# 8. SEO Architecture

Each page should contain:

```text
Title
Description
Keywords
Canonical URL
Open Graph Tags
Twitter Cards
Schema Markup
```

Generate:

* sitemap.xml
* robots.txt

Automatically.

---

# 9. Performance Requirements

Target Metrics

Performance: 95+

Accessibility: 95+

Best Practices: 100

SEO: 100

Page Load Time:

< 2 seconds

Core Web Vitals:

All Green

---

# 10. Future Scalability

Version 3.0 Features

* CMS Dashboard
* Research Portal
* GitHub Integration
* AI Portfolio Assistant
* Newsletter System
* Project Analytics
* Open Source Showcase

The architecture should support these additions without major refactoring.
