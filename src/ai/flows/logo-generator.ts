'use server';
/**
 * @fileOverview Generates a logo image for "NOT FOR HUMANS.ai".
 *
 * - generateAppLogo - A function that generates a logo based on a theme.
 * - GenerateAppLogoInput - The input type for the generateAppLogo function.
 * - GenerateAppLogoOutput - The return type for the generateAppLogo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAppLogoInputSchema = z.object({
  theme: z.enum(['light', 'dark']).describe("The theme for which to generate the logo. 'dark' theme will have light logo elements for a dark page background, 'light' theme will have dark logo elements for a light page background."),
  customPromptDetails: z.string().optional().describe("Optional additional details to refine the logo generation prompt."),
});
export type GenerateAppLogoInput = z.infer<typeof GenerateAppLogoInputSchema>;

const GenerateAppLogoOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated logo image as a data URI (e.g., 'data:image/png;base64,...')."),
});
export type GenerateAppLogoOutput = z.infer<typeof GenerateAppLogoOutputSchema>;

export async function generateAppLogo(input: GenerateAppLogoInput): Promise<GenerateAppLogoOutput> {
  return generateAppLogoFlow(input);
}

const generateAppLogoFlow = ai.defineFlow(
  {
    name: 'generateAppLogoFlow',
    inputSchema: GenerateAppLogoInputSchema,
    outputSchema: GenerateAppLogoOutputSchema,
  },
  async (input) => {
    const commonDescription = "A logo for the brand 'NOT FOR HUMANS.ai'. The logo features a stylized, iconic human figure. This figure is crossed out by a single, clean diagonal line (e.g., from the figure's top-left shoulder area to its bottom-right hip area). The crossed-out figure is centered inside a regular octagonal shape, reminiscent of a stop sign. Below this octagonal sign, the text 'NOT FOR HUMANS' is clearly visible, written in all capital letters using a clean, modern, sans-serif typeface. The overall style should be minimalist, impactful, and convey an exclusive, tech-forward, slightly dystopian feel. The logo must be suitable for a website header, with an approximate aspect ratio of 4:1 (width to height). Target a resolution like 640x160 pixels for generation, ensuring clarity when scaled down. The entire generated image MUST have a transparent background (alpha channel).";
    
    let specificPromptDetails: string;
    if (input.theme === 'dark') {
      // For a dark website background, the logo elements should be light.
      specificPromptDetails = `The octagonal sign shape must be filled solid white. The crossed-out human figure inside the sign (including the cross-out line) must be solid black. The text 'NOT FOR HUMANS' below the sign must be solid white. Ensure the overall image background is transparent. ${input.customPromptDetails || ''}`;
    } else {
      // For a light website background, the logo elements should be dark.
      specificPromptDetails = `The octagonal sign shape must be filled solid black. The crossed-out human figure inside the sign (including the cross-out line) must be solid white. The text 'NOT FOR HUMANS' below the sign must be solid black. Ensure the overall image background is transparent. ${input.customPromptDetails || ''}`;
    }

    const fullPrompt = `${commonDescription} ${specificPromptDetails}`;

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // This model supports image generation
      prompt: fullPrompt,
      config: {
        responseModalities: ['IMAGE', 'TEXT'], // Must include IMAGE, TEXT is also required by the model
      },
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed or did not return a media URL.');
    }

    // The media.url will be a data URI, e.g., "data:image/png;base64,..."
    // Requesting PNG explicitly might help with transparency, though the model often infers this.
    // If the model returns JPEG, transparency will be lost.
    // The 'gemini-2.0-flash-exp' should produce PNG if transparency is possible.
    return { imageDataUri: media.url };
  }
);

