// Fix fs dependencies:
"use server"

import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

export const ai = genkit({
    plugins: [googleAI()],
    model: gemini15Flash, // set default model
});
