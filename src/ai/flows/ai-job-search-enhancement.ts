'use server';
/**
 * @fileOverview Enhances job search functionality using AI to understand user intent.
 *
 * - enhanceJobSearch - A function that takes a search query and enhances it using AI.
 * - EnhanceJobSearchInput - The input type for the enhanceJobSearch function.
 * - EnhanceJobSearchOutput - The return type for the enhanceJobSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceJobSearchInputSchema = z.object({
  query: z.string().describe('The user\s original search query.'),
});
export type EnhanceJobSearchInput = z.infer<typeof EnhanceJobSearchInputSchema>;

const EnhanceJobSearchOutputSchema = z.object({
  enhancedQuery: z.string().describe('The AI-enhanced search query.'),
});
export type EnhanceJobSearchOutput = z.infer<typeof EnhanceJobSearchOutputSchema>;

export async function enhanceJobSearch(input: EnhanceJobSearchInput): Promise<EnhanceJobSearchOutput> {
  return enhanceJobSearchFlow(input);
}

const enhanceJobSearchPrompt = ai.definePrompt({
  name: 'enhanceJobSearchPrompt',
  input: {schema: EnhanceJobSearchInputSchema},
  output: {schema: EnhanceJobSearchOutputSchema},
  prompt: `You are an AI assistant designed to enhance job search queries.

  A user has provided the following search query: {{{query}}}

  Your goal is to rephrase the query to be more comprehensive and capture the user's intent, even if the original query was vague or used imprecise terms.

  Consider synonyms, related terms, and potential implied requirements. Return ONLY the enhanced query.  Do not add any additional text. Return a single string.

  For example, if the user searches for "waiter", you might return "waiter OR waitress OR server OR food service".

  If the user searches for "accountant in London", you might return "accountant OR accounting OR bookkeeper OR finance AND London".`,
});

const enhanceJobSearchFlow = ai.defineFlow(
  {
    name: 'enhanceJobSearchFlow',
    inputSchema: EnhanceJobSearchInputSchema,
    outputSchema: EnhanceJobSearchOutputSchema,
  },
  async input => {
    const {output} = await enhanceJobSearchPrompt(input);
    return output!;
  }
);
