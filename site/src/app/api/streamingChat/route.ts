import { streamingChat } from "@/flows/chat";
import { appRoute } from "@genkit-ai/next";

export const POST = appRoute(streamingChat);
