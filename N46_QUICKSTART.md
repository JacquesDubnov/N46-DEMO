# N46.ai Demo - Quick Start for Claude Code

## 🚀 One-Line Summary

Build a React + Vite demo for N46.ai - an AI presentation platform that wraps Gamma API with intelligent user profiling to create context-optimized presentations.

---

## 📋 Essential Context

**What is N46.ai?**
- AI-powered presentation generator
- Key differentiator: Asks WHO you are (Student/Business/Social/Scientific) + WHAT you're making → Optimizes output accordingly
- Uses Gamma API (https://public-api.gamma.app/v1.0) for actual generation
- Demo is 100% client-side with IndexedDB storage

**Design Direction:**
- Figma-like UI (clean, minimal, spacious)
- N46 Brand Colors: Black (#0A0A0A), Blue (#2563EB), White, Grays
- Thin, narrow fonts (Satoshi from Fontshare)
- NOT like Gamma - more whitespace, subtle borders, less cluttered

---

## 🏗️ Tech Stack

```
React 18 + Vite + TypeScript
Tailwind CSS (custom design system)
Zustand (state)
Dexie.js (IndexedDB)
React Router v6
Lucide React (icons)
```

---

## 📱 Core Pages

1. **Dashboard** (`/`) - Grid of presentation cards, create button, search/filter
2. **Create Wizard** (`/create`) - 5-step flow: Profile → Use Case → Content → Design → Generate
3. **View** (`/presentation/:id`) - Iframe/preview of generated presentation + export options
4. **Settings** (`/settings`) - API key configuration

---

## 🎯 Key Feature: Profile Optimization

When user selects "Business > Pitch Deck", the system automatically configures Gamma API with:
```javascript
{
  textOptions: {
    amount: 'brief',
    tone: 'confident, compelling, visionary',
    audience: 'venture capitalists and angel investors'
  },
  additionalInstructions: 'Follow proven pitch structure: Problem → Solution → Market...',
  imageOptions: { style: 'professional, modern, corporate' }
}
```

This is THE demo's "wow factor" - same prompt, different profile = completely different output.

---

## 🔌 Gamma API Endpoints

```bash
# Generate presentation
POST https://public-api.gamma.app/v1.0/generations
Header: X-API-KEY: sk-gamma-xxxxx

# Check status (poll every 5s)
GET https://public-api.gamma.app/v1.0/generations/{generationId}

# List themes
GET https://public-api.gamma.app/v1.0/themes
```

---

## 📂 Key Files to Create

```
src/
├── api/gamma.ts           # Gamma API client
├── data/userProfiles.ts   # Profile + use case definitions
├── utils/profileOptimizer.ts  # Maps profile→Gamma params
├── db/index.ts            # Dexie schema
├── components/create/CreateWizard.tsx  # Main wizard
└── pages/Dashboard.tsx    # Main dashboard
```

---

## ⚡ Build Order

1. Init project + Tailwind + design system
2. Layout + Sidebar
3. Dashboard + presentation cards
4. Create wizard (all 5 steps)
5. Gamma API integration
6. View page + export
7. Settings + polish

---

## 📖 Full Documentation

See `N46_DEMO_DEVELOPMENT_PLAN.md` for:
- Complete design system (colors, typography, spacing)
- Full component specifications
- Database schema
- All user profiles and use cases
- Exact prompts for each build phase
- Animation guidelines

---

## 🎨 Design Quick Reference

```css
/* Colors */
--n46-blue: #2563EB;
--n46-black: #0A0A0A;

/* Font */
font-family: 'Satoshi', sans-serif;
font-weight: 300-500; /* Keep it light */

/* Radius */
border-radius: 8px-16px;

/* Spacing */
Generous padding (32-48px on content areas)
```

---

## ✅ Success = 

User goes from "I need a pitch deck" to viewing a generated presentation in under 2 minutes, and the output is clearly optimized for their selected profile.
