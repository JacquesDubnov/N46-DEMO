import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { UserProfileSelector } from './UserProfileSelector';
import { UseCaseSelector } from './UseCaseSelector';
import { ContentInput } from './ContentInput';
import { DesignCustomizer } from './DesignCustomizer';
import { GenerationProgress } from './GenerationProgress';
import { ConfirmModal, Logo } from '../common';
import { useGamma } from '../../hooks/useGamma';
import { addPresentation, updatePresentation } from '../../api/presentations';
import type { UserProfileId } from '../../data/userProfiles';
import type { Presentation, ImageStyle } from '../../types';
import type { SlideDimensions } from '../../utils/profileOptimizer';

export interface WizardData {
  profile: UserProfileId | null;
  useCase: string | null;
  subject: string;
  structuredPrompt: string;
  additionalDetails: string;
  density: number;
  numSlides: number;
  themeId: string | null;
  imageStyle: ImageStyle;
  slideDimensions: SlideDimensions;
}

const INITIAL_DATA: WizardData = {
  profile: null,
  useCase: null,
  subject: '',
  structuredPrompt: '',
  additionalDetails: '',
  density: 50,
  numSlides: 10,
  themeId: null,
  imageStyle: 'photo',
  slideDimensions: 'fluid',
};

const STEPS = [
  { id: 1, name: 'Profile' },
  { id: 2, name: 'Use Case' },
  { id: 3, name: 'Content' },
  { id: 4, name: 'Design' },
  { id: 5, name: 'Generate' },
];

export function CreateWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [presentationId, setPresentationId] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    progress,
    generatePresentation,
    resetProgress,
    themes,
    fetchThemes,
    isLoading: isLoadingThemes,
  } = useGamma();

  const hasEnteredData = data.profile !== null || data.subject.length > 0 || data.additionalDetails.length > 0;

  // Fetch themes when component mounts
  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  // Update presentation in DB when generation completes or fails
  useEffect(() => {
    if (!presentationId) return;

    if (progress.state === 'completed') {
      updatePresentation(presentationId, {
        status: 'completed',
        generationId: progress.generationId,
        gammaUrl: progress.gammaUrl,
        pdfUrl: progress.pdfUrl,
        pptxUrl: progress.pptxUrl,
      });
    } else if (progress.state === 'failed') {
      updatePresentation(presentationId, {
        status: 'failed',
      });
    }
  }, [progress.state, progress.generationId, progress.gammaUrl, progress.pdfUrl, progress.pptxUrl, presentationId]);

  function handleClose() {
    if (isGenerating) {
      setShowExitConfirm(true);
    } else if (hasEnteredData) {
      setShowExitConfirm(true);
    } else {
      navigate('/');
    }
  }

  function handleConfirmExit() {
    setShowExitConfirm(false);
    resetProgress();
    navigate('/');
  }

  function handleBack() {
    if (currentStep > 1 && !isGenerating) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleContinue() {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  }

  function updateData(updates: Partial<WizardData>) {
    setData(prev => ({ ...prev, ...updates }));
  }

  function canContinue(): boolean {
    switch (currentStep) {
      case 1:
        return data.profile !== null;
      case 2:
        return data.useCase !== null;
      case 3:
        return data.subject.length > 0 && data.structuredPrompt.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  }

  async function handleGenerate() {
    if (!data.profile || !data.useCase) return;

    // Move to step 5 (generation progress)
    setCurrentStep(5);
    setIsGenerating(true);

    // Combine prompts for API submission
    const combinedPrompt = `Subject: ${data.subject}

=== PRESENTATION STRUCTURE ===
${data.structuredPrompt}

=== ADDITIONAL REQUIREMENTS ===
${data.additionalDetails || 'None specified'}`;

    // Save draft presentation to IndexedDB
    const now = new Date();
    const newPresentation: Omit<Presentation, 'id'> = {
      title: data.subject,
      description: data.structuredPrompt.slice(0, 200),
      userProfile: data.profile,
      useCase: data.useCase,
      prompt: combinedPrompt,
      status: 'generating',
      generationParams: {
        textMode: 'generate',
        format: 'presentation',
        themeId: data.themeId || undefined,
        numCards: data.numSlides,
        textOptions: {
          amount: 'medium',
          tone: 'professional',
          audience: 'general',
          language: 'en',
        },
        imageOptions: {
          source: 'aiGenerated',
        },
        cardOptions: {
          dimensions: data.slideDimensions,
        },
      },
      createdAt: now,
      updatedAt: now,
    };

    try {
      const id = await addPresentation(newPresentation);
      setPresentationId(id);

      // Start generation
      await generatePresentation({
        title: data.subject,
        prompt: combinedPrompt,
        profileId: data.profile,
        useCaseId: data.useCase,
        designPreferences: {
          density: data.density,
          numSlides: data.numSlides,
          imageStyle: data.imageStyle,
          slideDimensions: data.slideDimensions,
        },
        themeId: data.themeId,
      });
    } catch (err) {
      console.error('Generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  }

  function handleCancel() {
    resetProgress();
    navigate('/');
  }

  function handleRetry() {
    // Reset and try again
    resetProgress();
    setPresentationId(null);
    handleGenerate();
  }

  function renderStep() {
    switch (currentStep) {
      case 1:
        return (
          <UserProfileSelector
            selectedProfile={data.profile}
            onSelect={(profile) => updateData({ profile, useCase: null })}
          />
        );
      case 2:
        return (
          <UseCaseSelector
            profileId={data.profile}
            selectedUseCase={data.useCase}
            onSelect={(useCase) => {
              // Just update use case; structured prompt will be generated in ContentInput
              updateData({ useCase });
            }}
          />
        );
      case 3:
        return (
          <ContentInput
            profileId={data.profile}
            useCaseId={data.useCase}
            subject={data.subject}
            structuredPrompt={data.structuredPrompt}
            additionalDetails={data.additionalDetails}
            onSubjectChange={(subject) => updateData({ subject })}
            onStructuredPromptChange={(structuredPrompt) => updateData({ structuredPrompt })}
            onAdditionalDetailsChange={(additionalDetails) => updateData({ additionalDetails })}
          />
        );
      case 4:
        return (
          <DesignCustomizer
            density={data.density}
            numSlides={data.numSlides}
            themeId={data.themeId}
            imageStyle={data.imageStyle}
            slideDimensions={data.slideDimensions}
            themes={themes}
            isLoadingThemes={isLoadingThemes}
            onDensityChange={(density) => updateData({ density })}
            onNumSlidesChange={(numSlides) => updateData({ numSlides })}
            onThemeChange={(themeId) => updateData({ themeId })}
            onImageStyleChange={(imageStyle) => updateData({ imageStyle })}
            onSlideDimensionsChange={(slideDimensions) => updateData({ slideDimensions })}
            onGenerate={handleGenerate}
          />
        );
      case 5:
        return (
          <GenerationProgress
            progress={progress}
            presentationId={presentationId}
            numSlides={data.numSlides}
            theme={data.themeId || 'Auto'}
            profile={data.profile || 'business'}
            onCancel={handleCancel}
            onRetry={handleRetry}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-n46-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-n46-gray-100 px-6 py-4 flex items-center justify-between">
        <Logo size="xs" />

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-200
                  ${currentStep === step.id
                    ? 'bg-n46-blue text-white'
                    : currentStep > step.id
                      ? 'bg-n46-blue/10 text-n46-blue'
                      : 'bg-n46-gray-100 text-n46-gray-400'
                  }
                `}
              >
                {step.id}
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`
                    w-8 h-0.5 mx-1
                    transition-colors duration-200
                    ${currentStep > step.id ? 'bg-n46-blue/30' : 'bg-n46-gray-200'}
                  `}
                />
              )}
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="p-2 rounded-lg hover:bg-n46-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-n46-gray-500" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl">
          {renderStep()}
        </div>
      </main>

      {/* Footer Navigation */}
      {currentStep < 5 && (
        <footer className="bg-white border-t border-n46-gray-100 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`
                px-6 py-2.5 rounded-lg font-medium text-sm transition-all
                ${currentStep === 1
                  ? 'text-n46-gray-300 cursor-not-allowed'
                  : 'text-n46-gray-600 hover:bg-n46-gray-100'
                }
              `}
            >
              Back
            </button>

            {/* Continue button only shown for steps 1-3; step 4 has its own Generate button */}
            {currentStep < 4 && (
              <button
                onClick={handleContinue}
                disabled={!canContinue()}
                className={`
                  px-6 py-2.5 rounded-lg font-medium text-sm transition-all
                  ${canContinue()
                    ? 'bg-n46-blue text-white hover:bg-n46-blue-light'
                    : 'bg-n46-gray-200 text-n46-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Continue
              </button>
            )}
          </div>
        </footer>
      )}

      {/* Exit Confirmation Modal */}
      <ConfirmModal
        isOpen={showExitConfirm}
        onClose={() => setShowExitConfirm(false)}
        onConfirm={handleConfirmExit}
        title={isGenerating ? "Cancel generation?" : "Discard changes?"}
        message={isGenerating
          ? "Your presentation is still being generated. Are you sure you want to leave?"
          : "You have unsaved changes. Are you sure you want to leave? Your progress will be lost."
        }
        confirmLabel={isGenerating ? "Cancel & Leave" : "Discard"}
        cancelLabel={isGenerating ? "Keep Waiting" : "Keep editing"}
        variant="danger"
      />
    </div>
  );
}
