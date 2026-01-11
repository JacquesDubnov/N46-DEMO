# N46.ai Demo

**THE AI-POWERED LIVING PRESENTATION PLATFORM**

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

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Storage**: IndexedDB (via idb)
- **API**: Gamma API for presentation generation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Gamma API key

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd n46-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

### Configuration

The application uses a Gamma API key for presentation generation. The key can be configured in:
- `src/config.ts` - Default API key
- Settings page - User-specific API key override

### Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
n46-demo/
├── src/
│   ├── api/           # API client (Gamma)
│   ├── components/    # React components
│   │   ├── common/    # Shared components (Logo, Modal, etc.)
│   │   ├── create/    # Wizard components
│   │   ├── dashboard/ # Dashboard components
│   │   └── settings/  # Settings components
│   ├── data/          # Static data (profiles, use cases, prompts)
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── docs/              # Documentation
```

## User Profiles

| Profile | Description | Example Use Cases |
|---------|-------------|-------------------|
| Student | Academic and educational content | Topic presentations, thesis defense, science projects |
| Business | Professional and corporate content | Pitch decks, sales proposals, market research |
| Social | Personal and celebratory content | Weddings, birthdays, travel recaps |
| Scientific | Research and technical content | White papers, conference talks, grant proposals |

## License

Proprietary - N46.ai

## Version

Final Demo v1.0 - January 2026
