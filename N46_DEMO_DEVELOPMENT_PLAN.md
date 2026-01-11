# N46.ai Demo - Complete Development Plan for Claude Code

**Version:** 1.0  
**Date:** January 10, 2026  
**Purpose:** Comprehensive instructions for building the N46.ai presentation platform demo

---

## 🎯 PROJECT OVERVIEW

### What is N46.ai?
N46.ai is an AI-powered presentation platform that wraps the Gamma API with intelligent context-awareness. The demo showcases how N46 differentiates from Gamma by understanding WHO the user is and WHAT they're creating, then optimizing the output accordingly.

### Demo Objectives
1. **Demonstrate context-aware presentation creation** - Show how selecting user type + use case dramatically improves output
2. **Showcase superior, clean UI** - Modern Figma-like interface that feels premium
3. **Enable presentation management** - Dashboard to create, view, delete, and organize presentations
4. **Impress with speed** - Minimal clicks from idea to finished presentation

---

## 🎨 DESIGN SYSTEM

### Brand Colors (from N46 Logo)
```css
:root {
  /* Primary */
  --n46-black: #0A0A0A;
  --n46-blue: #2563EB;          /* Primary accent - from logo brushstroke */
  --n46-blue-light: #3B82F6;    /* Hover states */
  --n46-blue-dark: #1D4ED8;     /* Active states */
  
  /* Neutrals */
  --n46-white: #FFFFFF;
  --n46-gray-50: #FAFAFA;
  --n46-gray-100: #F4F4F5;
  --n46-gray-200: #E4E4E7;
  --n46-gray-300: #D4D4D8;
  --n46-gray-400: #A1A1AA;
  --n46-gray-500: #71717A;
  --n46-gray-600: #52525B;
  --n46-gray-700: #3F3F46;
  --n46-gray-800: #27272A;
  --n46-gray-900: #18181B;
  
  /* Semantic */
  --n46-success: #22C55E;
  --n46-warning: #F59E0B;
  --n46-error: #EF4444;
  
  /* Backgrounds */
  --n46-bg-primary: #FFFFFF;
  --n46-bg-secondary: #FAFAFA;
  --n46-bg-elevated: #FFFFFF;
}
```

### Typography
```css
/* Use Google Fonts - thin, narrow, modern sans-serif */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Grotesk:wght@300..700&display=swap');

/* IMPORTANT: Do NOT use Space Grotesk as primary - use for accents only */
/* Primary Font Stack - Choose ONE of these distinctive options: */

/* Option 1: Satoshi (via Fontshare) - Recommended */
@font-face {
  font-family: 'Satoshi';
  src: url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap');
}

/* Option 2: General Sans */
@font-face {
  font-family: 'General Sans';
  src: url('https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap');
}

/* Typography Scale */
:root {
  --font-family-display: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-body: 'Satoshi', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Font Weights - Keep it THIN and LIGHT */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  
  /* Letter Spacing - Slightly tight for modern feel */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
}
```

### Spacing System
```css
:root {
  /* Generous, spacious layout */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
}
```

### UI Component Guidelines

#### Buttons
```css
/* Primary Button */
.btn-primary {
  background: var(--n46-blue);
  color: white;
  font-weight: var(--font-weight-medium);
  padding: 10px 20px;
  border-radius: var(--radius-lg);
  border: none;
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-tight);
  transition: all 0.15s ease;
}
.btn-primary:hover {
  background: var(--n46-blue-light);
  transform: translateY(-1px);
}

/* Secondary Button - Ghost style */
.btn-secondary {
  background: transparent;
  color: var(--n46-gray-700);
  border: 1px solid var(--n46-gray-200);
  font-weight: var(--font-weight-normal);
  padding: 10px 20px;
  border-radius: var(--radius-lg);
}
```

#### Cards
```css
.card {
  background: var(--n46-white);
  border: 1px solid var(--n46-gray-100);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  transition: all 0.2s ease;
}
.card:hover {
  border-color: var(--n46-gray-200);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
}
```

#### Input Fields
```css
.input {
  background: var(--n46-gray-50);
  border: 1px solid var(--n46-gray-200);
  border-radius: var(--radius-lg);
  padding: 12px 16px;
  font-size: var(--text-sm);
  color: var(--n46-gray-900);
  transition: all 0.15s ease;
}
.input:focus {
  outline: none;
  border-color: var(--n46-blue);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

### Layout Principles (Figma-like)
1. **Left sidebar** for navigation (collapsible, 240px width)
2. **Main content area** with generous padding (40-60px)
3. **Minimal chrome** - let content breathe
4. **Subtle borders** over heavy shadows
5. **Consistent 8px grid** alignment
6. **Hover states** on all interactive elements

---

## 🏗️ TECHNICAL ARCHITECTURE

### Tech Stack
```
Frontend:
├── React 18+ (with hooks)
├── Vite (build tool)
├── TypeScript
├── Tailwind CSS
├── Zustand (state management)
├── React Router v6
└── Lucide React (icons)

Local Storage:
├── IndexedDB (via Dexie.js) - Primary storage for presentations
└── localStorage - User preferences, API key

External APIs:
└── Gamma API v1.0 (https://public-api.gamma.app/v1.0/)
```

### Project Structure
```
n46-demo/
├── public/
│   ├── n46-logo.png
│   └── favicon.svg
├── src/
│   ├── api/
│   │   └── gamma.ts              # Gamma API client
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   └── Loader.tsx
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   ├── dashboard/
│   │   │   ├── PresentationGrid.tsx
│   │   │   ├── PresentationCard.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── StatsBar.tsx
│   │   ├── create/
│   │   │   ├── UserProfileSelector.tsx
│   │   │   ├── UseCaseSelector.tsx
│   │   │   ├── ContentInput.tsx
│   │   │   ├── DesignCustomizer.tsx
│   │   │   ├── GenerationProgress.tsx
│   │   │   └── CreateWizard.tsx
│   │   └── preview/
│   │       ├── PresentationViewer.tsx
│   │       └── ExportOptions.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Create.tsx
│   │   ├── View.tsx
│   │   └── Settings.tsx
│   ├── store/
│   │   ├── useAppStore.ts         # Global app state
│   │   └── usePresentationStore.ts # Presentations state
│   ├── db/
│   │   └── index.ts               # Dexie.js database setup
│   ├── hooks/
│   │   ├── useGamma.ts            # Gamma API hook
│   │   └── usePresentations.ts    # DB operations hook
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   ├── utils/
│   │   ├── profileOptimizer.ts    # Maps user profiles to Gamma params
│   │   └── helpers.ts
│   ├── data/
│   │   ├── userProfiles.ts        # User segment definitions
│   │   ├── useCases.ts            # Use case definitions
│   │   └── examplePrompts.ts      # Pre-configured examples
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── .env.example
```

### Database Schema (Dexie.js / IndexedDB)
```typescript
// src/db/index.ts
import Dexie, { Table } from 'dexie';

export interface Presentation {
  id?: number;
  title: string;
  description?: string;
  
  // Creation context
  userProfile: 'student' | 'business' | 'social' | 'scientific';
  useCase: string;
  prompt: string;
  
  // Gamma response data
  gammaId?: string;
  gammaUrl?: string;
  generationId?: string;
  status: 'draft' | 'generating' | 'completed' | 'failed';
  
  // Export URLs (temporary)
  pdfUrl?: string;
  pptxUrl?: string;
  
  // Generation parameters used
  generationParams: {
    textMode: string;
    format: string;
    themeId?: string;
    numCards: number;
    textOptions: {
      amount: string;
      tone: string;
      audience: string;
      language: string;
    };
    imageOptions: {
      source: string;
      style?: string;
    };
    cardOptions: {
      dimensions: string;
    };
  };
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  thumbnailUrl?: string;
}

export interface UserSettings {
  id?: number;
  gammaApiKey?: string;
  defaultProfile?: string;
  defaultThemeId?: string;
  lastUsedProfile?: string;
  lastUsedUseCase?: string;
}

class N46Database extends Dexie {
  presentations!: Table<Presentation>;
  settings!: Table<UserSettings>;
  
  constructor() {
    super('n46-demo');
    this.version(1).stores({
      presentations: '++id, userProfile, useCase, status, createdAt',
      settings: '++id'
    });
  }
}

export const db = new N46Database();
```

---

## 📊 USER PROFILES & USE CASES

### Core User Segments

```typescript
// src/data/userProfiles.ts

export const USER_PROFILES = {
  student: {
    id: 'student',
    name: 'Student',
    icon: 'GraduationCap',
    description: 'Learning, assignments, thesis, academic projects',
    color: '#8B5CF6', // Purple
    useCases: [
      {
        id: 'self-learning',
        name: 'Self-Learning',
        description: 'Study guides and educational content',
        icon: 'BookOpen',
        gammaMapping: {
          textOptions: {
            amount: 'detailed',
            tone: 'educational, clear, engaging',
            audience: 'students learning new concepts'
          },
          additionalInstructions: 'Use clear explanations, visual aids, and progressive complexity. Include key takeaways and summary points.'
        }
      },
      {
        id: 'essay-report',
        name: 'Essay / Report',
        description: 'Academic papers and formal reports',
        icon: 'FileText',
        gammaMapping: {
          textOptions: {
            amount: 'extensive',
            tone: 'academic, formal, analytical',
            audience: 'professors and academic reviewers'
          },
          additionalInstructions: 'Follow academic formatting conventions. Include proper structure with introduction, body, conclusion. Use formal language and cite-ready formatting.'
        }
      },
      {
        id: 'topic-presentation',
        name: 'Topic Presentation',
        description: 'Class presentations on any subject',
        icon: 'Presentation',
        gammaMapping: {
          textOptions: {
            amount: 'medium',
            tone: 'informative, engaging, clear',
            audience: 'classmates and teachers'
          },
          additionalInstructions: 'Create visually engaging slides with key points emphasized. Balance text and visuals. Include discussion questions or interactive elements.'
        }
      },
      {
        id: 'science-project',
        name: 'Science Project',
        description: 'Lab reports and scientific methodology',
        icon: 'FlaskConical',
        gammaMapping: {
          textOptions: {
            amount: 'detailed',
            tone: 'scientific, precise, methodical',
            audience: 'science teachers and judges'
          },
          additionalInstructions: 'Follow scientific method structure: hypothesis, methodology, results, conclusion. Include data visualization placeholders and proper scientific terminology.'
        }
      },
      {
        id: 'thesis-defense',
        name: 'Thesis Defense',
        description: 'Graduate-level thesis presentations',
        icon: 'Award',
        gammaMapping: {
          textOptions: {
            amount: 'extensive',
            tone: 'professional, scholarly, comprehensive',
            audience: 'thesis committee and academic experts'
          },
          additionalInstructions: 'Structure for defense: research question, literature review, methodology, findings, implications, Q&A preparation. Maintain scholarly rigor while remaining accessible.'
        }
      }
    ]
  },
  
  business: {
    id: 'business',
    name: 'Business',
    icon: 'Briefcase',
    description: 'Startups, enterprise, sales, management',
    color: '#2563EB', // Blue (N46 primary)
    useCases: [
      {
        id: 'pitch-deck',
        name: 'Pitch Deck',
        description: 'Investor presentations and fundraising',
        icon: 'Rocket',
        gammaMapping: {
          textOptions: {
            amount: 'brief',
            tone: 'confident, compelling, visionary',
            audience: 'venture capitalists and angel investors'
          },
          additionalInstructions: 'Follow proven pitch structure: Problem → Solution → Market → Traction → Team → Ask. Minimal text, maximum impact. Include placeholder for key metrics and financials. Make every slide count.'
        }
      },
      {
        id: 'sales-proposal',
        name: 'Sales Proposal',
        description: 'Client presentations and deal closing',
        icon: 'HandshakeIcon',
        gammaMapping: {
          textOptions: {
            amount: 'medium',
            tone: 'persuasive, professional, solution-focused',
            audience: 'potential clients and decision makers'
          },
          additionalInstructions: 'Focus on client pain points and your solution. Include ROI projections, case studies references, and clear call-to-action. Address potential objections proactively.'
        }
      },
      {
        id: 'management-report',
        name: 'Management Report',
        description: 'Internal reports and board presentations',
        icon: 'BarChart3',
        gammaMapping: {
          textOptions: {
            amount: 'detailed',
            tone: 'professional, data-driven, actionable',
            audience: 'executives and board members'
          },
          additionalInstructions: 'McKinsey-style formatting with executive summary upfront. Lead with insights and recommendations. Include KPI dashboards and trend analysis. Every slide should drive toward action items.'
        }
      },
      {
        id: 'market-research',
        name: 'Market Research',
        description: 'Competitive analysis and market insights',
        icon: 'Search',
        gammaMapping: {
          textOptions: {
            amount: 'detailed',
            tone: 'analytical, objective, insightful',
            audience: 'strategy teams and leadership'
          },
          additionalInstructions: 'Include market sizing frameworks (TAM/SAM/SOM), competitive landscape mapping, SWOT analysis structure, and trend identification. Use data visualization heavily.'
        }
      },
      {
        id: 'product-roadmap',
        name: 'Product Roadmap',
        description: 'Product planning and strategy',
        icon: 'Map',
        gammaMapping: {
          textOptions: {
            amount: 'medium',
            tone: 'strategic, clear, forward-looking',
            audience: 'product teams, stakeholders, and executives'
          },
          additionalInstructions: 'Timeline-based structure with clear milestones. Include feature prioritization rationale, resource considerations, and success metrics. Balance vision with practicality.'
        }
      },
      {
        id: 'training-materials',
        name: 'Training Materials',
        description: 'Onboarding and employee education',
        icon: 'Users',
        gammaMapping: {
          textOptions: {
            amount: 'detailed',
            tone: 'instructional, friendly, encouraging',
            audience: 'new employees and team members'
          },
          additionalInstructions: 'Step-by-step learning structure. Include knowledge checks, practical examples, and quick reference summaries. Make content scannable and memorable.'
        }
      }
    ]
  },
  
  social: {
    id: 'social',
    name: 'Social',
    icon: 'PartyPopper',
    description: 'Events, celebrations, personal occasions',
    color: '#EC4899', // Pink
    useCases: [
      {
        id: 'birthday',
        name: 'Birthday / Anniversary',
        description: 'Celebration presentations',
        icon: 'Cake',
        gammaMapping: {
          textOptions: {
            amount: 'brief',
            tone: 'celebratory, warm, personal',
            audience: 'friends and family'
          },
          additionalInstructions: 'Create emotional, celebratory content with space for photos. Use elegant design with festive touches. Include timeline of memories and heartfelt messages.'
        }
      },
      {
        id: 'wedding',
        name: 'Wedding',
        description: 'Wedding slideshows and stories',
        icon: 'Heart',
        gammaMapping: {
          textOptions: {
            amount: 'brief',
            tone: 'romantic, elegant, storytelling',
            audience: 'wedding guests and family'
          },
          additionalInstructions: 'Romantic narrative structure: How we met → Our journey → The proposal → Our future. Elegant, sophisticated design. Photo-centric with minimal but meaningful text.'
        }
      },
      {
        id: 'travel-recap',
        name: 'Travel Recap',
        description: 'Trip memories and photo stories',
        icon: 'Plane',
        gammaMapping: {
          textOptions: {
            amount: 'brief',
            tone: 'adventurous, fun, nostalgic',
            audience: 'friends and fellow travelers'
          },
          additionalInstructions: 'Photo-driven storytelling with location highlights. Include fun facts, favorite moments, and recommendations. Create visual journey with map elements.'
        }
      },
      {
        id: 'roast-toast',
        name: 'Roast / Toast',
        description: 'Humorous tribute presentations',
        icon: 'Laugh',
        gammaMapping: {
          textOptions: {
            amount: 'brief',
            tone: 'humorous, affectionate, entertaining',
            audience: 'party guests'
          },
          additionalInstructions: 'Comedy timing structure with setup and punchlines. Mix embarrassing stories with genuine appreciation. Build to heartfelt conclusion. Keep text punchy and visual.'
        }
      },
      {
        id: 'trivia-game',
        name: 'Trivia / Games',
        description: 'Interactive party games',
        icon: 'Gamepad2',
        gammaMapping: {
          textOptions: {
            amount: 'brief',
            tone: 'playful, exciting, competitive',
            audience: 'game participants'
          },
          additionalInstructions: 'Quiz show format with clear questions and dramatic answer reveals. Include score tracking structure, category organization, and celebration moments.'
        }
      }
    ]
  },
  
  scientific: {
    id: 'scientific',
    name: 'Scientific',
    icon: 'Microscope',
    description: 'Research, publications, conferences',
    color: '#059669', // Green
    useCases: [
      {
        id: 'white-paper',
        name: 'White Paper',
        description: 'Research documentation',
        icon: 'FileText',
        gammaMapping: {
          textOptions: {
            amount: 'extensive',
            tone: 'scholarly, rigorous, authoritative',
            audience: 'researchers and industry experts'
          },
          additionalInstructions: 'Academic structure with abstract, methodology, findings, and discussion. Include proper citation formatting placeholders. Maintain scholarly rigor while ensuring readability.'
        }
      },
      {
        id: 'conference-talk',
        name: 'Conference Talk',
        description: 'Academic conference presentations',
        icon: 'Users',
        gammaMapping: {
          textOptions: {
            amount: 'medium',
            tone: 'professional, engaging, expert',
            audience: 'conference attendees and peers'
          },
          additionalInstructions: 'TED-style or academic talk format. Balance depth with accessibility. Include key findings emphasis, methodology overview, and implications. Design for large screen visibility.'
        }
      },
      {
        id: 'grant-proposal',
        name: 'Grant Proposal',
        description: 'Funding applications',
        icon: 'CircleDollarSign',
        gammaMapping: {
          textOptions: {
            amount: 'detailed',
            tone: 'persuasive, credible, impactful',
            audience: 'grant committees and funding bodies'
          },
          additionalInstructions: 'Include problem significance, proposed approach, expected outcomes, and budget justification. Emphasize innovation and broader impacts. Follow standard grant structure.'
        }
      },
      {
        id: 'lab-meeting',
        name: 'Lab Meeting',
        description: 'Research updates and discussions',
        icon: 'FlaskConical',
        gammaMapping: {
          textOptions: {
            amount: 'medium',
            tone: 'technical, collaborative, update-focused',
            audience: 'lab members and advisors'
          },
          additionalInstructions: 'Progress update structure: What was done, what was found, what challenges arose, what comes next. Include data visualizations and preliminary findings. Keep technical but accessible to lab team.'
        }
      },
      {
        id: 'poster-session',
        name: 'Poster Session',
        description: 'Scientific poster design',
        icon: 'LayoutGrid',
        gammaMapping: {
          textOptions: {
            amount: 'brief',
            tone: 'concise, visual, impactful',
            audience: 'conference attendees browsing posters'
          },
          additionalInstructions: 'Poster format with scannable sections. Large, clear headings. Visual-heavy with minimal dense text. Include QR code placeholder for additional resources. Design for quick comprehension.'
        }
      }
    ]
  }
};
```

### Example Prompts (Pre-configured)

```typescript
// src/data/examplePrompts.ts

export const EXAMPLE_PROMPTS = {
  student: {
    'self-learning': [
      {
        title: 'Introduction to Machine Learning',
        prompt: 'Create a comprehensive guide to machine learning fundamentals covering supervised vs unsupervised learning, common algorithms like linear regression and decision trees, neural network basics, and practical applications in everyday life.'
      },
      {
        title: 'World War II Overview',
        prompt: 'An educational presentation covering the causes of World War II, major events and turning points, key figures, the Holocaust, and the war\'s lasting impact on the modern world.'
      }
    ],
    'thesis-defense': [
      {
        title: 'Climate Change Impact on Coastal Cities',
        prompt: 'Thesis defense presentation on the effects of rising sea levels on major coastal cities, including research methodology analyzing 50 cities over 30 years, predictive models, and policy recommendations.'
      }
    ]
  },
  business: {
    'pitch-deck': [
      {
        title: 'FinTech Startup Pitch',
        prompt: 'Series A pitch deck for a fintech startup that uses AI to help small businesses manage cash flow. Problem: 60% of SMBs struggle with cash flow. Solution: Predictive AI that forecasts cash needs. Market: $50B SMB financial services. Traction: 500 paying customers, $80K MRR, growing 25% month over month. Team: Ex-Stripe and JP Morgan founders. Ask: $8M for sales and product expansion.'
      },
      {
        title: 'SaaS Platform Pitch',
        prompt: 'Seed round pitch for a B2B SaaS platform that automates employee onboarding. Reduces onboarding time by 70%. Currently 50 customers with $30K MRR. Seeking $2M to build sales team.'
      }
    ],
    'market-research': [
      {
        title: 'Electric Vehicle Market Analysis',
        prompt: 'Comprehensive market research on the electric vehicle industry including market size and growth projections, competitive landscape analysis of Tesla, BYD, and legacy automakers, consumer trends, regulatory environment, and investment opportunities.'
      }
    ],
    'sales-proposal': [
      {
        title: 'Enterprise Software Proposal',
        prompt: 'Sales proposal for enterprise project management software to a Fortune 500 company. Highlight pain points of current tools, our solution\'s advantages, implementation timeline, pricing tiers, and expected ROI of 300% in first year.'
      }
    ]
  },
  social: {
    'birthday': [
      {
        title: '50th Birthday Celebration',
        prompt: 'A heartfelt 50th birthday presentation for Mom including childhood memories, family milestones, her impact on our lives, favorite family quotes and moments, and wishes for the next 50 years.'
      }
    ],
    'wedding': [
      {
        title: 'Our Love Story',
        prompt: 'Wedding slideshow for Sarah and Mike\'s reception. Story of how we met at a coffee shop, our first date hiking, the proposal in Paris, and our journey to this day. Include sections for photos throughout.'
      }
    ],
    'trivia-game': [
      {
        title: '90s Pop Culture Trivia',
        prompt: 'Create a fun 90s pop culture trivia game with 20 questions covering movies, music, TV shows, fashion, and technology. Include multiple choice answers and fun facts for each question.'
      }
    ]
  },
  scientific: {
    'conference-talk': [
      {
        title: 'CRISPR Gene Editing Advances',
        prompt: 'Conference presentation on recent advances in CRISPR gene editing technology, covering new precision techniques, therapeutic applications in treating genetic diseases, ethical considerations, and future research directions.'
      }
    ],
    'grant-proposal': [
      {
        title: 'Renewable Energy Storage Research',
        prompt: 'NSF grant proposal presentation for research on next-generation battery technology for renewable energy storage. Project aims to develop solid-state batteries with 2x capacity at half the cost. Budget: $1.5M over 3 years.'
      }
    ]
  }
};
```

---

## 🔌 GAMMA API INTEGRATION

### API Client

```typescript
// src/api/gamma.ts

const GAMMA_API_BASE = 'https://public-api.gamma.app/v1.0';

interface GammaGenerateParams {
  inputText: string;
  textMode: 'generate' | 'condense' | 'preserve';
  format: 'presentation' | 'document' | 'social' | 'webpage';
  themeId?: string;
  numCards?: number;
  cardSplit?: 'auto' | 'inputTextBreaks';
  additionalInstructions?: string;
  exportAs?: 'pdf' | 'pptx';
  textOptions?: {
    amount?: 'brief' | 'medium' | 'detailed' | 'extensive';
    tone?: string;
    audience?: string;
    language?: string;
  };
  imageOptions?: {
    source?: 'aiGenerated' | 'pictographic' | 'unsplash' | 'placeholder' | 'noImages';
    model?: string;
    style?: string;
  };
  cardOptions?: {
    dimensions?: 'fluid' | '16x9' | '4x3';
  };
}

interface GammaGenerateResponse {
  generationId: string;
}

interface GammaStatusResponse {
  generationId: string;
  status: 'pending' | 'completed' | 'failed';
  gammaUrl?: string;
  pdfUrl?: string;
  pptxUrl?: string;
  credits?: {
    deducted: number;
    remaining: number;
  };
  error?: string;
}

class GammaClient {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async generate(params: GammaGenerateParams): Promise<GammaGenerateResponse> {
    const response = await fetch(`${GAMMA_API_BASE}/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate presentation');
    }
    
    return response.json();
  }
  
  async getStatus(generationId: string): Promise<GammaStatusResponse> {
    const response = await fetch(`${GAMMA_API_BASE}/generations/${generationId}`, {
      headers: {
        'X-API-KEY': this.apiKey,
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get generation status');
    }
    
    return response.json();
  }
  
  async getThemes(): Promise<any[]> {
    const response = await fetch(`${GAMMA_API_BASE}/themes`, {
      headers: {
        'X-API-KEY': this.apiKey,
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch themes');
    }
    
    const data = await response.json();
    return data.data || [];
  }
  
  // Poll for completion with exponential backoff
  async waitForCompletion(
    generationId: string, 
    onProgress?: (status: GammaStatusResponse) => void,
    maxAttempts = 60
  ): Promise<GammaStatusResponse> {
    let attempts = 0;
    let delay = 2000; // Start with 2 seconds
    
    while (attempts < maxAttempts) {
      const status = await this.getStatus(generationId);
      
      if (onProgress) {
        onProgress(status);
      }
      
      if (status.status === 'completed') {
        return status;
      }
      
      if (status.status === 'failed') {
        throw new Error(status.error || 'Generation failed');
      }
      
      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Increase delay slightly but cap at 5 seconds
      delay = Math.min(delay * 1.2, 5000);
      attempts++;
    }
    
    throw new Error('Generation timed out');
  }
}

export { GammaClient, type GammaGenerateParams, type GammaStatusResponse };
```

### Profile to Gamma Params Optimizer

```typescript
// src/utils/profileOptimizer.ts

import { USER_PROFILES } from '../data/userProfiles';

interface OptimizedParams {
  textOptions: {
    amount: string;
    tone: string;
    audience: string;
    language: string;
  };
  additionalInstructions: string;
  imageOptions: {
    source: string;
    style: string;
  };
  cardOptions: {
    dimensions: string;
  };
  numCards: number;
}

export function optimizeForProfile(
  profileId: string,
  useCaseId: string,
  userPrompt: string,
  designPreferences: {
    density: number; // 0-100, 0 = minimal, 100 = dense
    numSlides: number;
  }
): OptimizedParams {
  const profile = USER_PROFILES[profileId as keyof typeof USER_PROFILES];
  const useCase = profile?.useCases.find(uc => uc.id === useCaseId);
  
  if (!profile || !useCase) {
    // Fallback to defaults
    return {
      textOptions: {
        amount: 'medium',
        tone: 'professional',
        audience: 'general audience',
        language: 'en'
      },
      additionalInstructions: '',
      imageOptions: {
        source: 'aiGenerated',
        style: 'modern, professional'
      },
      cardOptions: {
        dimensions: 'fluid'
      },
      numCards: 10
    };
  }
  
  // Map density slider to text amount
  let textAmount: string;
  if (designPreferences.density < 25) {
    textAmount = 'brief';
  } else if (designPreferences.density < 50) {
    textAmount = 'medium';
  } else if (designPreferences.density < 75) {
    textAmount = 'detailed';
  } else {
    textAmount = 'extensive';
  }
  
  // Override with use case default if not explicitly changed
  const baseMapping = useCase.gammaMapping;
  
  // Determine image style based on profile
  const imageStyleMap: Record<string, string> = {
    student: 'educational, clean, diagram-friendly',
    business: 'professional, modern, corporate',
    social: 'vibrant, emotional, photo-realistic',
    scientific: 'technical, precise, data-visualization'
  };
  
  return {
    textOptions: {
      amount: textAmount,
      tone: baseMapping.textOptions.tone,
      audience: baseMapping.textOptions.audience,
      language: 'en'
    },
    additionalInstructions: baseMapping.additionalInstructions,
    imageOptions: {
      source: 'aiGenerated',
      style: imageStyleMap[profileId] || 'modern, professional'
    },
    cardOptions: {
      dimensions: 'fluid'
    },
    numCards: designPreferences.numSlides
  };
}
```

---

## 📱 PAGE SPECIFICATIONS

### Page 1: Dashboard (Home)

**Route:** `/` or `/dashboard`

**Purpose:** Central hub for managing presentations

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ [Sidebar]           │ [Main Content Area]                       │
│                     │                                           │
│ ┌─────────────────┐ │ ┌─────────────────────────────────────┐   │
│ │ N46.ai Logo     │ │ │ Welcome back! 👋                    │   │
│ │                 │ │ │                                     │   │
│ │ ─────────────── │ │ │ [+ New Presentation]  (Primary CTA) │   │
│ │                 │ │ └─────────────────────────────────────┘   │
│ │ 📊 Dashboard    │ │                                           │
│ │ ✨ Create New   │ │ ┌─────────────────────────────────────┐   │
│ │                 │ │ │ Stats Bar                           │   │
│ │ ─────────────── │ │ │ [12 Total] [3 This Week] [5 Draft]  │   │
│ │                 │ │ └─────────────────────────────────────┘   │
│ │ Recent          │ │                                           │
│ │ • Pitch Deck    │ │ ┌─────────────────────────────────────┐   │
│ │ • Q4 Report     │ │ │ Search & Filter Bar                 │   │
│ │ • Team Training │ │ │ [🔍 Search...] [Filter ▼] [Sort ▼]  │   │
│ │                 │ │ └─────────────────────────────────────┘   │
│ │ ─────────────── │ │                                           │
│ │                 │ │ ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│ │ ⚙️ Settings     │ │ │ Card 1  │ │ Card 2  │ │ Card 3  │      │
│ │                 │ │ │         │ │         │ │         │      │
│ └─────────────────┘ │ │ Pitch   │ │ Q4      │ │ Wedding │      │
│                     │ │ Deck    │ │ Report  │ │ Story   │      │
│                     │ │         │ │         │ │         │      │
│                     │ │ [View]  │ │ [View]  │ │ [View]  │      │
│                     │ │ [Delete]│ │ [Delete]│ │ [Delete]│      │
│                     │ └─────────┘ └─────────┘ └─────────┘      │
│                     │                                           │
│                     │ ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│                     │ │ Card 4  │ │ Card 5  │ │ + New   │      │
│                     │ │         │ │         │ │         │      │
│                     │ └─────────┘ └─────────┘ └─────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

**Components:**
1. **Sidebar** - Fixed left navigation
   - Logo at top
   - Navigation items with icons
   - Recent presentations quick access
   - Settings at bottom
   
2. **Stats Bar** - Quick metrics
   - Total presentations
   - Created this week
   - Drafts in progress
   
3. **Presentation Grid** - Main content
   - Card-based layout (3-4 columns responsive)
   - Each card shows: thumbnail/placeholder, title, profile badge, date, status
   - Hover reveals actions: View, Edit, Delete, Export
   - Empty state with CTA when no presentations

4. **Search & Filter**
   - Search by title
   - Filter by profile type
   - Sort by date, name, status

**Empty State:**
```
┌─────────────────────────────────────────────┐
│                                             │
│           [Illustration/Icon]               │
│                                             │
│      No presentations yet                   │
│                                             │
│   Create your first AI-powered              │
│   presentation in minutes                   │
│                                             │
│        [+ Create Presentation]              │
│                                             │
└─────────────────────────────────────────────┘
```

---

### Page 2: Create Presentation (Wizard Flow)

**Route:** `/create`

**Purpose:** Guided flow to create new presentations

**Layout - Step-based Wizard:**

```
┌─────────────────────────────────────────────────────────────────┐
│ [Header: N46.ai Logo]                    [Step Indicator] [X]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                     ┌───────────────────────────┐               │
│                     │                           │               │
│                     │   Step Content Area       │               │
│                     │                           │               │
│                     │   (Changes per step)      │               │
│                     │                           │               │
│                     │                           │               │
│                     │                           │               │
│                     └───────────────────────────┘               │
│                                                                 │
│                     [Back]           [Continue →]               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Step 1: Who Are You?** (User Profile Selection)
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    Who are you?                                 │
│          Choose your profile to optimize output                 │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────┐ │
│  │ 🎓          │  │ 💼          │  │ 🎉          │  │ 🔬      │ │
│  │             │  │             │  │             │  │         │ │
│  │  Student    │  │  Business   │  │  Social     │  │Scientific│ │
│  │             │  │             │  │             │  │         │ │
│  │ Learning,   │  │ Startups,   │  │ Events,     │  │Research,│ │
│  │ thesis      │  │ enterprise  │  │ celebrations│  │papers   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────┘ │
│                                                                 │
│                                  [Continue →]                   │
└─────────────────────────────────────────────────────────────────┘
```

**Step 2: What Are You Creating?** (Use Case Selection)
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│         What are you creating? (Business selected)              │
│                                                                 │
│  ┌────────────────────┐  ┌────────────────────┐                 │
│  │ 🚀 Pitch Deck      │  │ 🤝 Sales Proposal  │                 │
│  │ Investors, funding │  │ Client presentations│                │
│  └────────────────────┘  └────────────────────┘                 │
│                                                                 │
│  ┌────────────────────┐  ┌────────────────────┐                 │
│  │ 📊 Management      │  │ 🔍 Market Research │                 │
│  │ Reports & boards   │  │ Competitive intel  │                 │
│  └────────────────────┘  └────────────────────┘                 │
│                                                                 │
│  ┌────────────────────┐  ┌────────────────────┐                 │
│  │ 🗺️ Product Roadmap │  │ 👥 Training        │                 │
│  │ Strategy & planning│  │ Onboarding content │                 │
│  └────────────────────┘  └────────────────────┘                 │
│                                                                 │
│  [← Back]                            [Continue →]               │
└─────────────────────────────────────────────────────────────────┘
```

**Step 3: Content Input**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│              Tell us about your presentation                    │
│                                                                 │
│  Title                                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Series A Pitch Deck                                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Content / Prompt                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │ Describe what you want in your presentation...          │   │
│  │                                                         │   │
│  │                                                         │   │
│  │                                                         │   │
│  │                                                     [?] │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  💡 Try an example:                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │FinTech Pitch │ │ SaaS Seed   │ │ Custom      │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                 │
│  [← Back]                            [Continue →]               │
└─────────────────────────────────────────────────────────────────┘
```

**Step 4: Design Preferences**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                  Customize your design                          │
│                                                                 │
│  Content Density                                                │
│  Minimal ○───────────●───────────○ Information Dense            │
│  Impact                           Wall Street                   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  [Preview visualization showing density impact]         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Number of Slides                                               │
│  ┌──────┐                                                      │
│  │  10  │  slides                                              │
│  └──────┘                                                      │
│                                                                 │
│  Theme (optional)                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [Auto-select best theme] ▼                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [← Back]                          [✨ Generate →]              │
└─────────────────────────────────────────────────────────────────┘
```

**Step 5: Generation Progress**
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│                    ┌─────────────────┐                          │
│                    │                 │                          │
│                    │   [Animation]   │                          │
│                    │                 │                          │
│                    └─────────────────┘                          │
│                                                                 │
│                 Creating your presentation...                   │
│                                                                 │
│               ████████████░░░░░░░░░░  60%                      │
│                                                                 │
│                 Generating content...                           │
│                                                                 │
│              This usually takes 30-60 seconds                   │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Page 3: View/Preview Presentation

**Route:** `/presentation/:id`

**Purpose:** View generated presentation with export options

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ [← Back to Dashboard]     Pitch Deck      [Export ▼] [Open ↗]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │                                                         │   │
│  │                                                         │   │
│  │           [Gamma iFrame Embed]                          │   │
│  │                                                         │   │
│  │              or                                         │   │
│  │                                                         │   │
│  │         [Local Preview Component]                       │   │
│  │                                                         │   │
│  │                                                         │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Details                                                  │  │
│  │ Profile: Business > Pitch Deck                           │  │
│  │ Created: Jan 10, 2026                                    │  │
│  │ Slides: 10                                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Export Dropdown:**
- Open in Gamma (new tab)
- Download PDF
- Download PPTX
- Copy Link

---

### Page 4: Settings

**Route:** `/settings`

**Purpose:** Configure API key and preferences

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ [Sidebar]           │ Settings                                  │
│                     │                                           │
│                     │ ┌─────────────────────────────────────┐   │
│                     │ │ API Configuration                   │   │
│                     │ │                                     │   │
│                     │ │ Gamma API Key                       │   │
│                     │ │ ┌───────────────────────────────┐   │   │
│                     │ │ │ sk-gamma-••••••••••••••••     │   │   │
│                     │ │ └───────────────────────────────┘   │   │
│                     │ │                          [Update]   │   │
│                     │ │                                     │   │
│                     │ │ Status: ✅ Connected                │   │
│                     │ └─────────────────────────────────────┘   │
│                     │                                           │
│                     │ ┌─────────────────────────────────────┐   │
│                     │ │ Preferences                         │   │
│                     │ │                                     │   │
│                     │ │ Default Profile                     │   │
│                     │ │ ┌───────────────────────────────┐   │   │
│                     │ │ │ Business                   ▼  │   │   │
│                     │ │ └───────────────────────────────┘   │   │
│                     │ │                                     │   │
│                     │ │ Default Theme                       │   │
│                     │ │ ┌───────────────────────────────┐   │   │
│                     │ │ │ Auto-select              ▼    │   │   │
│                     │ │ └───────────────────────────────┘   │   │
│                     │ └─────────────────────────────────────┘   │
│                     │                                           │
│                     │ ┌─────────────────────────────────────┐   │
│                     │ │ Data                                │   │
│                     │ │                                     │   │
│                     │ │ [Clear All Data]                    │   │
│                     │ │ This will delete all presentations  │   │
│                     │ └─────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎭 ANIMATIONS & INTERACTIONS

### Micro-interactions

```typescript
// Tailwind animation classes to add to tailwind.config.js

module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
}
```

### Interaction Guidelines

1. **Button Hover:** Subtle lift (translateY(-1px)) + slight color change
2. **Card Hover:** Slight shadow increase + border color change
3. **Page Transitions:** Fade with slight movement
4. **Loading States:** Skeleton shimmer effect
5. **Success Feedback:** Subtle scale + green check animation
6. **Focus States:** Blue ring (box-shadow)

---

## 🚀 IMPLEMENTATION CHECKLIST

### Phase 1: Foundation (Day 1)
- [ ] Initialize Vite + React + TypeScript project
- [ ] Set up Tailwind CSS with custom config (colors, fonts, animations)
- [ ] Install dependencies: zustand, dexie, lucide-react, react-router-dom
- [ ] Create folder structure
- [ ] Set up Dexie database schema
- [ ] Create basic Layout component with Sidebar

### Phase 2: Dashboard (Day 1-2)
- [ ] Create Dashboard page with grid layout
- [ ] Build PresentationCard component
- [ ] Implement EmptyState component
- [ ] Add StatsBar component
- [ ] Implement search and filter functionality
- [ ] Add delete functionality with confirmation modal

### Phase 3: Creation Wizard (Day 2-3)
- [ ] Build CreateWizard with step navigation
- [ ] Create UserProfileSelector (Step 1)
- [ ] Create UseCaseSelector (Step 2)
- [ ] Create ContentInput with example prompts (Step 3)
- [ ] Create DesignCustomizer with density slider (Step 4)
- [ ] Build GenerationProgress component (Step 5)

### Phase 4: Gamma Integration (Day 3)
- [ ] Implement GammaClient API wrapper
- [ ] Create useGamma hook for API operations
- [ ] Build profile optimizer function
- [ ] Implement generation flow with polling
- [ ] Handle errors gracefully

### Phase 5: View & Export (Day 4)
- [ ] Create View page with iframe/preview
- [ ] Implement export dropdown
- [ ] Add "Open in Gamma" functionality
- [ ] Show presentation details

### Phase 6: Settings & Polish (Day 4)
- [ ] Build Settings page
- [ ] Implement API key management
- [ ] Add preferences storage
- [ ] Final UI polish and animations
- [ ] Test all flows end-to-end

---

## 📋 EXACT PROMPTS FOR CLAUDE CODE

### Prompt 1: Project Initialization

```
Create a new React + Vite + TypeScript project for N46.ai demo. 

Project name: n46-demo

Install these dependencies:
- react-router-dom
- zustand
- dexie
- lucide-react

Dev dependencies:
- tailwindcss
- postcss
- autoprefixer
- @types/node

Set up Tailwind with this custom configuration for the design system:

[Include the full tailwind.config.js from the Design System section above]

Create the folder structure as specified in the Technical Architecture section.

Set up the Dexie database with the schema for presentations and settings.

Create a basic App.tsx with React Router routes for:
- / (Dashboard)
- /create (Create wizard)
- /presentation/:id (View)
- /settings (Settings)

Add the Google Font 'Satoshi' from Fontshare and set up the CSS variables for the design system.
```

### Prompt 2: Layout & Sidebar

```
Create the Layout and Sidebar components for N46.ai.

The sidebar should:
- Be 240px wide, fixed on the left
- Have the N46.ai logo at the top (use the text "N46.ai" styled with the brand font)
- Navigation items: Dashboard (icon: LayoutDashboard), Create New (icon: Plus)
- A "Recent" section showing the last 3 presentations from IndexedDB
- Settings link at the bottom (icon: Settings)
- Use the N46 color palette (white background, subtle gray borders)
- Items should have hover states with the blue accent color

The Layout component should:
- Wrap the sidebar and main content area
- Main content should have generous padding (40px)
- Use the design system spacing variables

Style following Figma UI aesthetic: clean, minimal, lots of whitespace, thin borders.
```

### Prompt 3: Dashboard Page

```
Create the Dashboard page for N46.ai with these components:

1. Header section with:
   - Welcome message
   - Primary CTA button "+ New Presentation" (navigates to /create)

2. StatsBar showing:
   - Total presentations count
   - Created this week count
   - Draft presentations count
   (Pull data from IndexedDB)

3. Search and Filter bar:
   - Search input for title search
   - Dropdown to filter by profile type (All, Student, Business, Social, Scientific)
   - Sort dropdown (Newest, Oldest, Alphabetical)

4. PresentationGrid:
   - Responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop)
   - Uses PresentationCard component

5. PresentationCard component:
   - Thumbnail area (placeholder gradient based on profile color)
   - Profile badge (colored pill showing Student/Business/etc)
   - Title
   - Date created
   - Status badge (Draft/Completed/Generating)
   - Hover reveals action buttons: View, Delete
   - Delete should show confirmation modal

6. EmptyState component:
   - Shown when no presentations exist
   - Illustration or icon
   - "No presentations yet" message
   - CTA to create first presentation

Use animations for card hover and page load (staggered fade-in for cards).
```

### Prompt 4: User Profiles Data

```
Create the user profiles and use cases data file at src/data/userProfiles.ts.

Include all 4 segments (Student, Business, Social, Scientific) with their use cases exactly as specified in this document:

[Include the full USER_PROFILES object from the User Profiles section]

Also create the example prompts file at src/data/examplePrompts.ts with pre-configured prompts for each profile/use case combination:

[Include the EXAMPLE_PROMPTS object]

Export both as named exports.
```

### Prompt 5: Create Wizard - Steps 1 & 2

```
Create the CreateWizard component and first two steps for the N46 presentation creation flow.

CreateWizard should:
- Manage step state (1-5)
- Show step indicator at top (small dots or numbers)
- Have navigation buttons (Back, Continue)
- Store selections in local state
- Close button (X) that navigates back to dashboard with confirmation if data entered

Step 1 - UserProfileSelector:
- Display 4 profile cards in a 2x2 or 1x4 grid
- Each card shows: Icon (use Lucide icons), Name, Description, Profile color accent
- Cards are selectable (only one at a time)
- Selected card has blue border and subtle background
- Smooth transition animations on selection

Step 2 - UseCaseSelector:
- Shows use cases for the selected profile
- 2-3 column grid of use case cards
- Each card: Icon, Name, Short description
- Single selection with visual feedback
- Include animation when profile changes (cards fade/slide in)

Use the USER_PROFILES data from the data file.
```

### Prompt 6: Create Wizard - Steps 3 & 4

```
Create Steps 3 and 4 of the CreateWizard.

Step 3 - ContentInput:
- Title input field (required)
- Large textarea for prompt/content (min 4 rows)
- Helper text explaining what to enter
- "Try an example" section with clickable chips that populate the textarea
- Show example prompts based on selected profile + use case
- Character count indicator

Step 4 - DesignCustomizer:
- Content Density slider (0-100)
  - Left end: "Minimal Impact" with Steve Jobs keynote style description
  - Right end: "Information Dense" with Wall Street analyst style description
  - Show a simple visual preview that changes with slider
  
- Number of slides input (number input, 5-30 range, default 10)

- Theme selector dropdown (optional)
  - Options: "Auto-select best theme" (default), plus fetch from Gamma API if available
  - For demo, can include some hardcoded theme names

- "Generate" button should be prominent with sparkle icon ✨

Store all values in wizard state for final submission.
```

### Prompt 7: Gamma API Client

```
Create the Gamma API client at src/api/gamma.ts.

Implement:
1. GammaClient class with:
   - Constructor taking API key
   - generate() method for POST /generations
   - getStatus() method for GET /generations/:id
   - getThemes() method for GET /themes
   - waitForCompletion() method that polls with exponential backoff

2. Type definitions for all request/response shapes

3. Error handling with meaningful error messages

[Include the full GammaClient implementation from the Gamma API Integration section]

Also create src/utils/profileOptimizer.ts that maps profile + use case + design preferences to Gamma API parameters:

[Include the optimizeForProfile function]

Create a useGamma hook at src/hooks/useGamma.ts that:
- Gets API key from settings in IndexedDB
- Returns functions: generatePresentation, checkStatus
- Handles loading and error states
- Returns status for UI updates
```

### Prompt 8: Generation Flow & Progress

```
Create Step 5 - GenerationProgress component and wire up the full generation flow.

GenerationProgress should:
- Show animated loader (pulsing logo or spinning icon)
- Display status text that updates: "Analyzing content...", "Generating slides...", "Finalizing design..."
- Progress bar (can be indeterminate or estimate based on typical generation time)
- "This usually takes 30-60 seconds" helper text
- Cancel button that returns to dashboard (with confirmation)

Wire up the generation:
1. When user clicks "Generate" in Step 4:
   - Validate all required fields
   - Save draft presentation to IndexedDB with status 'generating'
   - Call gamma.generate() with optimized parameters
   - Navigate to Step 5 (progress)
   
2. Poll for completion:
   - Call gamma.waitForCompletion()
   - Update IndexedDB with progress
   - On success: Update presentation with gammaUrl, status 'completed'
   - On failure: Update status to 'failed', show error message
   
3. On completion:
   - Navigate to /presentation/:id to view result

Handle edge cases:
- API key not set -> redirect to settings
- Generation fails -> show error with retry option
- User navigates away -> continue generation in background if possible
```

### Prompt 9: View Presentation Page

```
Create the View presentation page at /presentation/:id.

Components:
1. Header with:
   - Back button to dashboard
   - Presentation title
   - Export dropdown button
   - "Open in Gamma" button (opens gammaUrl in new tab)

2. Main viewer area:
   - Option A (iframe): Embed the Gamma presentation using iframe
     - gammaUrl can be embedded directly
     - Add /embed to the URL path for embed view
   - Option B (fallback): If iframe doesn't work well, show:
     - Large "Open Presentation" button
     - Preview image/placeholder

3. Details panel below:
   - Profile and use case badges
   - Created date
   - Number of slides
   - Generation parameters summary

4. Export dropdown options:
   - "Open in Gamma" (new tab)
   - "Download PDF" (if pdfUrl exists)
   - "Download PPTX" (if pptxUrl exists)
   - "Copy Link" (copies gammaUrl to clipboard with toast notification)

Handle loading state and 404 if presentation not found.

Decide between iframe and link-based viewing based on what works best. Test both approaches.
```

### Prompt 10: Settings Page

```
Create the Settings page with API configuration and preferences.

Sections:

1. API Configuration:
   - Gamma API Key input (password type, show/hide toggle)
   - Save button
   - Connection status indicator (test API on save)
   - Link to Gamma to get API key

2. Preferences:
   - Default Profile dropdown (None, Student, Business, Social, Scientific)
   - Default Theme dropdown (populated from Gamma API if connected)

3. Data Management:
   - "Clear All Presentations" button with destructive styling
   - Confirmation modal before clearing
   - Success toast on clear

Store settings in IndexedDB using the settings table.

Add a useSettings hook that:
- Loads settings on app init
- Provides updateSettings function
- Caches API key securely
```

### Prompt 11: Final Polish

```
Add final polish to the N46.ai demo:

1. Loading states:
   - Skeleton loaders for dashboard cards
   - Loading spinner for page transitions
   - Shimmer effect for loading content

2. Toast notifications:
   - Success: Presentation created, Settings saved, Link copied
   - Error: Generation failed, API error
   - Position: bottom-right, auto-dismiss after 4s

3. Animations:
   - Page transitions (fade)
   - Card hover effects
   - Button press feedback
   - Step transition in wizard (slide/fade)

4. Empty states and edge cases:
   - No API key set -> prompt in dashboard
   - Generation in progress -> show in card
   - Failed generation -> show retry option

5. Responsive design:
   - Sidebar collapses to icons on tablet
   - Sidebar becomes bottom nav on mobile
   - Grid adjusts columns appropriately

6. Keyboard navigation:
   - Tab through interactive elements
   - Enter to select/submit
   - Escape to close modals

7. Add favicon and update page title dynamically
```

---

## 🎯 SUCCESS CRITERIA

The demo is complete when:

1. ✅ User can create a new presentation through the wizard flow
2. ✅ Profile and use case selection visibly affects generation parameters
3. ✅ Presentation generates via Gamma API and displays result
4. ✅ User can view generated presentation (iframe or link)
5. ✅ User can manage presentations (view list, delete)
6. ✅ Settings page allows API key configuration
7. ✅ UI is clean, spacious, and distinctly different from Gamma
8. ✅ All data persists in IndexedDB
9. ✅ Demo works entirely client-side (no backend needed)
10. ✅ Error states are handled gracefully

---

## 📚 REFERENCE LINKS

- Gamma API Docs: https://developers.gamma.app/docs
- Gamma API v1.0: https://public-api.gamma.app/v1.0
- Fontshare (Satoshi font): https://www.fontshare.com/fonts/satoshi
- Lucide Icons: https://lucide.dev/icons
- Dexie.js: https://dexie.org/
- Zustand: https://zustand-demo.pmnd.rs/

---

**END OF DEVELOPMENT PLAN**
