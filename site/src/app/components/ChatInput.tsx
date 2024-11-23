import { useEffect, useRef } from "react";
import styles from "./ChatInput.module.css";
import { Message } from "@/types";
import { streamingChat } from "@/flows/chat";
import { streamFlow } from "@/utils/nextGenkit";

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
        try {
            const { stream, output } = streamFlow<typeof streamingChat>("/api/chat", { history: original, query: message });
            for await (const chunk of stream) {
                setMessage(chunk);
            }
            //const text = await callFlow<typeof chat>("/api/chat", { history: original, query: message });
            setMessage(await output);
        } catch (error) {
            console.error(error);
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