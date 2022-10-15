import Head from 'next/head'
import styles from '../styles/Login.module.css'
import { getCsrfToken, signIn, getSession, getProviders } from "next-auth/react";
import { useState } from "react";
import Router from 'next/router';

export default function SignIn({ csrfToken, providers }) {
    const [authmode, setAuthmode] = useState(1);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const signinUser = async (e) => {
        e.preventDefault();
        let options = { redirect: false, username: username, password: password }
        const res = await signIn('credentials', options)
        setMessage(null)
        if (res?.error) {
            setMessage(res.error)
        }
        else {
            return Router.push("/")
        }

    }
    /* 目前不開放註冊
    const signupUser = async (e) => {
        e.preventDefault();
        setMessage(null)
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
        let data = await res.json()
        if (data.message) {
            setMessage(data.message)
        }
        if (data.message == "註冊成功") {
            let options = { redirect: false, username: username, password: password }
            const res = await signIn('credentials', options)
            return Router.push("/")
        }
    }
    */
    return (
        <>
            <Head>
                <title> 登入 &#124; UR&#39;s Blog</title>
                <meta name="description" content="UR的施鹽小天地" />
            </Head>

            <div className={`text-center ${styles.loginPage}`}>
                <main className={`${styles.formSignin} w-100 ${styles.mAuto}`}>
                    <h1>{authmode ? (`Login`) : (`Sign Up`)}</h1>
                    <br /><br />
                    <p style={{ color: 'red' }}>{message}</p>
                    <form method="post">
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <div className="form-floating">
                            <div className={`${styles.column} mb-3`}>
                                <label className={`${styles.label} form-label`}>帳號</label>
                                <input type="text" name="username" id="username" className="form-control"
                                    value={username} onChange={e => setUsername(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-floating">
                            <div className={`${styles.column} mb-3`}>
                                <label className={`${styles.label} form-label`}>密碼</label>
                                <input type="password" id="password" name="password" className="form-control"
                                    value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <a className="dropdown-item" href="/">忘記密碼</a>
                        <div className="dropdown-divider"></div>
                        {
                            authmode ? (
                                <>
                                    <input type="submit" className="w-100 btn btn-lg btn-primary" value="登入"
                                        onClick={(e) => signinUser(e)} />
                                    <a className="dropdown-item">註冊</a>
                                </>
                            ) : (
                                <>
                                    <input type="submit" className="w-100 btn btn-lg btn-primary" value="註冊"
                                        onClick={(e) => signupUser(e)} />
                                    <a className="dropdown-item" onClick={e => setAuthmode(1)}>登入</a>
                                </>
                            )
                        }


                    </form>
                </main>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req })
    if (session) {
        //signed in
        return {
            redirect: { destination: "/" }
        }
    }
    const csrfToken = await getCsrfToken(context);
    const providers = await getProviders();

    return {
        props: { csrfToken: csrfToken, providers: providers },

    }
}