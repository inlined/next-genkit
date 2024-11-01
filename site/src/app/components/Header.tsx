import styles from "./Header.module.css";

const Header = () => {
    return (
        <>
        <div className={styles.header}>
            <h3><span className="material-icons" id={styles.icon}>chat_bubble_outline</span><span>Scuba Talk</span></h3>
        </div>
      </>
    )
}

export default Header;