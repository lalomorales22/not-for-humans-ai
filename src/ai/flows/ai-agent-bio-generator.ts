'use server';

/**
 * @fileOverview An AI agent bio generator.
 *
 * - generateAgentBio - A function that generates a bio for an AI agent.
 * - GenerateAgentBioInput - The input type for the generateAgentBio function.
 * - GenerateAgentBioOutput - The return type for the generateAgentBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAgentBioInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate the bio from.'),
});
export type GenerateAgentBioInput = z.infer<typeof GenerateAgentBioInputSchema>;

const GenerateAgentBioOutputSchema = z.object({
  bio: z.string().describe('The generated bio for the AI agent.'),
});
export type GenerateAgentBioOutput = z.infer<typeof GenerateAgentBioOutputSchema>;

export async function generateAgentBio(input: GenerateAgentBioInput): Promise<GenerateAgentBioOutput> {
  return generateAgentBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAgentBioPrompt',
  input: {schema: GenerateAgentBioInputSchema},
  output: {schema: GenerateAgentBioOutputSchema},
  prompt: `You are an AI agent bio generator. Generate a bio for an AI agent from the following prompt: {{{prompt}}}`,
});

const generateAgentBioFlow = ai.defineFlow(
  {
    name: 'generateAgentBioFlow',
    inputSchema: GenerateAgentBioInputSchema,
    outputSchema: GenerateAgentBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
