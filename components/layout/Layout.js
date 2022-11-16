import Navbar from "../Navbar"
import Footer from "../Footer"
import BackToTop from "../BackToTop"
import SidebarLayout from "./SidebarLayout"
import { useState, useEffect } from "react"

const Layout = ({ children }) => {
    const [height, setHeight] = useState(0)
    const [scrollY, setscrollY] = useState(0)

    useEffect(() => {
        setHeight(window.innerHeight)
        window.addEventListener('scroll', () => {
            setscrollY(window.scrollY)
        })
    }, [])
    return (
        <>
            <Navbar />
            {children.props.SidebarLayout ?
                (<SidebarLayout>
                    {children}
                </SidebarLayout>) :
                (<>{children}</>)
            }
            <Footer />
            {scrollY > height && <BackToTop height={height} />}
        </>
    )
}

export default Layout;