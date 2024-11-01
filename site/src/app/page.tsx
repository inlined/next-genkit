"use client";
import { useState } from 'react';
import Header from "./components/Header";
import ChatLog from "./components/ChatLog";
import ChatInput from "./components/ChatInput";

export default function Home() {
  const [log, setLog] = useState<{sender: "user" | "model", message: string}[]>([])
  return (
    <>
      <div className="header">
        <Header/>
      </div>
      <div className="chat-log">
        <ChatLog log={log}/>
      </div>
      <div className="chat-input">
        <ChatInput log={log} setLog={setLog} />
      </div>
    </>
  );
}