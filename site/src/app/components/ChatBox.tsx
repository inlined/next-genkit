'use client'
import { useEffect, useRef, useState } from 'react';
import styles from "./ChatBox.module.css";
import { marked } from "marked";

const ChatBox = () => {
  const [log, setLog] = useState<{sender: "user" | "model", message: string}[]>([])
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

    const original = [...log, {sender: "user" as const, message: inputValue}]
    setLog([...original, { sender: "model", message: "..."}]);
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ history: original }),
    });
    const body = await response.text();
    console.log("Body is", body);
    const message = JSON.parse(body)["result"];
    setLog([...original, { sender: "model", message }]);
  }

  return (
    <>
    <div className={styles.log}>
      {log.map((item, index) => 
        <div
          className={item.sender == "user" ? styles.human : styles.bot}
          key={index}
          dangerouslySetInnerHTML={{__html: marked(item.message)}}
          />
      )}
    </div>
    <div className={styles.input}>
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
    </div>
    </>
  );
};

export default ChatBox;