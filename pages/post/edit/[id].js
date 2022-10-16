import { getSession, getCsrfToken } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react"
import Router from 'next/router';
import Head from 'next/head'
import style from '../../../styles/TagInput.module.css'
import postStyle from '../../../styles/NewPost.module.css'
import Posts from '../../../models/posts'
import Users from '../../../models/users'
import Tags from '../../../models/tags'

let selectedTags = []

export default function EditPost({ csrfToken, post }) {
    const { data: session } = useSession();
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [message, setMessage] = useState(null);
    const [tags, setTags] = useState(post.tags);

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

    const updatePost = async (e) => {
        e.preventDefault();
        const user = session.user.id
        const id = post.id
        setMessage(null)
        const res = await fetch('/api/post/update', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ id, title, content, tags, user }),
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
                <Head>
                    <title> 新增貼文 &#124; UR&#39;s Blog</title>
                    <meta name="description" content="UR的施鹽小天地" />
                </Head>
                <main>
                    <div className='container '>
                        <h1>編輯貼文</h1>
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
                            <button type="submit" className="save btn btn-dark" onClick={(e) => updatePost(e)}>送出</button>
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


    const post = await Posts.findOne({ id: context.query.id }).lean();
    if (post) {
        post._id = post._id.toString();
    }
    const author = await Users.findOne({ _id: post.author }).select("id").lean();

    if (session.user.id != author.id) {
        return {
            redirect: { destination: "/" }
        }
    }
    post.author = post.author.toString()
    for (let i = 0; i < post.tags.length; i++) {
        const tag = await Tags.findOne({ _id: post.tags[i] }).select("name").lean();
        post.tags[i] = tag.name;
    }

    const csrfToken = await getCsrfToken(context);

    return {
        props: { csrfToken: csrfToken, post: post },

    }
}