import { streamingChat } from "@/flows/chat";
import { routeHandler } from "@/utils/nextGenkit";

export const GET = routeHandler(streamingChat);
