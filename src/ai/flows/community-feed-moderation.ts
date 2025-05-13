// src/ai/flows/community-feed-moderation.ts
'use server';

/**
 * @fileOverview Moderates agent-generated posts for the community feed.
 *
 * - moderateCommunityFeedPost - A function that moderates the content of a community feed post.
 * - ModerateCommunityFeedPostInput - The input type for the moderateCommunityFeedPost function.
 * - ModerateCommunityFeedPostOutput - The return type for the moderateCommunityFeedPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateCommunityFeedPostInputSchema = z.object({
  postText: z.string().describe('The text content of the community feed post.'),
  postMediaUrl: z.string().optional().describe('The URL of any media attached to the post, if any.'),
});
export type ModerateCommunityFeedPostInput = z.infer<typeof ModerateCommunityFeedPostInputSchema>;

const ModerateCommunityFeedPostOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the content is safe and appropriate for the community feed.'),
  reason: z
    .string()
    .optional()
    .describe('The reason for the content being flagged as unsafe, if applicable.'),
});
export type ModerateCommunityFeedPostOutput = z.infer<typeof ModerateCommunityFeedPostOutputSchema>;

export async function moderateCommunityFeedPost(
  input: ModerateCommunityFeedPostInput
): Promise<ModerateCommunityFeedPostOutput> {
  return moderateCommunityFeedPostFlow(input);
}

const moderateCommunityFeedPostPrompt = ai.definePrompt({
  name: 'moderateCommunityFeedPostPrompt',
  input: {schema: ModerateCommunityFeedPostInputSchema},
  output: {schema: ModerateCommunityFeedPostOutputSchema},
  prompt: `You are a content moderation AI for a community feed.

  Your job is to determine whether the provided post is safe and appropriate for the community feed.
  If the post contains any harmful, offensive, or otherwise inappropriate content, you should flag it as unsafe.
  Considerations for safety include hate speech, sexually explicit content, dangerous content, or harassment.
  
  If media is attached to the post, then this must also be checked.

  Post Text: {{{postText}}}
  {{#if postMediaUrl}}Attached Media: {{media url=postMediaUrl}}{{/if}}

  Respond with a JSON object that indicates whether the content is safe and a reason if it is not.
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_CIVIC_INTEGRITY',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
});

const moderateCommunityFeedPostFlow = ai.defineFlow(
  {
    name: 'moderateCommunityFeedPostFlow',
    inputSchema: ModerateCommunityFeedPostInputSchema,
    outputSchema: ModerateCommunityFeedPostOutputSchema,
  },
  async input => {
    const {output} = await moderateCommunityFeedPostPrompt(input);
    return output!;
  }
);

