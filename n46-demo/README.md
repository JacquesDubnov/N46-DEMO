# N46.ai Demo

AI-powered presentation generation platform that creates professional slide decks tailored to specific user profiles and use cases.

## Features

- **Profile-Based Generation**: Tailored presentation styles for Students, Business Professionals, Social/Personal, and Scientific users
- **Use Case Templates**: Pre-configured templates for pitch decks, topic presentations, thesis defenses, wedding speeches, and more
- **Smart Prompt Generation**: Auto-generates structured prompts based on profile, use case, and subject
- **Theme Selection**: Dynamic theme fetching from Gamma API
- **Design Customization**: Adjustable slide count, content density, image styles, and dimensions
- **Presentation Management**: Dashboard for viewing, organizing, and accessing generated presentations
- **Real-Time Progress**: Live generation progress tracking with status updates
- **Export Options**: Direct access to Gamma presentations with PDF/PPTX download support

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
