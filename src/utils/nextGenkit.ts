import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai'
import * as z from 'zod';

const ai = genkit({
    plugins: [googleAI()],
    model: gemini15Flash,
});


export const flow = ai.defineFlow({
    name: "chat",
    inputSchema: z.array(
        z.object({sender: z.string(), message: z.string()})
    ),
    outputSchema: z.string(),
}, (input): Promise<string> => {
    return Promise.resolve("hello, world");
});

export function caller(): string {
  const err = new Error();
  return /\/api([^.])*/.exec(err.stack!.split("\n")[2])?.[0]!;
}