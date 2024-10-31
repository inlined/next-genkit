'use client'
import { useRef, useState } from 'react';
import styles from "./ChatBox.module.css";
import { dataField } from "@/app/api/chat/route";

const ChatBox = () => {
  const [log, setLog] = useState<{sender: "human" | "bot", value: string}[]>([])
  const inputRef = useRef<HTMLInputElement>(null);

  async function sendMessage() {
    const inputValue = inputRef.current?.value;
    if (!inputValue) {
      return;
    }

    const original = [...log, {sender: "human" as const, value: inputValue}]
    setLog([...original, { sender: "bot", value: "..."}]);
    const response = await fetch("/api/chat");
    const text = (await response.json())[dataField];
    setLog([...original, { sender: "bot", value: text }]);
  }

  return (
    <>
    <div className={styles.log}>
      {log.map((item, index) => <div className={item.sender == "human" ? styles.human : styles.bot}>{item.value}</div>)}
    </div>
    <div className={styles.input}>
      <input
        type="text"
        ref={inputRef}
        placeholder="Type something..."
        className={styles.inputText}
      />
      <button
        type="submit"
        className={styles.inputButton}
        onClick={sendMessage}>Send</button>
    </div>
    </>
  );
};

export default ChatBox;