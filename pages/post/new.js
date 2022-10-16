import Head from 'next/head'
import { getSession, getCsrfToken } from "next-auth/react";
import Image from 'next/image'
import Router from 'next/router';
import { useState } from "react";
import { useSession } from "next-auth/react"
import Title from '../../components/Title';
import style from '../../styles/TagInput.module.css'
import postStyle from '../../styles/NewPost.module.css'


let selectedTags = []

export default function NewPost({ csrfToken }) {
    const { data: session } = useSession();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState(null);
    const [tags, setTags] = useState([]);
    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };
    const addTags = event => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            selectedTags = [...tags, event.target.value];
            event.target.value = "";
        }
    };

    const dontSubmit = (event) => {
        if (event.key === "Enter" && event.target.id !== "content") {
            event.preventDefault();
        }

    }

    const publishPost = async (e) => {
        e.preventDefault();
        const author = session.user.id
        setMessage(null)
        const res = await fetch('/api/post/new', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ title, content, tags, author }),
        })
        let data = await res.json()
        if (data.message) {
            setMessage(data.message)
        }
        if (data.message == "succeed") {
            return Router.push({
                pathname: '/post/[id]',
                query: { id: data.id },
            })
        }
    }

    if (session) {
        return (
            <>
                <Title title={"新增貼文"} />
                <Head>
                    <meta name="description" content="UR的施鹽小天地" />
                </Head>
                <main>
                    <div className='container '>
                        <h1>新增貼文</h1>
                        <p style={{ color: 'red' }}>{message}</p>
                        <form method="POST" className="post-form" encType="multipart/form-data" onKeyDown={e => { dontSubmit(e) }}>
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                            <div className="">
                                <label className="form-label">標題</label>
                                <input className={[postStyle['text-input'], postStyle['sm-input']].join(" ")} name="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                            <div className="">
                                <label className="form-label">內文</label>
                                <textarea id="content" className={[postStyle['text-input'], postStyle['lg-input']].join(" ")} name="content" type="text" value={content} onChange={e => setContent(e.target.value)}></textarea>
                            </div>

                            <div className="">
                                <label className="form-label">標籤</label>
                                <div className={style["tags-input"]}>
                                    <ul id={style["tags"]}>
                                        {tags.map((tag, index) => (
                                            <li key={index} className={style["tag"]}>
                                                <span className={style['tag-title']}>{tag}</span>
                                                <span className={style['tag-close-icon']}
                                                    onClick={() => removeTags(index)}
                                                >
                                                    x
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <input
                                        type="text"
                                        onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                                        placeholder="以 Enter 新增標籤"
                                    />
                                </div>
                            </div>
                            <p style={{ color: 'red' }}>{message}</p>
                            <button type="submit" className="save btn btn-dark" onClick={(e) => publishPost(e)}>新增</button>
                        </form>
                    </div>
                </main>
            </>
        )
    }
    else {
        return (
            <h1>尚未登入無法進行此操作</h1>
        )
    }
}

export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req })
    if (!session) {
        return {
            redirect: { destination: "/" }
        }
    }
    const csrfToken = await getCsrfToken(context);

    return {
        props: { csrfToken: csrfToken },

    }
}