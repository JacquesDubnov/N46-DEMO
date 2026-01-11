# N46.ai Demo

**THE AI-POWERED LIVING PRESENTATION PLATFORM**

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vitejs.dev/)

## Table of Contents

- [Executive Summary](#executive-summary)
- [Key Differentiators](#key-differentiators-from-gamma-primary-competitor)
- [Demo Features](#demo-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [User Profiles](#user-profiles)
- [Architecture](#architecture)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [License](#license)

---

## Executive Summary

**N46.ai** is a next-generation AI-powered presentation platform designed to revolutionize how individuals and organizations create, present, and maintain visual communications. Built as a strategic wrapper around the **Gamma API** infrastructure, N46 delivers **nine transformative differentiators** that address critical gaps in the current market.

N46 aims to resolve the fundamental limitations of existing AI presentation tools by combining:

1. **Context-Aware Creation** - User-type and use-case specific styling, tone, and structure optimization (Students, Business, Social, Scientific)
2. **Living Documents** - Real-time data synchronization with automatic updates and change tracking
3. **Autonomous Presentation** - AI avatars that can present and defend content via Q&A
4. **Knowledge Integration** - Deep connectivity with enterprise knowledge bases (Google Drive, SharePoint, etc.)
5. **Superior Design** - World-class graphic design with a marketplace for premium templates
6. **Rich Media** - Integrated AI audio tracks and video creation capabilities
7. **Universal Export** - Proprietary format with full export compatibility (PPTX, Google Slides, PDF)
8. **Intelligence Analytics** - Comprehensive engagement tracking and heatmaps
9. **Global Reach** - Contextual multilingual translation with cultural adaptation

**Target Outcome:** Enable anyone—from students to executives—to create professional, always-current, self-presenting presentations in minutes, not hours.

---

## Key Differentiators from Gamma (Primary Competitor)

| Gap in Gamma | N46 Solution |
|--------------|--------------|
| Generic output regardless of context | User profile + use case = optimized style, structure, tone |
| Static content that becomes outdated | Live data updates with audit trails |
| Requires human presenter | AI avatar presentations with Q&A defense |
| Limited document integration | Deep knowledge base connectivity |
| Repetitive design templates | Superior design engine + designer marketplace |
| No audio capabilities | AI-generated music and voice tracks |
| Export quality issues | High-fidelity universal export |
| Basic analytics | Advanced heatmaps and engagement intelligence |
| Machine translation only | Contextual, culturally-adapted translation |

---

## Demo Features

This demo implements the core MVP features:

- **5-Step Creation Wizard** - Profile → Use Case → Content → Design → Generate
- **4 User Profiles** - Student, Business, Social, Scientific
- **20+ Use Case Templates** - Tailored prompts for each profile
- **Smart Prompt Generation** - Auto-generated structured prompts based on context
- **Dynamic Theme Selection** - Themes fetched from Gamma API
- **Design Customization** - Slide count, content density, image styles, dimensions
- **Real-Time Progress** - Live generation tracking with status updates
- **Presentation Dashboard** - View, organize, and access generated presentations
- **Export Options** - PDF, PPTX, and direct Gamma links

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend** | React | 19.0 | UI Framework |
| **Language** | TypeScript | 5.6 | Type Safety |
| **Build Tool** | Vite | 6.0 | Development & Bundling |
| **Styling** | Tailwind CSS | 3.4 | Utility-first CSS |
| **Routing** | React Router | 7.1 | Client-side Navigation |
| **Storage** | IndexedDB (idb) | 8.0 | Client-side Persistence |
| **API** | Gamma API | v1.0 | Presentation Generation |
| **Icons** | Lucide React | 0.469 | UI Iconography |
| **State** | Zustand | 5.0 | State Management |

---

## Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0+ or **yarn** 1.22+
- **Gamma API key** ([Get one here](https://gamma.app/developers))

### Installation

```bash
# Clone the repository
git clone https://github.com/JacquesDubnov/N46-DEMO.git
cd N46-DEMO/n46-demo

# Install dependencies
npm install

# Copy environment file (optional - for custom API key)
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Configuration

The application uses a Gamma API key for presentation generation:

| Method | Location | Priority |
|--------|----------|----------|
| Settings Page | In-app settings | Highest |
| Environment Variable | `.env` file | Medium |
| Config File | `src/config/index.ts` | Default |

---

## Project Structure

```
n46-demo/
├── public/                 # Static assets
│   ├── favicon.svg
│   └── vite.svg
├── src/
│   ├── api/               # API clients
│   │   └── gamma.ts       # Gamma API client
│   ├── assets/            # Images and static files
│   ├── components/        # React components
│   │   ├── common/        # Shared (Logo, Modal, Toast, Skeleton)
│   │   ├── create/        # Wizard steps
│   │   │   ├── ContentInput.tsx
│   │   │   ├── CreateWizard.tsx
│   │   │   ├── DesignCustomizer.tsx
│   │   │   ├── GenerationProgress.tsx
│   │   │   ├── UseCaseSelector.tsx
│   │   │   └── UserProfileSelector.tsx
│   │   ├── dashboard/     # Dashboard components
│   │   └── layout/        # Layout components
│   ├── config/            # Configuration
│   ├── data/              # Static data
│   │   ├── examplePrompts.ts
│   │   ├── promptStarters.ts
│   │   └── userProfiles.ts
│   ├── db/                # IndexedDB operations
│   ├── hooks/             # Custom React hooks
│   │   ├── useGamma.ts
│   │   └── useSettings.ts
│   ├── pages/             # Page components
│   │   ├── Create.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Settings.tsx
│   │   └── View.tsx
│   ├── store/             # State management
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Utility functions
│   │   ├── profileOptimizer.ts
│   │   └── thumbnailGenerator.ts
│   ├── App.tsx            # Root component
│   ├── index.css          # Global styles
│   └── main.tsx           # Entry point
├── .env.example           # Environment template
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
├── package.json           # Dependencies
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

---

## User Profiles

| Profile | Description | Example Use Cases |
|---------|-------------|-------------------|
| **Student** | Academic and educational content | Topic presentations, thesis defense, science projects, essays |
| **Business** | Professional and corporate content | Pitch decks, sales proposals, market research, training materials |
| **Social** | Personal and celebratory content | Weddings, birthdays, travel recaps, trivia games |
| **Scientific** | Research and technical content | White papers, conference talks, grant proposals, lab meetings |

---

## Architecture

### Data Flow

```
User Input → Profile Selection → Use Case Selection → Content Input
    ↓
Structured Prompt Generation (auto-generated based on context)
    ↓
Design Customization (themes, slides, density, images)
    ↓
Gamma API Generation Request
    ↓
Polling for Completion → IndexedDB Storage → Dashboard Display
```

### State Management

- **Zustand** for global application state
- **React useState** for component-local state
- **IndexedDB** for persistent storage (presentations, settings)

### API Integration

The Gamma API client (`src/api/gamma.ts`) handles:
- Presentation generation requests
- Generation status polling
- Theme fetching
- Connection testing

---

## API Reference

### Gamma API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/generations` | POST | Start presentation generation |
| `/generations/:id` | GET | Check generation status |
| `/themes` | GET | Fetch available themes |

### Internal Hooks

| Hook | Purpose |
|------|---------|
| `useGamma()` | Gamma API integration, generation progress |
| `useSettings()` | User settings management |

---

## Environment Variables

Create a `.env` file in the `n46-demo` directory:

```env
# Gamma API Key (optional - can be set in Settings page)
VITE_GAMMA_API_KEY=your_api_key_here
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

---

## Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- **TypeScript** for all source files
- **ESLint** for code linting
- **Prettier** for code formatting (recommended)
- **Conventional Commits** for commit messages

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| API key error | Check Settings page or `.env` file |
| Theme dropdown empty | Verify API connection, check console for errors |
| Generation fails | Check Gamma API status, verify API key permissions |
| Build fails | Run `npm install` to ensure dependencies are installed |

### Debug Mode

Enable debug logging by opening browser DevTools and checking the Console tab. API calls are logged with `[GammaClient]` and `[Gamma API]` prefixes.

---

## Roadmap

### Implemented (Demo v1.0)
- [x] Core Gamma API integration
- [x] User profile system (4 segments)
- [x] Use case templates (20+)
- [x] Smart prompt generation
- [x] Dynamic theme selection
- [x] Design customization
- [x] Generation progress tracking
- [x] Presentation dashboard

### Planned Features
- [ ] Live data integration (financial, competitive)
- [ ] AI avatar presentations
- [ ] Knowledge base connectors
- [ ] Audio track generation
- [ ] Advanced analytics/heatmaps
- [ ] Designer marketplace
- [ ] Multilingual translation
- [ ] Interactive Q&A defense

See the [MRD document](N46_MRD_v1.0.md) for the complete product roadmap.

---

## License

**Proprietary** - N46.ai

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

---

## Contact

- **Project**: N46.ai
- **Repository**: [github.com/JacquesDubnov/N46-DEMO](https://github.com/JacquesDubnov/N46-DEMO)

---

## Acknowledgments

- [Gamma](https://gamma.app) - Presentation generation API
- [React](https://react.dev) - UI framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Vite](https://vitejs.dev) - Build tool

---

**Version:** Final Demo v1.0
**Last Updated:** January 2026
**Built with:** Claude Code (Opus 4.5)
