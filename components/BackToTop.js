import styles from "../styles/BackToTop.module.css"

const BackToTop = () => {
    return (
        <>
            <a className={`${styles.backtotop} bg-dark text-light p-3 rounded-circle pointer`} onClick={() => { window.scrollTo(0, 0) }}>
                <span>top</span>
            </a>
        </>
    )
}
export default BackToTop