import * as z from "zod";

export const MessageSchema = z.object({
    sender: z.enum(["user", "model"]),
    message: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;

export const ChatRequestSchema = z.object({
    history: z.array(MessageSchema),
    query: z.string(),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;