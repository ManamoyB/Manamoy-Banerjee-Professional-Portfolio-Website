# Frontend Specification Document (FSD)

## Project Name

Manamoy Banerjee Professional Portfolio Website

Version: 2.0

Design Style:
Apple × Modern SaaS × Personal Brand

Frontend Stack:

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* Framer Motion

---

# 1. Design Principles

The website should feel:

* Premium
* Minimal
* Professional
* Fast
* Clean
* Trustworthy

Every page should answer:

* Who is Manamoy?
* What can he build?
* Why should someone hire him?

---

# 2. Color System

## Primary Colors

Primary Blue

HEX:

#0071E3

Purpose:

Primary actions

Examples:

* Buttons
* Links
* CTAs

---

## Background

Pure White

HEX:

#FFFFFF

Purpose:

Main background

---

## Secondary Background

Light Gray

HEX:

#F5F5F7

Purpose:

Section backgrounds

---

## Text Primary

Near Black

HEX:

#1D1D1F

Purpose:

Main content

---

## Text Secondary

Gray

HEX:

#6E6E73

Purpose:

Supporting text

---

## Border

HEX:

#D2D2D7

Purpose:

Cards
Inputs
Dividers

---

## Success

HEX:

#34C759

Purpose:

Success states

---

## Warning

HEX:

#FF9F0A

Purpose:

Warnings

---

## Error

HEX:

#FF3B30

Purpose:

Validation errors

---

# 3. Typography System

## Primary Font

SF Pro Display

Fallback:

Inter

---

## Heading Sizes

H1

64px

Weight 700

---

H2

48px

Weight 700

---

H3

36px

Weight 600

---

H4

24px

Weight 600

---

## Body Text

18px

Weight 400

Line Height 1.7

---

## Small Text

14px

Weight 400

---

## Button Text

16px

Weight 600

---

# 4. Layout System

## Maximum Width

1440px

---

## Content Width

1280px

---

## Standard Container

```css
max-width: 1280px;
margin: auto;
padding: 0 32px;
```

---

# 5. Spacing Scale

XS

8px

---

SM

16px

---

MD

24px

---

LG

40px

---

XL

64px

---

XXL

96px

---

Section Gap

120px

---

# 6. Grid System

Desktop

12 Columns

---

Tablet

8 Columns

---

Mobile

4 Columns

---

# 7. Button Specifications

## Primary Button

Background

#0071E3

Text

#FFFFFF

Radius

999px

Padding

16px 32px

Hover

Scale 1.02

---

## Secondary Button

Background

Transparent

Border

1px solid #1D1D1F

Text

#1D1D1F

---

## Ghost Button

Background

Transparent

Text

#0071E3

---

# 8. Input Specifications

Height

56px

Radius

12px

Border

1px solid #D2D2D7

Padding

16px

Focus Border

#0071E3

Error Border

#FF3B30

---

# 9. Card Specifications

Background

#FFFFFF

Border

1px solid #E5E5E5

Radius

24px

Padding

32px

Shadow

0 10px 30px rgba(0,0,0,0.06)

Hover

TranslateY(-4px)

---

# 10. Modal Specifications

Background

#FFFFFF

Radius

32px

Width

720px

Padding

40px

Overlay

rgba(0,0,0,0.4)

Animation

Fade + Scale

---

# 11. Navigation Design

Height

80px

Position

Sticky

Background

rgba(255,255,255,0.85)

Blur

20px

---

Menu Items

Home

About

Projects

Skills

Certifications

Journey

Blog

Resume

Contact

---

# 12. Homepage Components

Hero Section

Featured Stats

Featured Project

Skills Preview

Certifications Preview

Journey Preview

Contact CTA

Footer

---

# 13. Animation Guidelines

Library:

Framer Motion

---

Allowed Animations

Fade

Slide

Scale

Reveal

Parallax

---

Avoid

Flashy effects

Rotations

Heavy particles

Unnecessary motion

---

# 14. Responsive Breakpoints

Mobile

0–767px

---

Tablet

768–1023px

---

Desktop

1024px+

---

# 15. API & Integration Specification

## Supabase

Purpose

Database

Authentication

Storage

---

Frontend Calls

Projects

GET /projects

Response

```json
[
  {
    "id": 1,
    "title": "Stock Forecasting",
    "slug": "stock-forecasting"
  }
]
```

---

Certifications

GET /certifications

Response

```json
[
  {
    "title": "IBM RAG"
  }
]
```

---

Contact Form

POST /contact

Request

```json
{
  "name": "John",
  "email": "john@email.com",
  "message": "Hello"
}
```

Response

```json
{
  "success": true
}
```

---

## Resend

Purpose

Email Delivery

---

Request

```json
{
  "to": "manamoy@email.com",
  "subject": "Portfolio Contact",
  "html": "<message>"
}
```

Response

```json
{
  "id": "email_id"
}
```

---

## Google Analytics

Purpose

Visitor Tracking

Events

* Page View
* Resume Download
* Contact Submission
* Project Click

---

## Microsoft Clarity

Purpose

User Behavior Analytics

Tracks

* Clicks
* Scrolls
* Heatmaps

---

## GitHub API

Purpose

Show GitHub Stats

Endpoint

GET /users/{username}

Response

```json
{
  "public_repos": 25,
  "followers": 50
}
```

---

# 16. SEO Specification

Every Page Requires

Title

Meta Description

Open Graph Image

Canonical URL

Schema Markup

---

Generate

sitemap.xml

robots.txt

automatically

---

# 17. Accessibility Requirements

Target

WCAG AA

Requirements

* Keyboard Navigation
* Screen Reader Support
* Focus States
* Contrast Ratio 4.5+
* Alt Text for Images

---

# 18. Performance Targets

Lighthouse

95+

Accessibility

95+

Best Practices

100

SEO

100

First Contentful Paint

< 1.5s

Largest Contentful Paint

< 2.5s

CLS

< 0.1

---

# 19. Future Integrations

Version 3.0

* AI Portfolio Assistant
* Newsletter System
* Research Portal
* GitHub Contribution Graph
* Resume Analytics Dashboard
* Project View Analytics

Current architecture must support these additions without redesign.
