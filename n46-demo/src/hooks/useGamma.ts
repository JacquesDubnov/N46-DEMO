import { useState, useCallback, useEffect } from 'react';
import { GammaClient, GammaApiError, type GammaStatusResponse, type GammaTheme } from '../api/gamma';
import { getSettings } from '../db';
import { optimizeForProfile, buildGammaParams, type DesignPreferences } from '../utils/profileOptimizer';
import { GAMMA_API_KEY } from '../config';
import type { UserProfile } from '../types';

export type GenerationState = 'idle' | 'starting' | 'generating' | 'completed' | 'failed';

export interface GenerationProgress {
  state: GenerationState;
  generationId?: string;
  progress?: number; // 0-100 estimated progress
  message: string;
  gammaUrl?: string;
  pdfUrl?: string;
  pptxUrl?: string;
  error?: string;
}

export type GenerationResult = GammaStatusResponse;

export interface UseGammaReturn {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  progress: GenerationProgress;
  themes: GammaTheme[];
  generatePresentation: (params: GeneratePresentationParams) => Promise<GenerationResult | null>;
  checkStatus: (generationId: string) => Promise<GammaStatusResponse | null>;
  fetchThemes: () => Promise<void>;
  testConnection: () => Promise<boolean>;
  resetProgress: () => void;
}

export interface GeneratePresentationParams {
  title: string;
  prompt: string;
  profileId: UserProfile;
  useCaseId: string;
  designPreferences: DesignPreferences;
  themeId?: string | null;
}

const PROGRESS_MESSAGES = [
  'Analyzing your content...',
  'Generating slide structure...',
  'Creating visuals...',
  'Applying design theme...',
  'Finalizing presentation...',
];

export function useGamma(): UseGammaReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [themes, setThemes] = useState<GammaTheme[]>([]);
  const [progress, setProgress] = useState<GenerationProgress>({
    state: 'idle',
    message: '',
  });

  // Get API key: use settings override if available, otherwise use hardcoded demo key
  const getApiKey = useCallback(async (): Promise<string> => {
    const settings = await getSettings();
    return settings?.gammaApiKey || GAMMA_API_KEY;
  }, []);

  const getClient = useCallback(async (): Promise<GammaClient> => {
    const apiKey = await getApiKey();
    return new GammaClient(apiKey);
  }, [getApiKey]);

  const testConnection = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const client = await getClient();
      const connected = await client.testConnection();
      setIsConnected(connected);
      if (!connected) {
        setError('Failed to connect to Gamma API. Please check your API key.');
      }
      return connected;
    } catch (err) {
      const message = err instanceof GammaApiError ? err.message : 'Connection test failed';
      setError(message);
      setIsConnected(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getClient]);

  const fetchThemes = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const client = await getClient();
      const fetchedThemes = await client.getThemes();
      setThemes(fetchedThemes);
      setIsConnected(true);
    } catch (err) {
      const message = err instanceof GammaApiError ? err.message : 'Failed to fetch themes';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [getClient]);

  const checkStatus = useCallback(async (generationId: string): Promise<GammaStatusResponse | null> => {
    try {
      const client = await getClient();
      return await client.getStatus(generationId);
    } catch (err) {
      const message = err instanceof GammaApiError ? err.message : 'Failed to check status';
      setError(message);
      return null;
    }
  }, [getClient]);

  const generatePresentation = useCallback(async (
    params: GeneratePresentationParams
  ): Promise<GenerationResult | null> => {
    setIsLoading(true);
    setError(null);
    setProgress({
      state: 'starting',
      message: 'Preparing your presentation...',
      progress: 0,
    });

    try {
      const client = await getClient();

      // Optimize parameters based on profile and use case
      const optimizedParams = optimizeForProfile(
        params.profileId,
        params.useCaseId,
        params.designPreferences
      );

      // Build the Gamma API parameters
      const gammaParams = buildGammaParams(
        params.title,
        params.prompt,
        optimizedParams,
        params.themeId
      );

      // Log the parameters being sent to Gamma API
      console.log('[Gamma API] Generation params:', JSON.stringify(gammaParams, null, 2));

      setProgress({
        state: 'generating',
        message: PROGRESS_MESSAGES[0],
        progress: 10,
      });

      // Start generation
      const { generationId } = await client.generate(gammaParams);

      setProgress({
        state: 'generating',
        generationId,
        message: PROGRESS_MESSAGES[1],
        progress: 20,
      });

      // Poll for completion with progress updates
      let progressIndex = 1;
      const result = await client.waitForCompletion(
        generationId,
        (status) => {
          // Increment progress and cycle through messages
          progressIndex = Math.min(progressIndex + 1, PROGRESS_MESSAGES.length - 1);
          const estimatedProgress = Math.min(20 + progressIndex * 15, 90);

          setProgress({
            state: 'generating',
            generationId: status.generationId,
            message: PROGRESS_MESSAGES[progressIndex],
            progress: estimatedProgress,
          });
        }
      );

      setProgress({
        state: 'completed',
        generationId: result.generationId,
        message: 'Presentation created successfully!',
        progress: 100,
        gammaUrl: result.gammaUrl,
        pdfUrl: result.pdfUrl,
        pptxUrl: result.pptxUrl,
      });

      return result;
    } catch (err) {
      console.error('[Gamma API] Generation error:', err);

      const message = err instanceof GammaApiError
        ? err.message
        : err instanceof Error
          ? err.message
          : 'Generation failed';

      // Log additional details for GammaApiError
      if (err instanceof GammaApiError) {
        console.error('[Gamma API] Status code:', err.statusCode);
        console.error('[Gamma API] Error details:', err.details);
      }

      setProgress({
        state: 'failed',
        message: 'Generation failed',
        error: message,
      });
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [getClient]);

  const resetProgress = useCallback(() => {
    setProgress({
      state: 'idle',
      message: '',
    });
    setError(null);
  }, []);

  // Test connection on mount
  useEffect(() => {
    testConnection();
  }, [testConnection]);

  return {
    isConnected,
    isLoading,
    error,
    progress,
    themes,
    generatePresentation,
    checkStatus,
    fetchThemes,
    testConnection,
    resetProgress,
  };
}
