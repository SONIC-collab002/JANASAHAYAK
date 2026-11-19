'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting issue categories based on an image.
 *
 * - suggestIssueCategories - A function that takes an image data URI and returns suggested issue categories.
 * - SuggestIssueCategoriesInput - The input type for the suggestIssueCategories function.
 * - SuggestIssueCategoriesOutput - The return type for the suggestIssueCategories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestIssueCategoriesInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestIssueCategoriesInput = z.infer<typeof SuggestIssueCategoriesInputSchema>;

const SuggestIssueCategoriesOutputSchema = z.object({
  suggestedCategories: z
    .array(z.string())
    .describe('An array of suggested issue categories.'),
});
export type SuggestIssueCategoriesOutput = z.infer<typeof SuggestIssueCategoriesOutputSchema>;

export async function suggestIssueCategories(
  input: SuggestIssueCategoriesInput
): Promise<SuggestIssueCategoriesOutput> {
  return suggestIssueCategoriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestIssueCategoriesPrompt',
  input: {schema: SuggestIssueCategoriesInputSchema},
  output: {schema: SuggestIssueCategoriesOutputSchema},
  prompt: `You are an AI assistant that suggests relevant issue categories based on a photo of the issue.

  Analyze the following image and suggest up to 5 relevant issue categories.
  Return the categories as a JSON array of strings.

  Photo: {{media url=photoDataUri}}`,
});

const suggestIssueCategoriesFlow = ai.defineFlow(
  {
    name: 'suggestIssueCategoriesFlow',
    inputSchema: SuggestIssueCategoriesInputSchema,
    outputSchema: SuggestIssueCategoriesOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        throw new Error('suggestIssueCategoriesPrompt returned no output');
      }
      return output;
    } catch (error) {
      console.error('Error in suggestIssueCategoriesFlow:', error);
      throw error;
    }
  }
);
