import { getSession, getCsrfToken } from "next-auth/react";
import Router from 'next/router';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import PostEdit from "../../components/PostEdit"

export default function NewPost({ csrfToken }) {
    const router = useRouter()
    const { data: session } = useSession({ required: true });
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState(null);
    const [tags, setTags] = useState([]);
    const [series, setSeries] = useState('');

    useEffect(() => {
        if (router.query.series_name) {
            setSeries(router.query.series_name)
        }
    }, [])

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
            body: JSON.stringify({ title, content, tags, series, author }),
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
    const functions = {
        dontSubmit: dontSubmit,
        publishPost: publishPost
    }

    if (session) {
        return (
            <>
                <PostEdit titlename="新增" title={title} content={content} message={message} csrfToken={csrfToken}
                    series={series} tags={tags}
                    set={{ setTitle: setTitle, setContent: setContent, setTags: setTags, setSeries: setSeries }}
                    functions={functions} />
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