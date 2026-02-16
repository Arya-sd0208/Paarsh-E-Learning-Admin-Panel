'use server';

/**
 * @fileOverview AI-powered course recommendation flow for students.
 *
 * - getPersonalizedCourseRecommendations - A function that returns personalized course recommendations.
 * - PersonalizedCourseRecommendationsInput - The input type for the getPersonalizedCourseRecommendations function.
 * - PersonalizedCourseRecommendationsOutput - The return type for the getPersonalizedCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCourseRecommendationsInputSchema = z.object({
  studentId: z.string().describe('The ID of the student.'),
  learningHistory: z.string().describe('The learning history of the student.'),
  goals: z.string().describe('The learning goals of the student.'),
});

export type PersonalizedCourseRecommendationsInput = z.infer<typeof PersonalizedCourseRecommendationsInputSchema>;

const PersonalizedCourseRecommendationsOutputSchema = z.object({
  courseRecommendations: z
    .array(z.string())
    .describe('A list of course IDs recommended for the student.'),
});

export type PersonalizedCourseRecommendationsOutput = z.infer<
  typeof PersonalizedCourseRecommendationsOutputSchema
>;

export async function getPersonalizedCourseRecommendations(
  input: PersonalizedCourseRecommendationsInput
): Promise<PersonalizedCourseRecommendationsOutput> {
  return personalizedCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCourseRecommendationsPrompt',
  input: {schema: PersonalizedCourseRecommendationsInputSchema},
  output: {schema: PersonalizedCourseRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized course recommendations to students based on their learning history and goals.

  Student ID: {{{studentId}}}
  Learning History: {{{learningHistory}}}
  Goals: {{{goals}}}

  Based on the student's learning history and goals, recommend a list of course IDs that would be most relevant and helpful for them.  Do not explain your reasoning.
  The course recommendations should be from available courses at EduLeap. Return ONLY a JSON array of course IDs.`,
});

const personalizedCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCourseRecommendationsFlow',
    inputSchema: PersonalizedCourseRecommendationsInputSchema,
    outputSchema: PersonalizedCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
