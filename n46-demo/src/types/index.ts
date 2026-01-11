export type UserProfile = 'student' | 'business' | 'social' | 'scientific';

export type PresentationStatus = 'draft' | 'generating' | 'completed' | 'failed';

export type ImageStyle = 'photo' | 'illustration' | 'abstract' | '3d' | 'lineArt';

export interface TextOptions {
  amount: 'brief' | 'medium' | 'detailed' | 'extensive';
  tone: string;
  audience: string;
  language: string;
}

export interface ImageOptions {
  source: 'aiGenerated' | 'pictographic' | 'unsplash' | 'placeholder' | 'noImages';
  model?: string;
  style?: string;
}

export interface CardOptions {
  dimensions: 'fluid' | '16x9' | '4x3';
}

export interface GenerationParams {
  textMode: 'generate' | 'condense' | 'preserve';
  format: 'presentation' | 'document' | 'social' | 'webpage';
  themeId?: string;
  numCards: number;
  textOptions: TextOptions;
  imageOptions: ImageOptions;
  cardOptions: CardOptions;
}

export interface Presentation {
  id?: number;
  title: string;
  description?: string;

  // Creation context
  userProfile: UserProfile;
  useCase: string;
  prompt: string;

  // Gamma response data
  gammaId?: string;
  gammaUrl?: string;
  generationId?: string;
  status: PresentationStatus;

  // Export URLs (temporary)
  pdfUrl?: string;
  pptxUrl?: string;

  // Generation parameters used
  generationParams: GenerationParams;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  thumbnailUrl?: string;
}

export interface UserSettings {
  id?: number;
  gammaApiKey?: string;
  defaultProfile?: UserProfile;
  defaultThemeId?: string;
  lastUsedProfile?: UserProfile;
  lastUsedUseCase?: string;
}

// Use case definition
export interface UseCase {
  id: string;
  name: string;
  description: string;
  icon: string;
  gammaMapping: {
    textOptions: {
      amount?: string;
      tone: string;
      audience: string;
    };
    additionalInstructions: string;
  };
}

// Profile definition
export interface ProfileDefinition {
  id: UserProfile;
  name: string;
  icon: string;
  description: string;
  color: string;
  useCases: UseCase[];
}

// API Types
export interface GammaGenerateParams {
  inputText: string;
  textMode: 'generate' | 'condense' | 'preserve';
  format: 'presentation' | 'document' | 'social' | 'webpage';
  themeId?: string;
  numCards?: number;
  cardSplit?: 'auto' | 'inputTextBreaks';
  additionalInstructions?: string;
  exportAs?: 'pdf' | 'pptx';
  textOptions?: Partial<TextOptions>;
  imageOptions?: Partial<ImageOptions>;
  cardOptions?: Partial<CardOptions>;
}

export interface GammaGenerateResponse {
  generationId: string;
}

export interface GammaStatusResponse {
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

export interface GammaTheme {
  id: string;
  name: string;
  thumbnailUrl?: string;
}
