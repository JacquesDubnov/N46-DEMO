import type { UserProfile } from '../types';

// Stable Diffusion API URL - configure if using a different port or host
const SD_API_URL = 'http://127.0.0.1:7860/sdapi/v1/txt2img';

/**
 * Thumbnail Generator for AI-powered presentation thumbnails
 *
 * SETUP INSTRUCTIONS:
 * 1. Install Python 3.10: brew install python@3.10
 * 2. Clone Automatic1111: git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui ~/stable-diffusion-webui
 * 3. Create venv with Python 3.10: cd ~/stable-diffusion-webui && /opt/homebrew/bin/python3.10 -m venv venv
 * 4. Run with API: ./webui.sh --api
 *
 * Alternative: Use Fooocus (simpler): https://github.com/lllyasviel/Fooocus
 */

// Extract the core visual concept from a title
function extractCoreSubject(title: string): string {
  // Remove common presentation words to get the essence
  const removeWords = [
    'presentation', 'about', 'introduction', 'to', 'the', 'a', 'an', 'of',
    'and', 'for', 'with', 'how', 'why', 'what', 'guide', 'overview', 'basics',
    'advanced', 'complete', 'ultimate', 'exploring', 'understanding', 'lesson',
    'chapter', 'part', 'learning', 'teaching', 'study', 'analysis', 'review'
  ];

  const words = title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !removeWords.includes(word));

  // Return the most meaningful words (up to 3)
  return words.slice(0, 3).join(' ') || title.toLowerCase();
}

// Build a prompt for thumbnail generation based on presentation info
export function buildThumbnailPrompt(
  title: string,
  _profile: UserProfile,
  _useCase?: string
): string {
  const coreSubject = extractCoreSubject(title);

  // Generate clean, iconic imagery focused on the core concept
  return `${coreSubject}, single iconic image, centered composition, clean minimalist style, dramatic lighting, cinematic, beautiful photography, ultra high quality, 8k, sharp focus, simple background, no text, no words, no letters, no watermarks`;
}

// Generate a thumbnail using local Stable Diffusion
export async function generateThumbnail(
  prompt: string,
  _filename?: string
): Promise<{ success: boolean; path?: string; error?: string }> {
  try {
    const response = await fetch(SD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        negative_prompt: 'text, words, letters, numbers, watermark, logo, signature, writing, caption, title, label, blurry, low quality, distorted, busy background, cluttered, multiple objects, collage',
        steps: 4,
        cfg_scale: 0,
        width: 512,
        height: 288, // 16:9 aspect ratio
        batch_size: 1,
        n_iter: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`SD API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.images && data.images.length > 0) {
      // The API returns base64 encoded images
      const base64Image = data.images[0];
      return {
        success: true,
        path: `data:image/png;base64,${base64Image}`,
      };
    }

    throw new Error('No image returned from SD API');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Thumbnail generation failed:', errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Check if Stable Diffusion API is available
export async function checkSDAvailability(): Promise<boolean> {
  try {
    const response = await fetch('http://127.0.0.1:7860/sdapi/v1/options', {
      method: 'GET',
      signal: AbortSignal.timeout(2000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
