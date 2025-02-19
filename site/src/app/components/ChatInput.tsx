import { useEffect, useRef, useState } from "react";
import styles from "./ChatInput.module.css";
import { Message } from "@/types";
import { chat, streamingChat } from "@/flows/chat";
import { runFlow, streamFlow } from "@genkit-ai/next/client";

// TODO: make a UX toggle

const ChatInput =  ({setLog, log}: {log: Message[], setLog: (message: Message[]) => void}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    })

    const [isStreamingFlow, setIsStreamingFlow] = useState(false);
    const [isStreamingCall, setIsStreamingCall] = useState(false);

    async function sendMessage(message: string) {
        const original = [...log]
        const setMessage = (model: string) => {
            setLog([...original, {sender: "user", message}, { sender: "model", message: model}]);
        }
        setMessage("...");
        const request = { history: original, query: message }
        let accum = "";
        try {
            if (!isStreamingCall) {
                console.log("calling flow");
                const text = isStreamingFlow
                    ? await runFlow<typeof streamingChat>({ url: "api/streamingChat", input: request})
                    : await runFlow<typeof chat>({ url: "/api/chat", input: request});
                setMessage(text);
                return;
            }
            const { stream, output } = isStreamingFlow
                ? streamFlow<typeof streamingChat>({ url: "/api/streamingChat", input: request})
                : streamFlow<typeof chat>({ url: "/api/chat", input: request});
            console.debug("About to stream from ", stream);
            for await (const chunk of stream) {
                console.debug("Got streaming chunk", chunk);
                accum = accum + chunk;
                setMessage(accum);
            }
            const final = await output;
            console.debug("Got final streaming result", final);
            if (final) {
                setMessage(final);
            }
        } catch (error) {
            console.error(error);
            setMessage(accum + "[Error]");
        }
    }

    return <div className={styles.container}>
        <div className={styles.toggles}>
            <label>
                <input
                    type="checkbox"
                    checked={isStreamingFlow}
                    onChange={e => setIsStreamingFlow(e.target.checked)}
                />
                Streaming Flow?
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={isStreamingCall}
                    onChange={e => setIsStreamingCall(e.target.checked)}
                />
                Streaming Call?
            </label>
        </div> 
        <div className={styles.input}>
            <input
            type="text"
            ref={inputRef}
            placeholder="Type something..."
            className={styles.inputText}
            onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    sendMessage(inputRef.current!.value);
                    inputRef.current!.value = "";
                }
            }}
            />
            <button
            type="submit"
            className={styles.inputButton}
            onTouchEndCapture={() => sendMessage(inputRef.current!.value)}
            onClick={() => sendMessage(inputRef.current!.value)}>Send</button>
        </div>
    </div>;
};

export default ChatInput