import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Copy,
  ChevronDown,
  Loader2,
  Calendar,
  Layers,
  User,
  Tag,
  FileText,
  AlertCircle,
  Globe,
  RefreshCw,
  Database,
  Cloud,
  HardDrive,
  FileSpreadsheet,
  Presentation as PresentationIcon,
  Link2,
  Palette,
  Package,
  MessageSquare,
  Image,
  Users,
  Languages,
  FolderLock,
  Folder,
} from 'lucide-react';
import { getPresentation, addPresentation } from '../api/presentations';
import { USER_PROFILES } from '../data/userProfiles';
import { useToast } from '../components/common';
import { GammaClient } from '../api/gamma';
import { GAMMA_API_KEY } from '../config';
import { getSettings } from '../db';
import type { Presentation } from '../types';

// Supported languages for translation
const TRANSLATION_LANGUAGES = [
  { code: 'fr', name: 'French', flag: '🇫🇷', bgColor: 'bg-blue-100' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', bgColor: 'bg-yellow-100' },
  { code: 'de', name: 'German', flag: '🇩🇪', bgColor: 'bg-red-100' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', bgColor: 'bg-green-100' },
  { code: 'pt-br', name: 'Portuguese (Brazil)', flag: '🇧🇷', bgColor: 'bg-green-100' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', bgColor: 'bg-red-100' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', bgColor: 'bg-blue-100' },
  { code: 'zh-cn', name: 'Chinese (Simplified)', flag: '🇨🇳', bgColor: 'bg-red-100' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', bgColor: 'bg-green-100' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', bgColor: 'bg-blue-100' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', bgColor: 'bg-orange-100' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱', bgColor: 'bg-orange-100' },
];

type LoadingState = 'loading' | 'loaded' | 'not-found';

export function View() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [showTranslateDropdown, setShowTranslateDropdown] = useState(false);
  const [showDatabaseDropdown, setShowDatabaseDropdown] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatingLanguage, setTranslatingLanguage] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const translateRef = useRef<HTMLDivElement>(null);
  const databaseRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  useEffect(() => {
    async function loadPresentation() {
      if (!id) {
        setLoadingState('not-found');
        return;
      }

      const presentationId = parseInt(id, 10);
      if (isNaN(presentationId)) {
        setLoadingState('not-found');
        return;
      }

      const data = await getPresentation(presentationId);
      if (data) {
        setPresentation(data);
        setLoadingState('loaded');
      } else {
        setLoadingState('not-found');
      }
    }

    loadPresentation();
  }, [id]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowExportDropdown(false);
      }
      if (translateRef.current && !translateRef.current.contains(event.target as Node)) {
        setShowTranslateDropdown(false);
      }
      if (databaseRef.current && !databaseRef.current.contains(event.target as Node)) {
        setShowDatabaseDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function isMockPresentation(url: string): boolean {
    return url.startsWith('mock://');
  }

  function getEmbedUrl(gammaUrl: string): string {
    // Don't try to embed mock URLs
    if (isMockPresentation(gammaUrl)) {
      return '';
    }
    // Convert Gamma URL to embed URL
    // https://gamma.app/docs/... -> https://gamma.app/embed/...
    return gammaUrl.replace('/docs/', '/embed/');
  }

  async function handleCopyLink() {
    if (!presentation?.gammaUrl) return;

    try {
      await navigator.clipboard.writeText(presentation.gammaUrl);
      addToast('success', 'Link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
      addToast('error', 'Failed to copy link');
    }
    setShowExportDropdown(false);
  }

  function handleDownload(url: string) {
    window.open(url, '_blank');
    setShowExportDropdown(false);
  }

  function getProfileInfo(profileId: string) {
    const profile = USER_PROFILES[profileId as keyof typeof USER_PROFILES];
    return profile || null;
  }

  function getUseCaseInfo(profileId: string, useCaseId: string) {
    const profile = getProfileInfo(profileId);
    if (!profile) return null;
    return profile.useCases.find(uc => uc.id === useCaseId) || null;
  }

  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(date));
  }

  async function handleTranslate(languageCode: string, languageName: string) {
    if (!presentation) return;

    setShowTranslateDropdown(false);
    setIsTranslating(true);
    setTranslatingLanguage(languageName);

    try {
      // Get API key
      const settings = await getSettings();
      const apiKey = settings?.gammaApiKey || GAMMA_API_KEY;
      const client = new GammaClient(apiKey);

      // Build translation instruction to preserve original content
      const translationInstruction = `Translate this presentation to ${languageName}. Keep the exact same structure, layout, and slide organization. Preserve all formatting, bullet points, and section headers. Only translate the text content.`;

      // Create new presentation with translated content
      const { generationId } = await client.generate({
        inputText: presentation.prompt,
        textMode: 'generate',
        format: 'presentation',
        themeId: presentation.generationParams.themeId,
        numCards: presentation.generationParams.numCards,
        additionalInstructions: translationInstruction,
        textOptions: {
          amount: presentation.generationParams.textOptions.amount,
          tone: presentation.generationParams.textOptions.tone,
          audience: presentation.generationParams.textOptions.audience,
          language: languageCode,
        },
        imageOptions: {
          source: presentation.generationParams.imageOptions.source,
        },
        cardOptions: {
          dimensions: presentation.generationParams.cardOptions.dimensions,
        },
      });

      // Wait for completion
      const result = await client.waitForCompletion(generationId);

      // Save the translated presentation to the database
      const now = new Date();
      const translatedPresentation: Omit<Presentation, 'id'> = {
        title: `${presentation.title} (${languageName})`,
        description: presentation.description,
        userProfile: presentation.userProfile,
        useCase: presentation.useCase,
        prompt: presentation.prompt,
        status: 'completed',
        generationId: result.generationId,
        gammaUrl: result.gammaUrl,
        pdfUrl: result.pdfUrl,
        pptxUrl: result.pptxUrl,
        generationParams: {
          ...presentation.generationParams,
          textOptions: {
            ...presentation.generationParams.textOptions,
            language: languageCode,
          },
        },
        createdAt: now,
        updatedAt: now,
      };

      const newId = await addPresentation(translatedPresentation);

      addToast('success', `Presentation translated to ${languageName}!`);

      // Navigate to the new translated presentation
      navigate(`/presentation/${newId}`);
    } catch (err) {
      console.error('Translation failed:', err);
      addToast('error', `Failed to translate to ${languageName}. Please try again.`);
    } finally {
      setIsTranslating(false);
      setTranslatingLanguage(null);
    }
  }

  if (loadingState === 'loading') {
    return (
      <div className="animate-fade-in flex items-center justify-center py-24">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-n46-blue animate-spin mx-auto mb-4" />
          <p className="text-n46-gray-500">Loading presentation...</p>
        </div>
      </div>
    );
  }

  if (loadingState === 'not-found') {
    return (
      <div className="animate-fade-in">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-n46-gray-500 hover:text-n46-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="card text-center py-16">
          <AlertCircle className="w-12 h-12 text-n46-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-n46-gray-900 mb-2">
            Presentation not found
          </h2>
          <p className="text-n46-gray-500 mb-6">
            The presentation you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!presentation) return null;

  const profile = getProfileInfo(presentation.userProfile);
  const useCase = getUseCaseInfo(presentation.userProfile, presentation.useCase);
  const isMock = presentation.gammaUrl ? isMockPresentation(presentation.gammaUrl) : false;
  const hasExportOptions = !isMock && (presentation.pdfUrl || presentation.pptxUrl || presentation.gammaUrl);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-n46-gray-500 hover:text-n46-gray-900 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Send a Presenter Button */}
          <button
            onClick={() => addToast('info', 'Coming Soon')}
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-300 overflow-hidden group mr-3"
            style={{
              background: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
              boxShadow: '0 0 20px rgba(255, 68, 68, 0.4), 0 0 40px rgba(255, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Users className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Send a Presenter</span>
          </button>

          {/* Wavy Line Separator */}
          <svg width="24" height="36" viewBox="0 0 24 36" className="text-n46-gray-300 mr-3">
            <path
              d="M12 0 Q0 9, 12 18 Q24 27, 12 36"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>

          {/* Database Connection Menu */}
          <div className="relative" ref={databaseRef}>
            <button
              onClick={() => setShowDatabaseDropdown(!showDatabaseDropdown)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/90 text-n46-gray-700 border border-n46-gray-200 hover:bg-white hover:border-n46-gray-300 transition-colors"
            >
              <Database className="w-4 h-4" />
              Connect
              <ChevronDown className="w-4 h-4" />
            </button>

            {showDatabaseDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-n46-gray-100 py-2 z-10 animate-fade-in">
                <div className="px-4 py-2 text-xs font-medium text-n46-gray-400 uppercase tracking-wider">
                  Cloud Storage
                </div>
                <div
                  className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-400 flex items-center justify-between cursor-not-allowed"
                >
                  <span className="flex items-center gap-3">
                    <FolderLock className="w-4 h-4" />
                    Data Room
                  </span>
                  <span className="text-[10px] bg-n46-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                </div>
                <div
                  className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-400 flex items-center justify-between cursor-not-allowed"
                >
                  <span className="flex items-center gap-3">
                    <Cloud className="w-4 h-4" />
                    Google Drive
                  </span>
                  <span className="text-[10px] bg-n46-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                </div>
                <div
                  className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-400 flex items-center justify-between cursor-not-allowed"
                >
                  <span className="flex items-center gap-3">
                    <Folder className="w-4 h-4" />
                    Dropbox
                  </span>
                  <span className="text-[10px] bg-n46-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                </div>

                <div className="border-t border-n46-gray-100 my-2" />

                <div className="px-4 py-2 text-xs font-medium text-n46-gray-400 uppercase tracking-wider">
                  Data Sources
                </div>
                <div
                  className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-400 flex items-center justify-between cursor-not-allowed"
                >
                  <span className="flex items-center gap-3">
                    <Cloud className="w-4 h-4" />
                    Snowflake
                  </span>
                  <span className="text-[10px] bg-n46-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                </div>
                <div
                  className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-400 flex items-center justify-between cursor-not-allowed"
                >
                  <span className="flex items-center gap-3">
                    <Database className="w-4 h-4" />
                    PostgreSQL
                  </span>
                  <span className="text-[10px] bg-n46-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                </div>
                <div
                  className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-400 flex items-center justify-between cursor-not-allowed"
                >
                  <span className="flex items-center gap-3">
                    <HardDrive className="w-4 h-4" />
                    MongoDB
                  </span>
                  <span className="text-[10px] bg-n46-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                </div>
                <div
                  className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-400 flex items-center justify-between cursor-not-allowed"
                >
                  <span className="flex items-center gap-3">
                    <Package className="w-4 h-4" />
                    Salesforce
                  </span>
                  <span className="text-[10px] bg-n46-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                </div>
                <div
                  className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-400 flex items-center justify-between cursor-not-allowed"
                >
                  <span className="flex items-center gap-3">
                    <FileSpreadsheet className="w-4 h-4" />
                    Excel / CSV
                  </span>
                  <span className="text-[10px] bg-n46-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                </div>
              </div>
            )}
          </div>

          {/* Update Data Button */}
          <button
            onClick={() => addToast('info', 'Update Data feature coming soon')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/90 text-n46-gray-700 border border-n46-gray-200 hover:bg-white hover:border-n46-gray-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Liquid Data
          </button>

          {/* Translate Dropdown */}
          <div className="relative" ref={translateRef}>
            <button
              onClick={() => !isTranslating && setShowTranslateDropdown(!showTranslateDropdown)}
              disabled={isTranslating}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                isTranslating
                  ? 'bg-n46-blue/10 text-n46-blue border-n46-blue/20 cursor-wait'
                  : 'bg-white/90 text-n46-gray-700 border-n46-gray-200 hover:bg-white hover:border-n46-gray-300'
              }`}
            >
              {isTranslating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Translating to {translatingLanguage}...
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4" />
                  Translate
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>

            {showTranslateDropdown && !isTranslating && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-n46-gray-100 py-2 z-10 animate-fade-in max-h-80 overflow-y-auto">
                <div className="px-4 py-2 text-xs font-medium text-n46-gray-400 uppercase tracking-wider">
                  Create Translation
                </div>
                {TRANSLATION_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleTranslate(lang.code, lang.name)}
                    className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-700 hover:bg-n46-gray-50 flex items-center gap-3"
                  >
                    <span className={`w-5 h-5 rounded-full ${lang.bgColor} flex items-center justify-center text-[10px]`}>
                      {lang.flag}
                    </span>
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Dropdown */}
          {hasExportOptions && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/90 text-n46-gray-700 border border-n46-gray-200 hover:bg-white hover:border-n46-gray-300 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
                <ChevronDown className="w-4 h-4" />
              </button>

              {showExportDropdown && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-n46-gray-100 py-2 z-10 animate-fade-in">
                  {/* Active export options */}
                  {presentation.pdfUrl && (
                    <button
                      onClick={() => handleDownload(presentation.pdfUrl!)}
                      className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-700 hover:bg-n46-gray-50 flex items-center gap-3"
                    >
                      <FileText className="w-4 h-4 text-n46-gray-400" />
                      Download PDF
                    </button>
                  )}
                  {presentation.pptxUrl && (
                    <button
                      onClick={() => handleDownload(presentation.pptxUrl!)}
                      className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-700 hover:bg-n46-gray-50 flex items-center gap-3"
                    >
                      <PresentationIcon className="w-4 h-4 text-n46-gray-400" />
                      Download PPTX
                    </button>
                  )}
                  {presentation.gammaUrl && (
                    <button
                      onClick={handleCopyLink}
                      className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-700 hover:bg-n46-gray-50 flex items-center gap-3"
                    >
                      <Copy className="w-4 h-4 text-n46-gray-400" />
                      Copy Link
                    </button>
                  )}

                  {/* Divider */}
                  <div className="border-t border-n46-gray-100 my-2" />

                  {/* Coming soon export options */}
                  <div
                    className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-400 flex items-center justify-between cursor-not-allowed"
                  >
                    <span className="flex items-center gap-3">
                      <FileSpreadsheet className="w-4 h-4" />
                      PowerPoint
                    </span>
                    <span className="text-[10px] bg-n46-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                  </div>
                  <div
                    className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-400 flex items-center justify-between cursor-not-allowed"
                  >
                    <span className="flex items-center gap-3">
                      <Cloud className="w-4 h-4" />
                      Google Slides
                    </span>
                    <span className="text-[10px] bg-n46-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                  </div>
                  <div
                    className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-400 flex items-center justify-between cursor-not-allowed"
                  >
                    <span className="flex items-center gap-3">
                      <Link2 className="w-4 h-4" />
                      Online Link
                    </span>
                    <span className="text-[10px] bg-n46-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                  </div>
                  <div
                    className="w-full px-4 py-2.5 text-left text-sm text-n46-gray-400 flex items-center justify-between cursor-not-allowed"
                  >
                    <span className="flex items-center gap-3">
                      <Palette className="w-4 h-4" />
                      Canva
                    </span>
                    <span className="text-[10px] bg-n46-gray-100 px-1.5 py-0.5 rounded">Soon</span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-n46-gray-900">
          {presentation.title}
        </h1>
        {presentation.description && (
          <p className="text-n46-gray-500 mt-1 line-clamp-2">
            {presentation.description}
          </p>
        )}
      </div>

      {/* Viewer Area */}
      <div className="card mb-6 overflow-hidden p-0">
        {presentation.gammaUrl && !isMock ? (
          <div className="h-[900px] bg-n46-gray-50">
            <iframe
              src={getEmbedUrl(presentation.gammaUrl)}
              className="w-full h-full border-0"
              title={presentation.title}
              allowFullScreen
            />
          </div>
        ) : (
          <div className="h-[900px] bg-gradient-to-br from-n46-gray-50 to-n46-gray-100 flex flex-col items-center justify-center">
            {presentation.status === 'generating' ? (
              <>
                <Loader2 className="w-8 h-8 text-n46-blue animate-spin mb-4" />
                <p className="text-n46-gray-500">Generation in progress...</p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 rounded-2xl bg-n46-blue/10 flex items-center justify-center mb-6">
                  <Layers className="w-10 h-10 text-n46-blue" />
                </div>
                <h3 className="text-lg font-medium text-n46-gray-900 mb-2">
                  Presentation not available
                </h3>
                <p className="text-n46-gray-500 text-center max-w-md">
                  The presentation could not be loaded. Please try generating again.
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Details Panel */}
      <div className="card">
        <h2 className="text-lg font-medium text-n46-gray-900 mb-4">
          Presentation Details
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* Profile */}
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: profile ? `${profile.color}15` : '#f3f4f6' }}
            >
              <User
                className="w-5 h-5"
                style={{ color: profile?.color || '#9ca3af' }}
              />
            </div>
            <div>
              <p className="text-sm text-n46-gray-500">Profile</p>
              <p className="font-medium text-n46-gray-900">
                {profile?.name || presentation.userProfile}
              </p>
            </div>
          </div>

          {/* Use Case */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-n46-gray-100 flex items-center justify-center flex-shrink-0">
              <Tag className="w-5 h-5 text-n46-gray-500" />
            </div>
            <div>
              <p className="text-sm text-n46-gray-500">Use Case</p>
              <p className="font-medium text-n46-gray-900">
                {useCase?.name || presentation.useCase}
              </p>
            </div>
          </div>

          {/* Slides */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-n46-gray-100 flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5 text-n46-gray-500" />
            </div>
            <div>
              <p className="text-sm text-n46-gray-500">Slides</p>
              <p className="font-medium text-n46-gray-900">
                {presentation.generationParams.numCards}
              </p>
            </div>
          </div>

          {/* Created */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-n46-gray-100 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-n46-gray-500" />
            </div>
            <div>
              <p className="text-sm text-n46-gray-500">Created</p>
              <p className="font-medium text-n46-gray-900">
                {formatDate(presentation.createdAt)}
              </p>
            </div>
          </div>

          {/* Tone */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-n46-gray-100 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-n46-gray-500" />
            </div>
            <div>
              <p className="text-sm text-n46-gray-500">Tone</p>
              <p className="font-medium text-n46-gray-900 capitalize">
                {presentation.generationParams?.textOptions?.tone || 'Professional'}
              </p>
            </div>
          </div>

          {/* Image Style */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-n46-gray-100 flex items-center justify-center flex-shrink-0">
              <Image className="w-5 h-5 text-n46-gray-500" />
            </div>
            <div>
              <p className="text-sm text-n46-gray-500">Image Style</p>
              <p className="font-medium text-n46-gray-900 capitalize">
                {presentation.generationParams?.imageOptions?.style || 'Photo'}
              </p>
            </div>
          </div>

          {/* Audience */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-n46-gray-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-n46-gray-500" />
            </div>
            <div>
              <p className="text-sm text-n46-gray-500">Audience</p>
              <p className="font-medium text-n46-gray-900 capitalize">
                {presentation.generationParams?.textOptions?.audience || 'General'}
              </p>
            </div>
          </div>

          {/* Language */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-n46-gray-100 flex items-center justify-center flex-shrink-0">
              <Languages className="w-5 h-5 text-n46-gray-500" />
            </div>
            <div>
              <p className="text-sm text-n46-gray-500">Language</p>
              <p className="font-medium text-n46-gray-900 uppercase">
                {presentation.generationParams?.textOptions?.language || 'EN'}
              </p>
            </div>
          </div>

          {/* Theme */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-n46-gray-100 flex items-center justify-center flex-shrink-0">
              <Palette className="w-5 h-5 text-n46-gray-500" />
            </div>
            <div>
              <p className="text-sm text-n46-gray-500">Theme</p>
              <p className="font-medium text-n46-gray-900">
                {presentation.generationParams?.themeId || 'Auto'}
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-6 pt-6 border-t border-n46-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-n46-gray-500">Status:</span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                presentation.status === 'completed'
                  ? 'bg-green-50 text-green-700'
                  : presentation.status === 'generating'
                    ? 'bg-yellow-50 text-yellow-700'
                    : presentation.status === 'failed'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-n46-gray-100 text-n46-gray-600'
              }`}
            >
              {presentation.status === 'generating' && (
                <Loader2 className="w-3 h-3 animate-spin" />
              )}
              {presentation.status.charAt(0).toUpperCase() + presentation.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Original Prompt */}
        {presentation.prompt && (
          <div className="mt-6 pt-6 border-t border-n46-gray-100">
            <p className="text-sm text-n46-gray-500 mb-2">Original Prompt</p>
            <p className="text-n46-gray-700 text-sm leading-relaxed bg-n46-gray-50 rounded-lg p-4">
              {presentation.prompt}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
