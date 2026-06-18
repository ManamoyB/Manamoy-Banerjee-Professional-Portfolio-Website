# Security & Access Control Document (SACD)

## Project Name

Manamoy Banerjee Professional Portfolio Website

Version: 2.0

Document Owner: Security Architecture

---

# 1. Security Philosophy

The portfolio is a public-facing website.

Most visitors should be able to view content without creating an account.

Only the website owner (Manamoy) should have permission to create, edit, or delete content.

Primary Security Goals:

* Protect admin access
* Protect contact form submissions
* Prevent spam
* Prevent unauthorized content modification
* Protect API keys and secrets
* Protect future admin dashboard

---

# 2. Authentication Method

## Recommended Method

Supabase Authentication

Authentication Type:

Google OAuth + Magic Link

Why:

* No passwords to manage
* Secure by default
* Easy login experience
* Less risk of password theft

---

## Login Flow

Admin clicks Login

↓

Google Sign-In

OR

Magic Link Email

↓

Supabase verifies identity

↓

Admin Dashboard Access Granted

---

## Not Recommended

Avoid:

* Username/password systems
* Custom authentication
* Storing passwords manually

Reason:

Adds unnecessary security risk.

---

# 3. User Roles

## Guest

Description:

Anyone visiting the website.

Authentication Required:

No

Can:

* View homepage
* View projects
* View certifications
* View blog posts
* Download resume
* Submit contact form

Cannot:

* Edit content
* Access dashboard
* Delete data
* View private analytics

---

## Admin

Description:

Website Owner

Authentication Required:

Yes

Can:

* Create projects
* Edit projects
* Delete projects
* Publish blogs
* Manage certifications
* Manage skills
* View contact submissions
* View analytics

Cannot:

* Access service keys directly
* Bypass security policies

---

# 4. Permission Matrix

```text id="0nb2l4"
Feature                 Guest   Admin

View Website              ✓       ✓
View Projects             ✓       ✓
View Certifications       ✓       ✓
View Blog                 ✓       ✓
Download Resume           ✓       ✓
Submit Contact Form       ✓       ✓

Manage Projects           ✗       ✓
Manage Blog               ✗       ✓
Manage Skills             ✗       ✓
Manage Timeline           ✗       ✓
View Dashboard            ✗       ✓
View Messages             ✗       ✓
Delete Content            ✗       ✓
```

---

# 5. Database Security

## Row-Level Security (RLS)

Enable RLS on every table.

Default Rule:

Deny Everything

Allow only what is explicitly permitted.

---

## Projects Table

Guest:

Read Only

Admin:

Full Access

Policy:

Anyone may view projects.

Only admin may create, update, or delete projects.

---

## Certifications Table

Guest:

Read Only

Admin:

Full Access

Policy:

Public viewing allowed.

Editing restricted to admin.

---

## Skills Table

Guest:

Read Only

Admin:

Full Access

Policy:

Public viewing allowed.

Editing restricted to admin.

---

## Blog Posts Table

Guest:

Read Published Posts Only

Admin:

Full Access

Policy:

Unpublished drafts remain hidden.

---

## Contact Messages Table

Guest:

Create Only

Admin:

Read Only

Policy:

Visitors can submit messages.

Visitors cannot read any messages.

Only admin can view messages.

---

## Analytics Table

Guest:

No Access

Admin:

Read Access

Policy:

Analytics data is private.

---

# 6. API Security Rules

## Public APIs

Allowed:

* Project Listing
* Certifications
* Skills
* Blog Content

Rate Limit:

100 requests per minute per IP

---

## Protected APIs

Require Authentication:

* Dashboard
* Content Management
* Message Management

---

## Secret Keys

Never expose:

```env id="56azva"
SUPABASE_SERVICE_ROLE_KEY

RESEND_API_KEY

GOOGLE_CLIENT_SECRET
```

Server-side only.

Never sent to browser.

---

# 7. Contact Form Security

## Validation

Required Fields:

* Name
* Email
* Message

---

## Spam Protection

Use:

* Cloudflare Turnstile
  OR
* Google reCAPTCHA

---

## Input Limits

Name:

100 characters

Email:

254 characters

Message:

2000 characters

---

## Sanitization

Remove:

* Scripts
* HTML Injection
* Malicious Content

Prevent:

* XSS Attacks
* Spam Links

---

# 8. Error Handling Guide

## Login Failure

Cause:

Authentication failed.

User Message:

"Unable to sign in. Please try again."

Log:

Store technical error in server logs.

---

## Session Expired

Cause:

User inactive too long.

User Message:

"Your session has expired. Please sign in again."

Action:

Redirect to login page.

---

## Database Failure

Cause:

Database unavailable.

User Message:

"Service temporarily unavailable. Please try again later."

Action:

Retry automatically.

---

## Contact Form Failure

Cause:

Email service unavailable.

User Message:

"Message could not be sent. Please try again."

Action:

Store message in database queue.

Retry later.

---

## Missing Page

Cause:

Invalid URL

User Message:

Custom 404 Page

Show:

* Return Home
* View Projects
* Contact

---

## Network Failure

Cause:

Poor internet connection

User Message:

"Connection issue detected. Please check your internet connection."

Action:

Allow retry.

---

# 9. Logging Strategy

Log:

* Authentication events
* Failed login attempts
* Contact submissions
* Content updates
* Dashboard access

Do Not Log:

* Passwords
* Secret keys
* Personal messages in plaintext logs

---

# 10. Edge Cases

## Empty Form Submission

Action:

Block submission

Show validation message.

---

## Invalid Email

Action:

Reject

Prompt correction.

---

## Duplicate Contact Submission

Action:

Detect spam

Throttle repeated submissions.

---

## User Refreshes During Submission

Action:

Prevent duplicate records.

---

## Very Slow Internet

Action:

Show loading state.

Allow retry.

---

## Unauthorized Dashboard Access

Action:

Redirect to login page.

Log attempt.

---

## Expired Magic Link

Action:

Show:

"Link expired. Request a new login link."

---

## Large Image Upload

Action:

Reject file.

Show:

"Maximum file size exceeded."

---

## Broken External Links

Action:

Display fallback content.

Log broken URLs.

---

## API Rate Limit Exceeded

Action:

Return:

"Too many requests. Please wait and try again."

---

# 11. Security Checklist Before Launch

Authentication Enabled

RLS Enabled

HTTPS Enabled

API Keys Hidden

Spam Protection Enabled

Environment Variables Configured

Error Pages Configured

Rate Limiting Enabled

Analytics Verified

Admin Access Tested

Backup Strategy Implemented

Security Headers Configured

Contact Form Tested

---

# 12. Future Security Upgrades

Version 3.0

* Two-Factor Authentication
* Audit Logs
* Admin Activity Tracking
* Security Alerts
* Automated Backups
* WAF (Web Application Firewall)
* Content Moderation
* AI Security Monitoring

These are not required for launch but should be considered as the platform grows.
