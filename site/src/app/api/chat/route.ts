import { chat } from "@/flows/chat";
import { nextApiRoute } from "@/utils/nextGenkit";

export const POST = nextApiRoute(chat);
