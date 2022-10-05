import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Login = () => {
    return (
        <>
            <Head>
                <title>登入 &#124; UR&#39;s Blog</title>
                <meta name="description" content="UR的施鹽小天地" />
            </Head>

            <div className="text-center login-page">
                <main className="form-signin w-100 m-auto">
                    <h1>Login</h1>
                    <form action="/" method="post" className="login">

                        <div className="form-floating">
                            <div className="mb-3">
                                <td><label className='form-label'>帳號</label></td>
                                <td><input type="text" className="form-control" ></input></td>
                            </div>
                        </div>
                        <div className="form-floating">
                            <div className="mb-3">
                                <td><label className='form-label'>密碼</label></td>
                                <td><input type="password" className="form-control"  ></input></td>
                            </div>
                        </div>
                        <a className="dropdown-item" href="/">忘記密碼</a>
                        <div className="dropdown-divider"></div>
                        <input type="submit" className="w-100 btn btn-lg btn-primary"></input>
                    </form>
                </main>
            </div>
        </>
    )
}

export default Login;