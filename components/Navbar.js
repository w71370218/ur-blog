import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from 'react'
import styles from '../styles/Navbar.module.css'
import useRWD from './useRWD'
import getSVG from './getSVG'

const Navbar = () => {
    const device = useRWD();
    const { data: session } = useSession();
    const [loading, setload] = useState(true)

    let themeMode = "light-mode";

    const modeToggle = () => {
        let ele = document.getElementsByTagName("body")[0];
        switch (ele.className) {
            case "dark-mode":
                sessionStorage.setItem("theme-mode", "light-mode");
                break;
            case "light-mode":
                sessionStorage.setItem("theme-mode", "dark-mode");
                break;
        }
        ele.className = sessionStorage.getItem("theme-mode");
    }

    useEffect(() => {
        if (window) {
            themeMode = sessionStorage.getItem("theme-mode");
            let ele = document.getElementsByTagName("body")[0];
            if (!themeMode) {
                sessionStorage.setItem("theme-mode", "light-mode");
            }
            ele.className = themeMode;
            setload(false)
        }
    }, []);

    if (loading) {
        return (<nav className={`${styles.nav} bg-dark navbar-dark  border-bottom border-white`}>
            <div className="p-2 p-md-3 mb-1 "></div></nav>)
    }
    return (
        <>
            <nav className={`${styles.nav} bg-dark navbar-dark  border-bottom border-white`}>
                <div className="p-2 p-md-3 mb-1 ">
                    <div className="container">
                        <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-start">
                            <Link href="/"><a className="d-flex align-items-center mb-2 mb-lg-0 text-light text-decoration-none ">
                                UR&#39;s Blog
                            </a></Link>
                            {device === "PC" ?
                                (
                                    <>
                                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                            <li><Link href="/post/"><a className="nav-link link-dark text-light">文章</a></Link></li>
                                            <li><Link href="#"><a className="nav-link link-dark text-light">圖文</a></Link></li>
                                            <li><Link href="/series/"><a className="nav-link link-dark text-light">系列</a></Link></li>
                                            <li><Link href="/project/"><a className="nav-link link-dark text-light">作品集</a></Link></li>
                                            <li><a href="#" className="nav-link link-secondary">
                                                敬請期待</a></li>
                                        </ul>
                                        <div className="text-end">
                                            {
                                                session ? (
                                                    <>
                                                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                                            <li className={`nav-link text-light pointer`} onClick={e => modeToggle()}>{getSVG('Circle half fill', 20)}</li>
                                                            <li className='d-flex justify-content-center align-self-center me-3'>
                                                                <a href="/post/new" className="nav-link link-dark text-light">新增</a>

                                                                <a className="pointer text-light dropdown-toggle d-flex justify-content-center align-self-center" id="dropdownMenuReference" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent">
                                                                </a>
                                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                                                                    <li><Link href="/post/new"><a className="dropdown-item">新增貼文</a></Link></li>
                                                                    <li><Link href="/series/new"><a className="dropdown-item">新增系列</a></Link></li>
                                                                </ul>
                                                            </li>

                                                            <li>
                                                                <button type="button" className="nav-link btn btn-outline-light me-2" onClick={() => signOut({ callbackUrl: "/" })}>
                                                                    <a>登出</a>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </>
                                                )
                                                    : (
                                                        <>
                                                            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                                                <li className={`nav-link text-light pointer me-3`} onClick={e => modeToggle()}>{getSVG('Circle half fill', 20)}</li>
                                                                <li>
                                                                    <button type="button" className="nav-link btn btn-outline-light me-2" onClick={() => signIn()}>
                                                                        <a>登入</a>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </>
                                                    )
                                            }

                                        </div>
                                    </>
                                )
                                : (
                                    <>
                                        <ul className="nav col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                            <li className={`nav-link text-light pointer`} onClick={e => modeToggle()}>{getSVG('Circle half fill', 20)}</li>
                                        </ul>
                                        <div className="text-end">
                                            <button className="navbar-toggler mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                                {getSVG('menu')}
                                            </button>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div className="collapse bg-dark text-center" id="navbarToggleExternalContent">
                        <ul className={`${styles.ul}`}>
                            <li className={` p-3 border-bottom border-secondary ${styles.li}`} >
                                <div className="nav-linklink-dark text-light ">
                                    <Link href="/post/"><a>
                                        <div data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                            文章
                                        </div>
                                    </a></Link>
                                </div>
                            </li>
                            <li className={` p-3 border-bottom border-secondary ${styles.li}`} >
                                <div className="nav-linklink-dark text-light ">
                                    <Link href="#"><a>
                                        <div data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                            圖文
                                        </div>
                                    </a></Link>
                                </div>
                            </li>
                            <li className={` p-3 border-bottom border-secondary ${styles.li}`} >
                                <div className="nav-linklink-dark text-light ">
                                    <Link href="/series/"><a>
                                        <div data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                            系列
                                        </div>
                                    </a></Link>
                                </div>
                            </li>
                            <li className={` p-3 border-bottom border-secondary ${styles.li}`}>
                                <div className="nav-linklink-dark text-light ">
                                    <Link href="/project/">
                                        <a href="#">
                                            <div data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                                作品集
                                            </div>
                                        </a></Link>
                                </div>
                            </li>
                            {
                                session ? (
                                    <>
                                        <div className='py-3'>
                                            <li className=''>
                                                <a className="link-dark text-light">新增</a>
                                            </li>
                                            <div className='rounded mt-3 mx-3' >
                                                <li className={`rounded ${styles['li-item']} ${styles.li}`}>
                                                    <div className="m-1 nav-link link-light text-light">
                                                        <Link href="/post/new"><a>
                                                            <div data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                                                貼文
                                                            </div>
                                                        </a></Link>
                                                    </div>
                                                </li>
                                                <li className={`rounded ${styles['li-item']} ${styles.li}`}>
                                                    <div className="m-1 nav-link link-light text-light">
                                                        <Link href="/series/new"><a>
                                                            <div data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                                                                系列
                                                            </div>
                                                        </a></Link>
                                                    </div>
                                                </li>
                                            </div>
                                        </div>
                                        <li className='d-flex justify-content-center'>
                                            <div className="nav-link">
                                                <button type="button" className="btn btn-outline-light" onClick={() => signOut({ callbackUrl: "/" })}>
                                                    <a>登出</a>
                                                </button>
                                            </div>
                                        </li>
                                    </>
                                )
                                    : (
                                        <li className='d-flex justify-content-center pt-3'>
                                            <div className="nav-link">
                                                <button type="button" className="btn btn-outline-light" onClick={() => signIn()}>
                                                    <a >登入</a>
                                                </button>
                                            </div>
                                        </li>
                                    )
                            }
                        </ul>
                    </div>
                </div>
            </nav >
        </>
    );
}

export default Navbar;