import { USER_PROFILES } from '../data/userProfiles';
import type { GammaGenerateParams } from '../api/gamma';
import type { ImageStyle } from '../types';

export interface OptimizedParams {
  textOptions: {
    amount: 'brief' | 'medium' | 'detailed' | 'extensive';
    tone: string;
    audience: string;
    language: string;
  };
  additionalInstructions: string;
  imageOptions: {
    source: 'aiGenerated' | 'pictographic' | 'unsplash' | 'placeholder' | 'noImages';
    style: string;
  };
  cardOptions: {
    dimensions: 'fluid' | '16x9' | '4x3';
  };
  numCards: number;
  designMode: 'studio' | 'classic';
}

export type SlideDimensions = 'fluid' | '16x9' | '4x3';

export interface DesignPreferences {
  density: number; // 0-100, 0 = minimal, 100 = dense
  numSlides: number;
  imageStyle: ImageStyle;
  slideDimensions: SlideDimensions;
}

// Map user-friendly image style to Gamma API style string
const IMAGE_STYLE_TO_GAMMA: Record<ImageStyle, string> = {
  photo: 'photographic, realistic photography, high quality photo',
  illustration: 'illustration, hand-drawn style, artistic illustration',
  abstract: 'abstract, geometric shapes, modern abstract design',
  '3d': '3D render, three-dimensional, realistic 3D graphics',
  lineArt: 'line art, minimalist, clean outline drawing',
};

// Profile-specific style modifiers that combine with the user's image style choice
const PROFILE_STYLE_MODIFIER: Record<string, string> = {
  student: 'educational, clear, diagram-friendly',
  business: 'professional, modern, corporate',
  social: 'vibrant, emotional, engaging',
  scientific: 'technical, precise, data-visualization',
};

function densityToTextAmount(density: number): 'brief' | 'medium' | 'detailed' | 'extensive' {
  if (density < 25) return 'brief';
  if (density < 50) return 'medium';
  if (density < 75) return 'detailed';
  return 'extensive';
}

// Determine design mode based on density
// Studio mode: For low to mid density (<=50) - full image cards, cinematic visual impact
// Classic mode: For higher density (>50) - information-rich presentations with visuals
function densityToDesignMode(density: number): 'studio' | 'classic' {
  return density <= 50 ? 'studio' : 'classic';
}

// Build density-based instructions that OVERRIDE all other text/visual settings
// This is the PRIMARY instruction set - density takes absolute precedence
function buildDensityInstructions(density: number): string {
  if (density < 15) {
    // Minimum density: Just title + full-screen image
    return `
=== DENSITY OVERRIDE (CRITICAL - HIGHEST PRIORITY) ===
ULTRA-MINIMAL MODE - THIS OVERRIDES ALL OTHER INSTRUCTIONS:
- EACH SLIDE: ONE full-screen background image + ONE title (max 5 words)
- NO bullet points, NO paragraphs, NO lists, NO body text whatsoever
- NO subtitles, NO captions, NO descriptions
- The image MUST cover 100% of the slide as the background
- Text is ONLY a short headline overlaid on the image
- Think: Magazine cover or movie poster - pure visual impact
- IGNORE any other instructions about text amount or content structure
- Total text per slide: Maximum 5 words
`;
  } else if (density < 35) {
    // Low density: Headline + minimal supporting text + prominent image
    return `
=== DENSITY OVERRIDE (CRITICAL - HIGHEST PRIORITY) ===
MINIMAL MODE - THIS OVERRIDES ALL OTHER INSTRUCTIONS:
- EACH SLIDE: Full-screen background image + headline + 1 short sentence max
- The image MUST be the dominant element (full-bleed background)
- Maximum 15 words of text per slide total
- NO bullet lists, NO detailed content, NO paragraphs
- Only: Title + one supporting line overlaid on image
- Think: Apple keynote style - visual-first, text-minimal
- IGNORE any structure suggestions that add more text
`;
  } else if (density < 50) {
    // Medium-low: Visual-heavy with light content
    return `
=== DENSITY OVERRIDE (CRITICAL - HIGHEST PRIORITY) ===
VISUAL-FIRST MODE - THIS OVERRIDES ALL OTHER INSTRUCTIONS:
- Large background images are the primary content
- Headlines + 2-3 bullet points maximum per slide
- Keep text brief and punchy - no full sentences
- Images should occupy majority of slide space
- Total text per slide: Maximum 30 words
- Prioritize visual storytelling over text content
`;
  } else if (density < 65) {
    // Medium: Balanced content
    return `
=== DENSITY INSTRUCTIONS ===
BALANCED MODE:
- Equal emphasis on visuals and text content
- Include images/charts alongside text content
- Allow 3-5 bullet points or short paragraphs per slide
- Every slide must have a visual element (image, chart, diagram)
- Mix of text and visuals for comprehensive coverage
`;
  } else if (density < 80) {
    // Medium-high: Information-rich with visuals
    return `
=== DENSITY INSTRUCTIONS ===
DETAILED MODE:
- Information-dense slides with thorough content
- Include detailed bullet points, explanations, and data
- Add charts, tables, and diagrams where relevant
- Support claims with evidence and examples
- 5-8 points per slide is acceptable
- Still include relevant images to break up text
`;
  } else {
    // Maximum density: Data-heavy, comprehensive
    return `
=== DENSITY OVERRIDE (CRITICAL - HIGHEST PRIORITY) ===
MAXIMUM INFORMATION MODE - THIS OVERRIDES ALL OTHER INSTRUCTIONS:
- Pack each slide with comprehensive information
- Include detailed text, multiple bullet points, full paragraphs
- Add data tables, charts, graphs, and statistics wherever possible
- Include citations, footnotes, and detailed explanations
- Fill slides with thorough, in-depth content
- Use smaller fonts if needed to fit more information
- Include supporting images, but text/data is the priority
- Think: Academic paper or detailed report format
- Each slide should be information-complete and self-contained
`;
  }
}

// Build studio mode instructions for Gamma API
// Studio mode creates full-image cards with cinematic visual effects
function buildStudioModeInstructions(designMode: 'studio' | 'classic'): string {
  if (designMode === 'studio') {
    return `
STUDIO MODE - FULL IMAGE SLIDES:
- Each slide MUST be a full-bleed background image covering the entire card
- The image IS the slide - text overlays the image, not beside it
- Generate dramatic, cinematic AI images
- Use bold, high-contrast text that overlays the full-image background
`;
  }
  return `
CLASSIC MODE:
- Every slide must include at least one relevant image or visual element
- Balance text content with supporting visuals
- Include charts, diagrams, or icons where appropriate
`;
}

// Build visual requirement instructions to ensure every slide has imagery
function buildVisualRequirementInstructions(): string {
  return `
VISUAL REQUIREMENTS:
- EVERY slide MUST have at least one image, chart, diagram, or visual element
- No text-only slides are allowed
- Generate AI images for any slide lacking visual content
- Use relevant, high-quality visuals that support the slide content
- Include visual variety: photos, illustrations, icons, charts, or diagrams as appropriate
`;
}

// Build the combined image style string from user choice + profile modifier
function buildImageStyle(imageStyle: ImageStyle, profileId: string): string {
  const baseStyle = IMAGE_STYLE_TO_GAMMA[imageStyle];
  const profileModifier = PROFILE_STYLE_MODIFIER[profileId];

  if (profileModifier) {
    return `${baseStyle}, ${profileModifier}`;
  }
  return baseStyle;
}

export function optimizeForProfile(
  profileId: string,
  useCaseId: string,
  designPreferences: DesignPreferences
): OptimizedParams {
  const profile = USER_PROFILES[profileId as keyof typeof USER_PROFILES];
  const useCase = profile?.useCases.find(uc => uc.id === useCaseId);
  const designMode = densityToDesignMode(designPreferences.density);
  const imageStyleString = buildImageStyle(designPreferences.imageStyle, profileId);

  // DENSITY INSTRUCTIONS GO FIRST - they take absolute precedence
  const densityInstructions = buildDensityInstructions(designPreferences.density);
  const studioModeInstructions = buildStudioModeInstructions(designMode);
  const visualRequirements = buildVisualRequirementInstructions();

  if (!profile || !useCase) {
    // Fallback to defaults - density still comes first
    return {
      textOptions: {
        amount: densityToTextAmount(designPreferences.density),
        tone: 'professional',
        audience: 'general audience',
        language: 'en',
      },
      // Density instructions FIRST to override everything else
      additionalInstructions: `${densityInstructions}\n${studioModeInstructions}\n${visualRequirements}`,
      imageOptions: {
        source: 'aiGenerated',
        style: imageStyleString,
      },
      cardOptions: {
        dimensions: designPreferences.slideDimensions || 'fluid',
      },
      numCards: designPreferences.numSlides,
      designMode,
    };
  }

  const baseMapping = useCase.gammaMapping;
  const textAmount = densityToTextAmount(designPreferences.density);

  // DENSITY INSTRUCTIONS FIRST - they override use case instructions
  // Order matters: density override > studio mode > visual requirements > use case specifics
  const combinedInstructions = `${densityInstructions}\n${studioModeInstructions}\n${visualRequirements}\n\n${baseMapping.additionalInstructions}`;

  return {
    textOptions: {
      amount: textAmount,
      tone: baseMapping.textOptions.tone,
      audience: baseMapping.textOptions.audience,
      language: 'en',
    },
    additionalInstructions: combinedInstructions,
    imageOptions: {
      source: 'aiGenerated',
      style: imageStyleString,
    },
    cardOptions: {
      dimensions: designPreferences.slideDimensions || 'fluid',
    },
    numCards: designPreferences.numSlides,
    designMode,
  };
}

export function buildGammaParams(
  title: string,
  prompt: string,
  optimizedParams: OptimizedParams,
  themeId?: string | null
): GammaGenerateParams {
  // Combine title and prompt into inputText
  const inputText = `Title: ${title}\n\n${prompt}`;

  const params: GammaGenerateParams = {
    inputText,
    textMode: 'generate',
    format: 'presentation',
    numCards: optimizedParams.numCards,
    additionalInstructions: optimizedParams.additionalInstructions,
    textOptions: {
      amount: optimizedParams.textOptions.amount,
      tone: optimizedParams.textOptions.tone,
      audience: optimizedParams.textOptions.audience,
      language: optimizedParams.textOptions.language,
    },
    imageOptions: {
      source: optimizedParams.imageOptions.source,
      style: optimizedParams.imageOptions.style,
    },
    cardOptions: {
      dimensions: optimizedParams.cardOptions.dimensions,
    },
  };

  // Only include themeId if it's a valid string (not null, undefined, or empty)
  if (themeId && typeof themeId === 'string' && themeId.trim()) {
    params.themeId = themeId;
  }

  return params;
}
