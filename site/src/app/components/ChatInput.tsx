import { useEffect, useRef } from "react";
import styles from "./ChatInput.module.css";
import { Message } from "@/types";
import { streamingChat } from "@/flows/chat";
import { callFlow, streamFlow } from "@/utils/nextGenkit";

// TODO: make a UX toggle
const streaming = true;

const ChatInput =  ({setLog, log}: {log: Message[], setLog: (message: Message[]) => void}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    })

    async function sendMessage(message: string) {
        const original = [...log]
        const setMessage = (model: string) => {
            setLog([...original, {sender: "user", message}, { sender: "model", message: model}]);
        }
        setMessage("...");
        let accum = "";
        try {
            if (!streaming) {
                console.log("calling flow");
                const text = await callFlow<typeof streamingChat>("/api/chat", { history: original, query: message });
                setMessage(accum);
                return;
            }
            console.log("streaming flow");
            const { stream, output } = streamFlow<typeof streamingChat>("/api/chat", { history: original, query: message });
            console.log("Got result")
            for await (const chunk of stream) {
                console.log("Got chunk", chunk);
                accum = accum + chunk;
                setMessage(accum);
            }
            const final = await output;
            console.log("Got final", final);
            if (final) {
                setMessage(final);
            }
        } catch (error) {
            console.error(error);
            setMessage(accum + "[Error]");
        }
    }

    return <div className={styles.input}>
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
    </div>;
};

export default ChatInput