import styles from "./Header.module.css";

const Header = () => {
    return (
        <>
        <div className={styles.header}> 
            <span className="material-icons" id={styles.icon}>chat_bubble_outline</span><span>Scuba Talk</span>
        </div>
      </>
    )
}

export default Header;