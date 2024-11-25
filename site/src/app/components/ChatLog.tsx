import styles from "./ChatLog.module.css"
import { Message } from "@/types";
import { marked } from "marked";
import { useEffect, useRef } from "react";

const ChatLog = ({log}: {log: Message[]}) => {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      const relHeight = logRef.current.scrollHeight - logRef.current.scrollTop;
      // Allow for small rounding errors
      const isAtBottom = relHeight <= logRef.current.clientHeight + 1; 

      if (isAtBottom) {
        logRef.current.scrollTop = logRef.current.scrollHeight;
      }
    }
  }, [log]);

  return <div key="chatLog" ref={logRef} className={styles.log}>
    {log.map((item, index) => 
      item.sender === "model" && item.message === "..." ?
        <div key="thinking-div"><span className={styles.thinking} key="thinking">...</span></div>
      : <div
        className={item.sender == "model" ? styles.bot : styles.human}
        key={index}
        dangerouslySetInnerHTML={{ __html: marked(item.message)}} />
    )}
  </div>
}

export default ChatLog;