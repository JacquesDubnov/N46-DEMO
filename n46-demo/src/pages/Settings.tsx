import { useState, useEffect } from 'react';
import {
  Eye,
  EyeOff,
  Check,
  X,
  Loader2,
  ExternalLink,
  Trash2,
  Key,
  Palette,
  Database,
} from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { clearAllPresentations, getPresentationStats } from '../api/presentations';
import { USER_PROFILES } from '../data/userProfiles';
import { GAMMA_API_KEY } from '../config';
import { ConfirmModal, useToast } from '../components/common';
import type { UserProfile } from '../types';

export function Settings() {
  // API Key state
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeySaved, setApiKeySaved] = useState(false);

  // Preferences state
  const [defaultProfile, setDefaultProfile] = useState<UserProfile | ''>('');
  const [defaultTheme, setDefaultTheme] = useState<string>('');

  // Data management state
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [presentationCount, setPresentationCount] = useState(0);

  const { addToast } = useToast();

  const {
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
  } = useSettings();

  // Load presentation count
  useEffect(() => {
    async function loadStats() {
      const stats = await getPresentationStats();
      setPresentationCount(stats.total);
    }
    loadStats();
  }, []);

  // Initialize form with settings
  useEffect(() => {
    if (settings) {
      setApiKeyInput(settings.gammaApiKey || '');
      setDefaultProfile(settings.defaultProfile || '');
      setDefaultTheme(settings.defaultThemeId || '');
    }
  }, [settings]);

  async function handleSaveApiKey() {
    const success = await updateSettings({ gammaApiKey: apiKeyInput || undefined });
    if (success) {
      setApiKeySaved(true);
      setTimeout(() => setApiKeySaved(false), 3000);
      addToast('success', 'API key saved');
      // Test connection with new key
      const keyToTest = apiKeyInput || GAMMA_API_KEY;
      await testConnection(keyToTest);
      await fetchThemes(keyToTest);
    } else {
      addToast('error', 'Failed to save API key');
    }
  }

  async function handleSaveDefaultProfile(profile: UserProfile | '') {
    setDefaultProfile(profile);
    await updateSettings({ defaultProfile: profile || undefined });
  }

  async function handleSaveDefaultTheme(themeId: string) {
    setDefaultTheme(themeId);
    await updateSettings({ defaultThemeId: themeId || undefined });
  }

  async function handleClearPresentations() {
    await clearAllPresentations();
    setPresentationCount(0);
    setShowClearConfirm(false);
    addToast('success', 'All presentations cleared');
  }

  function getConnectionStatusDisplay() {
    switch (connectionStatus) {
      case 'testing':
        return (
          <span className="inline-flex items-center gap-1.5 text-yellow-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            Testing...
          </span>
        );
      case 'connected':
        return (
          <span className="inline-flex items-center gap-1.5 text-green-600">
            <Check className="w-4 h-4" />
            Connected
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 text-red-600">
            <X className="w-4 h-4" />
            Connection failed
          </span>
        );
      default:
        return (
          <span className="text-n46-gray-400">
            Not tested
          </span>
        );
    }
  }

  function isUsingDefaultKey(): boolean {
    return !apiKeyInput || apiKeyInput === GAMMA_API_KEY;
  }

  if (isLoading) {
    return (
      <div className="animate-fade-in flex items-center justify-center py-24">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-n46-blue animate-spin mx-auto mb-4" />
          <p className="text-n46-gray-500">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-n46-gray-900">
          Settings
        </h1>
        <p className="text-n46-gray-500 mt-1">
          Configure your API key and preferences
        </p>
      </div>

      {/* API Configuration */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-n46-blue/10 flex items-center justify-center">
            <Key className="w-5 h-5 text-n46-blue" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-n46-gray-900">
              API Configuration
            </h2>
            <p className="text-sm text-n46-gray-500">
              Connect to Gamma API for presentation generation
            </p>
          </div>
        </div>

        {/* API Key Input */}
        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-sm font-medium text-n46-gray-700 mb-2">
            Gamma API Key
          </label>
          <div className="relative">
            <input
              id="apiKey"
              type={showApiKey ? 'text' : 'password'}
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder={`Using default key: ${GAMMA_API_KEY.slice(0, 15)}...`}
              className="w-full px-4 py-3 pr-24 rounded-lg border border-n46-gray-200 focus:border-n46-blue focus:ring-2 focus:ring-n46-blue/20 transition-all outline-none font-mono text-sm"
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-12 top-1/2 -translate-y-1/2 p-2 text-n46-gray-400 hover:text-n46-gray-600 transition-colors"
              type="button"
            >
              {showApiKey ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleSaveApiKey}
              disabled={isSaving}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-n46-blue text-white text-sm font-medium rounded-md hover:bg-n46-blue-light transition-colors disabled:opacity-50"
              type="button"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : apiKeySaved ? (
                <Check className="w-4 h-4" />
              ) : (
                'Save'
              )}
            </button>
          </div>

          {/* Status and helper text */}
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm">
              <span className="text-n46-gray-500 mr-2">Status:</span>
              {getConnectionStatusDisplay()}
            </div>
            {isUsingDefaultKey() && (
              <span className="text-xs text-n46-gray-400 bg-n46-gray-100 px-2 py-1 rounded">
                Using demo key
              </span>
            )}
          </div>
        </div>

        {/* Get API Key Link */}
        <a
          href="https://gamma.app/settings/api"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-n46-blue hover:text-n46-blue-light transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Get your Gamma API key
        </a>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      {/* Preferences */}
      <div className="card mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Palette className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-n46-gray-900">
              Preferences
            </h2>
            <p className="text-sm text-n46-gray-500">
              Set default options for new presentations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Default Profile */}
          <div>
            <label htmlFor="defaultProfile" className="block text-sm font-medium text-n46-gray-700 mb-2">
              Default Profile
            </label>
            <select
              id="defaultProfile"
              value={defaultProfile}
              onChange={(e) => handleSaveDefaultProfile(e.target.value as UserProfile | '')}
              className="w-full px-4 py-3 rounded-lg border border-n46-gray-200 focus:border-n46-blue focus:ring-2 focus:ring-n46-blue/20 transition-all outline-none bg-white"
            >
              <option value="">None (ask each time)</option>
              {Object.values(USER_PROFILES).map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-n46-gray-400">
              Pre-select this profile when creating presentations
            </p>
          </div>

          {/* Default Theme */}
          <div>
            <label htmlFor="defaultTheme" className="block text-sm font-medium text-n46-gray-700 mb-2">
              Default Theme
            </label>
            <select
              id="defaultTheme"
              value={defaultTheme}
              onChange={(e) => handleSaveDefaultTheme(e.target.value)}
              disabled={isLoadingThemes || connectionStatus !== 'connected'}
              className="w-full px-4 py-3 rounded-lg border border-n46-gray-200 focus:border-n46-blue focus:ring-2 focus:ring-n46-blue/20 transition-all outline-none bg-white disabled:bg-n46-gray-50 disabled:cursor-not-allowed"
            >
              <option value="">None (use Gamma default)</option>
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-n46-gray-400">
              {isLoadingThemes
                ? 'Loading themes...'
                : connectionStatus !== 'connected'
                  ? 'Connect to Gamma to load themes'
                  : `${themes.length} themes available`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <Database className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-n46-gray-900">
              Data Management
            </h2>
            <p className="text-sm text-n46-gray-500">
              Manage your local presentation data
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-n46-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-n46-gray-900">
              Clear All Presentations
            </p>
            <p className="text-sm text-n46-gray-500">
              {presentationCount === 0
                ? 'No presentations stored'
                : `${presentationCount} presentation${presentationCount !== 1 ? 's' : ''} stored locally`
              }
            </p>
          </div>
          <button
            onClick={() => setShowClearConfirm(true)}
            disabled={presentationCount === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg font-medium text-sm hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>

        <p className="mt-3 text-xs text-n46-gray-400">
          This will permanently delete all presentations from your local storage. Your presentations in Gamma will not be affected.
        </p>
      </div>

      {/* Clear Confirmation Modal */}
      <ConfirmModal
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={handleClearPresentations}
        title="Clear all presentations?"
        message={`This will permanently delete all ${presentationCount} presentation${presentationCount !== 1 ? 's' : ''} from your local storage. This action cannot be undone.`}
        confirmLabel="Clear All"
        cancelLabel="Cancel"
        variant="danger"
      />
    </div>
  );
}
