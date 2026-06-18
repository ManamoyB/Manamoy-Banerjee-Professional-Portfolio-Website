# 🏛️ Manamoy Banerjee — Professional AI Engineer Portfolio

A premium, high-density, accessible, and structured portfolio engineered specifically to highlight data analysis pipelines, clinical vision systems, custom NLP transformers, and autonomous AI agents. Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4**.

---

## 🏛️ Architecture & Dataflow Diagram

```
         +-------------------------------------------------+
         |                 Active Client View              |
         |  (Home, About, Skills, Projects, Certs, etc.)  |
         +------------------------+------------------------+
                                  |
               Reads State / Shares Theme Context
                                  v
         +------------------------+------------------------+
         |            ThemeContext & Color Palette         |
         |         - Theme 1: Aurora Intelligence          |
         |         - Theme 2: Nova Horizon                 |
         +------------------------+------------------------+
                                  |
                 Queries Dynamic Certifications Data
                                  v
         +------------------------+------------------------+
         |            Certifications Repository            |
         |                (sheetsService.ts)               |
         +------------+------------------------+-----------+
                      |                        |
             (Fetches live rows)     (Loads backup archive)
                      v                        v
         +------------+-----------+  +---------+-----------+
         |    Google Sheets API   |  |   Static fallback   |
         |  (Published CSV Feed)   |  |     Data Store      |
         +------------------------+  +---------------------+
```

---

## 📂 Production-Ready Folder Structure

```
src/
├── app/                        # Next.js App Router folders & page definitions
│   ├── layout.tsx              # Root HTML enclosure & metadata hooks
│   └── page.tsx                # Principal page route
├── components/                 # Atomic reusable UI components
│   ├── ui/                     # Simple interactive buttons, inputs, badge tags
│   │   ├── CurrentFocus.tsx    # Live personal focus sticky block
│   │   └── button.tsx          # Custom premium tactile CTA buttons
│   ├── layout/                 # Shared header, navigation rail, footer panels
│   ├── sections/               # Large high-level views (Home, About, Projects)
│   └── shared/                 # ParticleCanvas backgrounds, generic loaders
├── data/                       # In-memory datasets & static data fallback lists
│   ├── blogData.ts             # Articles, technical writing & tutorials
│   └── portfolioData.ts        # Career timelines, project cases, experience maps
├── hooks/                      # Custom React hooks (useLocalStorage, useResize)
├── lib/                        # Threadd-safe utility integrations
├── services/                   # Network connections, CSV buffers & data brokers
│   └── sheetsService.ts        # Client-side cache-aware sheets retrieval
├── types.ts                    # Global contracts and TypeScript entities
├── index.css                   # Global fonts, resets & custom theme layers
└── main.tsx                    # Entry runtime bootstrapper
```

### Purpose of Key Folders

- **`src/app/`**: Next.js App Router directory managing layouts, template loaders, nested route segments, and server-side head/metadata injection.
- **`src/components/`**: Standard modular UI repository divided into cohesive subfolders:
  - **`ui/`**: Low-level, high-isolation presentational primitives (e.g. customized button elements with micro-motions).
  - **`layout/`**: Framework wrapper systems (e.g. navigation bars, theme containers).
  - **`sections/`**: Independent, self-contained functional structures corresponding to high-level content tabs.
  - **`shared/`**: Modular cross-cutting assemblies (e.g., `<ParticleBackground />`).
- **`src/data/`**: Consolidated configuration files and static offline repositories used as high-reliability fallbacks.
- **`src/services/`**: Structured client engines wrapper designed to abstract fetch routes, API formats, and browser storage routines.

---

## 📊 Google Sheets API Integration

To connect your own Google Sheet dynamically:
1. Create a spreadsheet with these exact header column names in row 1:
   - `Title` (the certificate title name)
   - `Issuer` (e.g. Google, DeepLearning.AI)
   - `IssueDate` (e.g. `2024-05` or `2024-05-18`)
   - `Skills` (Comma-separated tagging of fields)
   - `CredentialUrl` (Verification hyperlink)
2. In Google Sheets, select **File > Share > Publish to Web**.
3. Choose **Entire Document** as **Comma-Separated Values (.csv)**, and click **Publish**.
4. Retrieve your Sheet ID from the browser address bar (it is the long alphanumeric token like `1sXeB...` between `/d/` and `/edit`).
5. Configure your environment variables inside your deployment manager or locally inside a `.env` file:
   ```env
   VITE_GOOGLE_SHEET_ID="YOUR_SPREADSHEET_ID_HERE"
   ```
6. The application parses the CSV values directly, stores them inside local client storage caches, and falls back to standard static listings if connectivity is lost.

---

## ⚙️ Environment Variables Layout

Our build pipelines separate configuration configurations across environments:

```env
# ==============================================================================
# LOCAL / DEVELOPMENT CONFIGURATION (Default values loaded local-side)
# ==============================================================================
VITE_GOOGLE_SHEET_ID="1sXeB..."             # Dev Sheet Sandbox
VITE_GOOGLE_SHEET_API_KEY=""                # Optional raw API Key if bypass-cors required
VITE_GOOGLE_FORM_ID="1FAIpQLSfIqE..."       # Contact submission redirection target

# ==============================================================================
# SECURE SERVER-SIDE CONFIGURATION (Never exposed browser-side)
# ==============================================================================
GEMINI_API_KEY="AI_Studio_Default_Secret"   # Managed via AI Studio Settings Panel
APP_URL="http://localhost:3000"             # Self-referential address mapping
```

---

## 🚀 Deployment & Build Commands

Ensure system package libraries are locked prior to running commands:

```bash
# Install required packages
npm install

# Run static TypeScript checking & code validation
npm run lint

# Clean distribution build folders
npm run clean

# Compile application into standalone distribution
npm run build

# Preview production builds locally
npm run preview
```

---

## 🛠️ Troubleshooting Map

### 1. CORS Block on Google Sheets Parsing
- **Symptom**: Console throws a `Cross-Origin Request Blocked` alert when pulling spreadsheet rows.
- **Fix**: Verify your Google Sheet is published to web as **Comma-Separated Values (.csv)** rather than just shared. The parser reads direct CSV streams which do not trigger CORS on browser requests.

### 2. Vite Websocket Connect Failures
- **Symptom**: Browser debugger tracks warning: `[vite] failed to connect to websocket`.
- **Reason**: Normal sandbox container behavior; hot module reloading is disabled in production containers to prevent layout flashes. This does not impact deployment builds or execution speeds.

### 3. Verification Link Missing on Certifications
- **Symptom**: Certificate verify badges are grayed out or unclickable.
- **Fix**: Ensure the `CredentialUrl` column row inside your Google Sheet is fully-formed (e.g., includes `https://` prefix) as incomplete addresses are sanitized to avoid route breaks.
