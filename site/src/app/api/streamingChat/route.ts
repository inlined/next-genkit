import { streamingChat } from "@/flows/chat";
import { routeHandler } from "@/utils/nextGenkit";

export const POST = routeHandler(streamingChat);
