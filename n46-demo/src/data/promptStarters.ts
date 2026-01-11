import type { UserProfileId } from './userProfiles';
import { USER_PROFILES } from './userProfiles';

/**
 * Structure templates for each profile + use case combination.
 * These define the presentation structure that will be auto-generated
 * when the user enters a subject.
 */
interface StructureTemplate {
  intro: string;
  sections: string[];
  closing: string;
}

const STRUCTURE_TEMPLATES: Record<UserProfileId, Record<string, StructureTemplate>> = {
  student: {
    'self-learning': {
      intro: 'Opening: Introduction to the concept and why it matters',
      sections: [
        'Background: Historical context and foundational concepts',
        'Key Concepts: Main principles and definitions',
        'Examples: Real-world applications and case studies',
        'Common Misconceptions: Clarifying frequent misunderstandings',
      ],
      closing: 'Summary: Key takeaways and further learning resources',
    },
    'essay-report': {
      intro: 'Introduction: Thesis statement and context',
      sections: [
        'Literature Review: Key scholarly perspectives',
        'Analysis: Main arguments and evidence',
        'Discussion: Implications and interpretations',
        'Counterarguments: Addressing alternative viewpoints',
      ],
      closing: 'Conclusion: Summary of findings and recommendations',
    },
    'topic-presentation': {
      intro: 'Hook: Attention-grabbing opening about the topic',
      sections: [
        'Background: Why this topic matters',
        'Key Points: 3-4 main concepts to cover',
        'Examples: Real-world applications and illustrations',
        'Interactive Element: Discussion questions for the class',
      ],
      closing: 'Summary: Key takeaways and next steps',
    },
    'science-project': {
      intro: 'Research Question: The problem being investigated',
      sections: [
        'Hypothesis: Prediction and reasoning',
        'Methodology: Experimental design and procedures',
        'Results: Data presentation and analysis',
        'Discussion: Interpretation of findings',
      ],
      closing: 'Conclusion: Summary and future research directions',
    },
    'thesis-defense': {
      intro: 'Research Significance: Why this work matters',
      sections: [
        'Literature Context: Gap in existing research',
        'Methodology: Research approach and rationale',
        'Key Findings: Main results and data',
        'Contributions: What this adds to the field',
      ],
      closing: 'Implications: Future work and broader impact',
    },
  },

  business: {
    'pitch-deck': {
      intro: 'Problem: The pain point being solved',
      sections: [
        'Solution: How this addresses the problem',
        'Market: Size and opportunity (TAM/SAM/SOM)',
        'Traction: Current progress and metrics',
        'Team: Why this team can execute',
      ],
      closing: 'Ask: Funding amount and use of funds',
    },
    'sales-proposal': {
      intro: 'Situation: Understanding the client\'s current state',
      sections: [
        'Pain Points: Specific challenges they face',
        'Solution: How your offering addresses these',
        'Proof: Case studies and testimonials',
        'ROI: Quantified value and benefits',
      ],
      closing: 'Next Steps: Clear call-to-action and timeline',
    },
    'management-report': {
      intro: 'Executive Summary: Key insights upfront',
      sections: [
        'Performance: KPIs vs targets',
        'Analysis: Trends and patterns',
        'Challenges: Risks and issues',
        'Recommendations: Proposed actions',
      ],
      closing: 'Action Items: Next steps with owners and deadlines',
    },
    'market-research': {
      intro: 'Overview: Research scope and objectives',
      sections: [
        'Market Size: TAM/SAM/SOM analysis',
        'Trends: Key market drivers and dynamics',
        'Competition: Competitive landscape mapping',
        'SWOT: Strengths, weaknesses, opportunities, threats',
      ],
      closing: 'Recommendations: Strategic implications and next steps',
    },
    'product-roadmap': {
      intro: 'Vision: Where we\'re headed',
      sections: [
        'Current State: Recent wins and progress',
        'Priorities: Strategic focus areas',
        'Timeline: Key milestones and deliverables',
        'Resources: Requirements and dependencies',
      ],
      closing: 'Success Metrics: How we\'ll measure progress',
    },
    'training-materials': {
      intro: 'Learning Objectives: What participants will learn',
      sections: [
        'Core Concepts: Step-by-step explanations',
        'Practical Examples: Real-world applications',
        'Common Mistakes: What to avoid',
        'Quick Reference: Key points summary',
      ],
      closing: 'Knowledge Check: Review questions and exercises',
    },
  },

  social: {
    'birthday': {
      intro: 'Opening: Celebration message and occasion',
      sections: [
        'Timeline: Journey through the years',
        'Memories: Favorite moments together',
        'Fun Facts: Inside jokes and stories',
        'Messages: Heartfelt wishes from loved ones',
      ],
      closing: 'Celebration: Looking ahead to the future',
    },
    'wedding': {
      intro: 'Welcome: Opening message for the couple',
      sections: [
        'How We Met: The beginning of their story',
        'Our Journey: Key moments and milestones',
        'The Proposal: How it happened',
        'Our Future: Dreams and plans together',
      ],
      closing: 'Closing: Heartfelt wishes for the newlyweds',
    },
    'travel-recap': {
      intro: 'Introduction: Where and when',
      sections: [
        'Highlights: Best places and experiences',
        'Adventures: Memorable moments',
        'Discoveries: Unexpected finds and surprises',
        'Recommendations: Tips for fellow travelers',
      ],
      closing: 'Closing: Final thoughts and best memories',
    },
    'roast-toast': {
      intro: 'Introduction: How I know the honoree',
      sections: [
        'Embarrassing Stories: Lovable mishaps',
        'What Makes Them Special: Genuine appreciation',
        'Memorable Quotes: Things they\'ve said',
        'Inside Jokes: Moments only we understand',
      ],
      closing: 'Toast: Heartfelt closing message',
    },
    'trivia-game': {
      intro: 'Welcome: Rules and how to play',
      sections: [
        'Round 1: Easy questions to warm up',
        'Round 2: Medium difficulty challenges',
        'Round 3: Hard questions for the brave',
        'Bonus Round: Special category or speed round',
      ],
      closing: 'Finale: Final scores and celebration',
    },
  },

  scientific: {
    'white-paper': {
      intro: 'Abstract: Overview and key contribution',
      sections: [
        'Problem Statement: Research question and significance',
        'Literature: Context and prior work',
        'Methodology: Approach and rationale',
        'Findings: Results and analysis',
      ],
      closing: 'Conclusion: Implications and future directions',
    },
    'conference-talk': {
      intro: 'Hook: Why this research matters',
      sections: [
        'Background: Context and prior work',
        'Approach: Methodology and innovation',
        'Results: Key findings with data',
        'Impact: What this means for the field',
      ],
      closing: 'Future Work: Next steps and open questions',
    },
    'grant-proposal': {
      intro: 'Significance: Why this research is important',
      sections: [
        'Innovation: What\'s new in this approach',
        'Methodology: Research plan and design',
        'Expected Outcomes: Anticipated results',
        'Broader Impacts: Benefits beyond academia',
      ],
      closing: 'Budget: Resource justification and timeline',
    },
    'lab-meeting': {
      intro: 'Update: Progress since last meeting',
      sections: [
        'Results: Recent findings and data',
        'Challenges: Obstacles encountered',
        'Analysis: Interpretation of results',
        'Next Steps: Planned experiments',
      ],
      closing: 'Discussion: Questions and feedback needed',
    },
    'poster-session': {
      intro: 'Introduction: Research question and context',
      sections: [
        'Methods: Visual overview of approach',
        'Results: Key figures and data',
        'Discussion: Interpretation of findings',
        'Contact: Author info and resources',
      ],
      closing: 'Conclusions: Main takeaways',
    },
  },
};

/**
 * Get the use case details from the user profiles data.
 */
function getUseCaseDetails(profileId: UserProfileId, useCaseId: string) {
  const profile = USER_PROFILES[profileId];
  const useCase = profile.useCases.find(uc => uc.id === useCaseId);
  return {
    profileName: profile.name,
    useCaseName: useCase?.name || useCaseId,
    audience: useCase?.gammaMapping?.textOptions?.audience || 'general audience',
    tone: useCase?.gammaMapping?.textOptions?.tone || 'professional',
  };
}

/**
 * Generate a structured prompt based on profile, use case, and subject.
 * This creates a full, editable prompt that guides the AI generation.
 */
export function generateStructuredPrompt(
  profileId: UserProfileId,
  useCaseId: string,
  subject: string
): string {
  const template = STRUCTURE_TEMPLATES[profileId]?.[useCaseId];
  const details = getUseCaseDetails(profileId, useCaseId);

  if (!template) {
    // Fallback for unknown use cases
    return `Create a ${details.useCaseName} about "${subject}" for ${details.audience}.

Structure:
- Introduction to the topic
- Main content sections
- Key points and examples
- Conclusion and summary

Tone: ${details.tone}`;
  }

  const structureSections = [
    `- ${template.intro}`,
    ...template.sections.map(section => `- ${section}`),
    `- ${template.closing}`,
  ].join('\n');

  return `Create a ${details.useCaseName} about "${subject}" for ${details.audience}.

Structure:
${structureSections}

Tone: ${details.tone}
Target audience: ${details.audience}`;
}

/**
 * Legacy function for backwards compatibility.
 * @deprecated Use generateStructuredPrompt instead
 */
export function getStarterPrompt(profileId: UserProfileId, useCaseId: string): string {
  return generateStructuredPrompt(profileId, useCaseId, '[Your topic here]');
}
