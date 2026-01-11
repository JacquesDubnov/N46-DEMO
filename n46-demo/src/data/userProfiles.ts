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
        icon: 'Handshake',
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
} as const;

export type UserProfileId = keyof typeof USER_PROFILES;
export type UserProfile = typeof USER_PROFILES[UserProfileId];
export type UseCase = UserProfile['useCases'][number];
