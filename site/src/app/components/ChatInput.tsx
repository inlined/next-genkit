import { useEffect, useRef, useState } from "react";
import styles from "./ChatInput.module.css";
import { Message } from "@/types";

const ChatInput =  ({setLog, log}: {log: Message[], setLog: (message: Message[]) => void}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    })

    async function sendMessage() {
        const inputValue = inputRef.current?.value;
        if (!inputValue) {
            return;
        }

        const original = [...log]
        setLog([...original, {sender: "user" as const, message: inputValue}, { sender: "model", message: "..."}]);
        const response = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({ history: original, query: inputValue }),
        });
        const body = await response.text();
        console.log("Body is", body);
        const message = JSON.parse(body)["result"];
        setLog([...original, {sender: "user", message: inputValue}, { sender: "model", message }]);
    }

    return <div className={styles.input}>
        <input
        type="text"
        ref={inputRef}
        placeholder="Type something..."
        className={styles.inputText}
        onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
            sendMessage();
            }
        }}
        />
        <button
        type="submit"
        className={styles.inputButton}
        onTouchEndCapture={sendMessage}
        onClick={sendMessage}>Send</button>
    </div>;
};

export default ChatInput