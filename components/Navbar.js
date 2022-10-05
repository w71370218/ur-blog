import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="">
            <div className="p-3 mb-3 border-bottom bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <Link href="/"><a className="d-flex align-items-center mb-2 mb-lg-0 text-light text-decoration-none ">
                            UR's Blog
                        </a></Link>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="#" className="nav-link px-2 link-dark text-light">敬請期待</a></li>
                            <li><a href="#" className="nav-link px-2 link-secondary">敬請期待</a></li>
                        </ul>

                        <div className="text-end">
                            <button type="button" className="btn btn-outline-light me-2">
                                <Link href="/login">
                                    <a>登入</a>
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    );
}

export default Navbar;