import { useState, useEffect, useCallback } from 'react';
import { getSettings, saveSettings } from '../db';
import { GammaClient } from '../api/gamma';
import { GAMMA_API_KEY } from '../config';
import type { UserSettings } from '../types';
import type { GammaTheme } from '../api/gamma';

export interface UseSettingsReturn {
  settings: UserSettings | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  themes: GammaTheme[];
  isLoadingThemes: boolean;
  connectionStatus: 'untested' | 'testing' | 'connected' | 'failed';
  updateSettings: (updates: Partial<UserSettings>) => Promise<boolean>;
  testConnection: (apiKey?: string) => Promise<boolean>;
  fetchThemes: (apiKey?: string) => Promise<void>;
  getEffectiveApiKey: () => string;
}

export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [themes, setThemes] = useState<GammaTheme[]>([]);
  const [isLoadingThemes, setIsLoadingThemes] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'untested' | 'testing' | 'connected' | 'failed'>('untested');

  // Load settings on mount
  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSettings();
        setSettings(data || null);
      } catch (err) {
        console.error('Failed to load settings:', err);
        setError('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  // Get the effective API key (settings override or hardcoded)
  const getEffectiveApiKey = useCallback((): string => {
    return settings?.gammaApiKey || GAMMA_API_KEY;
  }, [settings?.gammaApiKey]);

  // Test connection with given API key or current effective key
  const testConnection = useCallback(async (apiKey?: string): Promise<boolean> => {
    const keyToTest = apiKey || getEffectiveApiKey();
    setConnectionStatus('testing');
    setError(null);

    try {
      const client = new GammaClient(keyToTest);
      const connected = await client.testConnection();

      if (connected) {
        setConnectionStatus('connected');
        return true;
      }

      setConnectionStatus('failed');
      setError('Failed to connect to Gamma API. Please check your API key.');
      return false;
    } catch (err) {
      setConnectionStatus('failed');
      setError('Connection test failed');
      return false;
    }
  }, [getEffectiveApiKey]);

  // Fetch themes from Gamma API
  const fetchThemes = useCallback(async (apiKey?: string): Promise<void> => {
    const keyToUse = apiKey || getEffectiveApiKey();
    setIsLoadingThemes(true);

    try {
      const client = new GammaClient(keyToUse);
      const fetchedThemes = await client.getThemes();
      setThemes(fetchedThemes);
    } catch (err) {
      console.error('Failed to fetch themes:', err);
    } finally {
      setIsLoadingThemes(false);
    }
  }, [getEffectiveApiKey]);

  // Update settings
  const updateSettings = useCallback(async (updates: Partial<UserSettings>): Promise<boolean> => {
    setIsSaving(true);
    setError(null);

    try {
      await saveSettings(updates);
      setSettings(prev => prev ? { ...prev, ...updates } : { ...updates });
      return true;
    } catch (err) {
      console.error('Failed to save settings:', err);
      setError('Failed to save settings');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Test connection on mount if we have an API key
  useEffect(() => {
    if (!isLoading) {
      testConnection();
      fetchThemes();
    }
  }, [isLoading, testConnection, fetchThemes]);

  return {
    settings,
    isLoading,
    isSaving,
    error,
    themes,
    isLoadingThemes,
    connectionStatus,
    updateSettings,
    testConnection,
    fetchThemes,
    getEffectiveApiKey,
  };
}
