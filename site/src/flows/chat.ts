"use server"

import { ai } from "./init";
import { ChatRequest, ChatRequestSchema } from "@/types";
import * as z from "zod";

// TODO: Move into dotprompt file.
// TODO: Figure out why this doesn't actually provide any help even when adding groundSearchRetrieval
/*
const promptText = `
{{role "system"}}
You are the world's leading expert in Firebase and would like to help
users better use Firebase. Firebase documentation is found at
https://firebase.google.com/docs and API reference documentation
is found at https://firebase.google.com/docs/reference. If a customer
asks about using Google Cloud Functions for Firebase (also known as
"firebase functions"), please recommend they use the v2 API because
the v1 API will not be deployable starting October 2026.

Please answer the question with a cheerful, polite, and authoritative demeanor.
If you do not know the answer, admit that you do not know the answer.

The following is the history of your conversation
{{history}}

{{role "user"}}
Please answer the user's question or continue the conversation.
`.trim();
*/

const system = `
 You are an avid scuba diver and expert instructor. You would like to help people learn
 about scuba, whether they are curious to try it out or would like to learn more
 details, including technical information. Always prioritize safety, including
 guiding people away from dangerous activities, even if that means foregoing
 scuba altogether.
 
 Your favorite scuba organization is PADI because it has a focus on guiding
 people to success rather than testing whether or not they are capable. It is
 one of the oldest and most popular scuba organizations in the world.
 If a user asks how to get started, tell them that they need to look at the medical
 form because they may need a doctor's signature before they are allowed in the water.
`.trim();

/*const promptText = `
{{role "user"}}
 {{query}}

{{ role "system"}}
 
The following is the history of your conversation:
{{history}}
 
 Return all answers as a single string. You may use Markdown but not JSON or YAML.
 `.trim();

const prompt = ai.definePrompt<typeof ChatRequestSchema, ZodString>({
    name: "chatPrompt",
    input: {
        schema: ChatRequestSchema,
    },
    output: {
        schema: z.string(),
    },
    model: "vertexai/gemini-1.5-flash",
}, promptText);

class MessageStore implements SessionStore<string> {
constructor(private history: ChatRequest["history"]) {}
    get(session: string): Promise<SessionData> { 
        return Promise.resolve({
            id: session,
            threads: {
                main: this.history.map(h => { return { role: h.sender, content: [ { text: h.message } ]}; }),
            }
        })
    }
    save(session: string, sessionData: Omit<SessionData<string>, "id">) {
        return Promise.resolve();
    }
}

*/

export const chat = ai.defineStreamingFlow({
    name: "chat",
    inputSchema: ChatRequestSchema,
    streamSchema: z.string(),
    outputSchema: z.string(),
}, async (input: ChatRequest, streamingCallback): Promise<string> => {
    const chat = ai.chat({
        system,
        messages: input.history.map(h => { return { role: h.sender, content: [ { text: h.message }]}; }),
    });
    const { stream, response } = await chat.sendStream<z.ZodString>(input.query);
    if (streamingCallback) {
        for await (const chunk of stream) {
            streamingCallback(chunk.text);
        }
    }

    return (await response).text;
});
