import styles from "./ChatLog.module.css"
import { Message } from "@/types";
import { marked } from "marked";

const ChatLog = ({log}: {log: Message[]}) => {
    return <div className={styles.log}>
    {log.map((item, index) => 
      item.sender === "model" && item.message === "..." ?
        <div><span className={styles.thinking} key="thinking">...</span></div>
      : <div
        className={item.sender == "model" ? styles.bot : styles.human}
        key={index}
        dangerouslySetInnerHTML={{ __html: marked(item.message)}} />
    )}
  </div>
}

export default ChatLog;