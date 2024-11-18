import { chat } from "@/flows/chat";
import { NextApiRoute } from "@/utils/nextGenkit";

export const POST = new NextApiRoute(chat);
