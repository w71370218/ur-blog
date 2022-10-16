import Navbar from "./Navbar"
import Footer from "./Footer"
import styles from "../styles/Layout.module.css"

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default Layout;