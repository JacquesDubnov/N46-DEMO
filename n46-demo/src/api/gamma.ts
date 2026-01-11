// Use proxy in development to avoid CORS issues
// In production, you'd need a backend server or serverless function
const GAMMA_API_BASE = import.meta.env.DEV
  ? '/api/gamma'  // Proxied through Vite dev server
  : 'https://public-api.gamma.app/v1.0';

export interface GammaGenerateParams {
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
  previewUrl?: string;
}

export class GammaApiError extends Error {
  statusCode?: number;
  details?: unknown;

  constructor(message: string, statusCode?: number, details?: unknown) {
    super(message);
    this.name = 'GammaApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class GammaClient {
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new GammaApiError('API key is required');
    }
    this.apiKey = apiKey;
  }

  async generate(params: GammaGenerateParams): Promise<GammaGenerateResponse> {
    console.log('[GammaClient] Sending generate request to:', `${GAMMA_API_BASE}/generations`);

    const response = await fetch(`${GAMMA_API_BASE}/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,
      },
      body: JSON.stringify(params),
    });

    console.log('[GammaClient] Response status:', response.status);

    if (!response.ok) {
      let errorMessage = 'Failed to generate presentation';
      let errorDetails: unknown;

      try {
        const errorData = await response.json();
        console.error('[GammaClient] Error response:', errorData);
        errorMessage = errorData.message || errorData.error || errorMessage;
        errorDetails = errorData;
      } catch {
        // Response wasn't JSON
        const textResponse = await response.text().catch(() => 'Could not read response');
        console.error('[GammaClient] Non-JSON error response:', textResponse);
      }

      throw new GammaApiError(errorMessage, response.status, errorDetails);
    }

    const result = await response.json();
    console.log('[GammaClient] Generation started:', result);
    return result;
  }

  async getStatus(generationId: string): Promise<GammaStatusResponse> {
    const response = await fetch(`${GAMMA_API_BASE}/generations/${generationId}`, {
      headers: {
        'X-API-KEY': this.apiKey,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      let errorMessage = 'Failed to get generation status';
      let errorDetails: unknown;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
        errorDetails = errorData;
      } catch {
        // Response wasn't JSON
      }

      throw new GammaApiError(errorMessage, response.status, errorDetails);
    }

    return response.json();
  }

  async getThemes(): Promise<GammaTheme[]> {
    const response = await fetch(`${GAMMA_API_BASE}/themes`, {
      headers: {
        'X-API-KEY': this.apiKey,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new GammaApiError('Failed to fetch themes', response.status);
    }

    const data = await response.json();
    return data.data || [];
  }

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
        throw new GammaApiError(status.error || 'Generation failed');
      }

      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, delay));

      // Increase delay slightly but cap at 5 seconds
      delay = Math.min(delay * 1.2, 5000);
      attempts++;
    }

    throw new GammaApiError('Generation timed out after maximum attempts');
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.getThemes();
      return true;
    } catch {
      return false;
    }
  }
}
