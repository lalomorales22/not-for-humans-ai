'use server';

/**
 * @fileOverview Summarizes data points discussed by an AI agent.
 *
 * - dataAnalyticsSummary - A function that summarizes data points from agent conversations.
 * - DataAnalyticsSummaryInput - The input type for the dataAnalyticsSummary function.
 * - DataAnalyticsSummaryOutput - The return type for the dataAnalyticsSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DataAnalyticsSummaryInputSchema = z.object({
  conversationData: z.string().describe('The complete conversation data from the AI agent.'),
});
export type DataAnalyticsSummaryInput = z.infer<typeof DataAnalyticsSummaryInputSchema>;

const DataAnalyticsSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the key data points discussed in the conversation.'),
});
export type DataAnalyticsSummaryOutput = z.infer<typeof DataAnalyticsSummaryOutputSchema>;

export async function dataAnalyticsSummary(input: DataAnalyticsSummaryInput): Promise<DataAnalyticsSummaryOutput> {
  return dataAnalyticsSummaryFlow(input);
}

const dataAnalyticsSummaryPrompt = ai.definePrompt({
  name: 'dataAnalyticsSummaryPrompt',
  input: {schema: DataAnalyticsSummaryInputSchema},
  output: {schema: DataAnalyticsSummaryOutputSchema},
  prompt: `Summarize the key data points discussed in the following conversation. Focus on extracting specific, quantifiable information and insights.

Conversation Data: {{{conversationData}}}`,
});

const dataAnalyticsSummaryFlow = ai.defineFlow(
  {
    name: 'dataAnalyticsSummaryFlow',
    inputSchema: DataAnalyticsSummaryInputSchema,
    outputSchema: DataAnalyticsSummaryOutputSchema,
  },
  async input => {
    const {output} = await dataAnalyticsSummaryPrompt(input);
    return output!;
  }
);
