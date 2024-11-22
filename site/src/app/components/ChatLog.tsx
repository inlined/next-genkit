import styles from "./ChatLog.module.css"
import { Message } from "@/types";

const ChatLog = ({log}: {log: Message[]}) => {
    return <div key="chatLog" className={styles.log}>
    {log.map((item, index) => 
      item.sender === "model" && item.message === "..." ?
        <div key="thinking-div"><span className={styles.thinking} key="thinking">...</span></div>
      : <div
        className={item.sender == "model" ? styles.bot : styles.human}
        key={index}
        dangerouslySetInnerHTML={{ __html: item.message}} />
    )}
  </div>
}

export default ChatLog;