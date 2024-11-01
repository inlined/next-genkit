import styles from "./Header.module.css";

const Header = ({style}: {style?: any}) => {
    return (
        <>
        <div className={styles.header} style={style}>
            <h3><span className="material-icons" id={styles.icon}>chat_bubble_outline</span><span>Scuba Talk</span></h3>
        </div>
      </>
    )
}

export default Header;