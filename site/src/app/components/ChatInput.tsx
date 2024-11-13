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

    async function sendMessage(message: string) {
        const original = [...log]
        setLog([...original, {sender: "user" as const, message}, { sender: "model", message: "..."}]);
        const response = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({ history: original, query: message }),
        });
        const body = await response.text();
        console.log("Body is", body);
        const resp = JSON.parse(body)
        if (resp["error"]) {
            console.error(`Got error: ${JSON.stringify(resp["error"], null, 2)}`)
            setLog([...original, {sender: "user", message}, {sender: "model", message: `ERROR:
                _${JSON.stringify(resp["error"], null, 2)}_`}]);
        } else {
            setLog([...original, {sender: "user", message}, { sender: "model", message: resp["result"] }]);
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