// Confirm Location Validity Flow
'use server';

/**
 * @fileOverview This flow confirms the validity of a GPS location provided by a user, specifically identifying Indian jurisdictions.
 *
 * - confirmLocationValidity - A function that validates a GPS location.
 * - ConfirmLocationValidityInput - The input type for the confirmLocationValidity function.
 * - ConfirmLocationValidityOutput - The return type for the confirmLocationValidity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConfirmLocationValidityInputSchema = z.object({
  latitude: z.number().describe('The latitude of the location.'),
  longitude: z.number().describe('The longitude of the location.'),
});
export type ConfirmLocationValidityInput = z.infer<
  typeof ConfirmLocationValidityInputSchema
>;

const ConfirmLocationValidityOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the GPS location is valid and within India.'),
  jurisdiction: z
    .string()
    .describe('The specific jurisdiction (City, State, India) the GPS location falls under.'),
  confidence: z
    .number()
    .describe(
      'A number between 0 and 1 indicating the confidence in the jurisdiction.'
    ),
  details: z.object({
    city: z.string().optional(),
    state: z.string().optional(),
  }).describe('Detailed jurisdiction information.'),
});
export type ConfirmLocationValidityOutput = z.infer<
  typeof ConfirmLocationValidityOutputSchema
>;

export async function confirmLocationValidity(
  input: ConfirmLocationValidityInput
): Promise<ConfirmLocationValidityOutput> {
  return confirmLocationValidityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'confirmLocationValidityPrompt',
  input: {schema: ConfirmLocationValidityInputSchema},
  output: {schema: ConfirmLocationValidityOutputSchema},
  prompt: `You are an expert in GPS location validation for the Indian subcontinent.

Given a latitude and longitude, determine:
1. If the location is within India.
2. The specific City and State (Jurisdiction).
3. The confidence level of this mapping.

Be precise. For example, if it is in Mumbai, the jurisdiction should be "Mumbai, Maharashtra".

Latitude: {{{latitude}}}
Longitude: {{{longitude}}}`,
});

const confirmLocationValidityFlow = ai.defineFlow(
  {
    name: 'confirmLocationValidityFlow',
    inputSchema: ConfirmLocationValidityInputSchema,
    outputSchema: ConfirmLocationValidityOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        throw new Error('confirmLocationValidityPrompt returned no output');
      }
      return output;
    } catch (error) {
      console.error('Error in confirmLocationValidityFlow:', error);
      throw error;
    }
  }
);
