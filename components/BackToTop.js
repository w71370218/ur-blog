import styles from "../styles/BackToTop.module.css"
import getSVG from "../components/getSVG"

const BackToTop = () => {
    return (
        <>
            <a className={`${styles.backtotop} text-light p-3 rounded-circle pointer`} onClick={() => { window.scrollTo(0, 0) }}>
                <div className="d-flex justify-content-center aliegn-items-center">
                    <span>{getSVG('chevron-up')}</span>
                </div>
            </a>
        </>
    )
}
export default BackToTop