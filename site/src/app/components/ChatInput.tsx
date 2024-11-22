import { useEffect, useRef } from "react";
import styles from "./ChatInput.module.css";
import { Message } from "@/types";
import { chat } from "@/flows/chat";
import { callFlow } from "@/utils/nextGenkit";

const ChatInput =  ({setLog, log}: {log: Message[], setLog: (message: Message[]) => void}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    })

    async function sendMessage(message: string) {
        const original = [...log]
        setLog([...original, {sender: "user" as const, message}, { sender: "model", message: "..."}]);
        try {
            const text = await callFlow("/api/chat", { history: original, query: message });
            setLog([...original, { sender: "user" as const, message }, { sender: "model", message: text }])
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