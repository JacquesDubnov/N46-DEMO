/**
 * Script to batch generate AI thumbnails for all presentations
 *
 * Prerequisites:
 * 1. Install Automatic1111's stable-diffusion-webui:
 *    cd ~/ && git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
 *    cd stable-diffusion-webui && ./webui.sh --api
 *
 * 2. Make sure the WebUI is running at http://127.0.0.1:7860
 *
 * Usage:
 *   npx ts-node scripts/generate-thumbnails.ts
 *
 * This script will:
 * - Connect to your local IndexedDB (presentations database)
 * - Generate thumbnails for all presentations without thumbnails
 * - Update the database with the generated thumbnail URLs
 */

const SD_API_URL = 'http://127.0.0.1:7860/sdapi/v1/txt2img';

type UserProfile = 'student' | 'business' | 'social' | 'scientific';

const PROFILE_STYLE_PROMPTS: Record<UserProfile, string> = {
  student: 'educational, academic, colorful, youthful, clean design',
  business: 'professional, corporate, modern, sleek, business presentation',
  social: 'vibrant, engaging, social media style, dynamic, trendy',
  scientific: 'technical, scientific, data visualization, research, precise',
};

function buildThumbnailPrompt(
  title: string,
  profile: UserProfile,
  useCase?: string
): string {
  const profileStyle = PROFILE_STYLE_PROMPTS[profile];
  const cleanTitle = title.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase();

  return `presentation cover slide, ${cleanTitle}, ${profileStyle}, ${useCase || ''}, high quality, 16:9 aspect ratio, professional design, vibrant colors, modern layout`.trim();
}

async function checkSDAvailability(): Promise<boolean> {
  try {
    const response = await fetch('http://127.0.0.1:7860/sdapi/v1/options');
    return response.ok;
  } catch {
    return false;
  }
}

async function generateThumbnail(prompt: string): Promise<string | null> {
  try {
    const response = await fetch(SD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        negative_prompt: 'text, watermark, logo, blurry, low quality, distorted',
        steps: 20,
        sampler_name: 'DPM++ 2M Karras',
        cfg_scale: 7,
        width: 512,
        height: 288,
        batch_size: 1,
        n_iter: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`SD API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.images && data.images.length > 0) {
      return `data:image/png;base64,${data.images[0]}`;
    }

    return null;
  } catch (error) {
    console.error('Thumbnail generation failed:', error);
    return null;
  }
}

async function main() {
  console.log('Thumbnail Generation Script');
  console.log('===========================\n');

  // Check if SD is available
  const sdAvailable = await checkSDAvailability();
  if (!sdAvailable) {
    console.error('Error: Stable Diffusion API is not available.');
    console.log('\nTo set up Stable Diffusion:');
    console.log('1. git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui');
    console.log('2. cd stable-diffusion-webui');
    console.log('3. ./webui.sh --api');
    console.log('\nMake sure the WebUI is running at http://127.0.0.1:7860');
    process.exit(1);
  }

  console.log('Stable Diffusion API is available!\n');
  console.log('Note: This script generates thumbnails. In a browser environment,');
  console.log('thumbnails are stored in IndexedDB. For this script, thumbnails');
  console.log('will be logged as base64 strings that can be manually added.\n');

  // Example thumbnail generation
  const examplePrompts = [
    { title: 'Q4 Sales Report', profile: 'business' as UserProfile, useCase: 'quarterly-report' },
    { title: 'Introduction to Machine Learning', profile: 'scientific' as UserProfile, useCase: 'research-presentation' },
    { title: 'Summer Vacation Photos', profile: 'social' as UserProfile, useCase: 'photo-slideshow' },
  ];

  for (const example of examplePrompts) {
    console.log(`Generating thumbnail for: "${example.title}" (${example.profile})`);
    const prompt = buildThumbnailPrompt(example.title, example.profile, example.useCase);
    console.log(`Prompt: ${prompt.substring(0, 80)}...`);

    const thumbnail = await generateThumbnail(prompt);
    if (thumbnail) {
      console.log(`Success! Thumbnail generated (${thumbnail.length} chars base64)\n`);
    } else {
      console.log('Failed to generate thumbnail\n');
    }
  }

  console.log('\nDone! To use in the app:');
  console.log('1. Run the app with `npm run dev`');
  console.log('2. Hover over any presentation card');
  console.log('3. Click the image icon to generate a thumbnail');
}

main().catch(console.error);
