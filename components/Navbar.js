import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
    const { data: session } = useSession();
    return (
        <nav className={styles.nav}>
            <div className="p-3 mb-3 border-bottom bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <Link href="/"><a className="d-flex align-items-center mb-2 mb-lg-0 text-light text-decoration-none ">
                            UR&#39;s Blog
                        </a></Link>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="#" className="nav-link px-2 link-dark text-light">文章</a></li>
                            <li><a href="#" className="nav-link px-2 link-dark text-light">圖文</a></li>
                            <li><Link href="/series/"><a className="nav-link px-2 link-dark text-light">系列</a></Link></li>
                            <li><a href="#" className="nav-link px-2 link-dark text-light">作品集</a></li>
                            <li><a href="http://ur-want-to-go.herokuapp.com/" className="nav-link px-2 link-dark text-light">想要去玩的地點</a></li>
                            <li><a href="#" className="nav-link px-2 link-secondary">
                                敬請期待</a></li>
                        </ul>

                        <div className="text-end">

                            {
                                session ? (
                                    <>
                                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                            <li><Link href="/post/new"><a className="nav-link link-dark text-light">新增</a></Link></li>
                                            <li>
                                                <button type="button" className="nav-link btn btn-outline-light me-2" onClick={() => signOut({ callbackUrl: "/" })}>
                                                    <a>登出</a>
                                                </button>
                                            </li>
                                        </ul>
                                    </>
                                )
                                    : (

                                        <button type="button" className="nav-link btn btn-outline-light me-2" onClick={() => signIn()}>
                                            <a>登入</a>
                                        </button>
                                    )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </nav >
    );
}

export default Navbar;